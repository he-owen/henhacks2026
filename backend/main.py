from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from auth0_userinfo import get_userinfo
from config import CORS_ORIGINS
from database import (
    check_database,
    upsert_user,
    get_devices_by_user,
    create_device as db_create_device,
    update_device as db_update_device,
    delete_device as db_delete_device,
    get_providers_by_zip,
    get_hourly_rates,
    set_user_provider as db_set_user_provider,
    get_user_profile as db_get_user_profile,
)
from rate_service import fetch_and_store_providers, generate_monthly_rates

security = HTTPBearer(auto_error=False)
app = FastAPI(title="API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.get("/")
async def root():
    return {"status": "ok", "docs": "/docs"}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/api/status")
async def status():
    db_ok = await check_database()
    return {
        "status": "ok",
        "database": "connected" if db_ok else "disconnected",
    }


@app.post("/api/users/me")
async def sync_me(credentials: HTTPAuthorizationCredentials | None = Depends(security)):
    """Sync the current Auth0 user to the users table. Call with Authorization: Bearer <access_token>."""
    if not credentials or not credentials.credentials:
        raise HTTPException(status_code=401, detail="Missing or invalid authorization")
    token = credentials.credentials
    userinfo = await get_userinfo(token)
    if not userinfo:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    user_id = userinfo.get("sub")
    email = userinfo.get("email") or ""
    if not user_id or not email:
        raise HTTPException(status_code=400, detail="User profile missing id or email")
    ok = await upsert_user(user_id, email)
    if not ok:
        raise HTTPException(status_code=500, detail="Failed to sync user")
    return {"id": user_id, "email": email, "synced": True}


async def _require_user(credentials: HTTPAuthorizationCredentials | None = Depends(security)):
    """Dependency: return userinfo from Bearer token or raise 401."""
    if not credentials or not credentials.credentials:
        raise HTTPException(status_code=401, detail="Missing or invalid authorization")
    userinfo = await get_userinfo(credentials.credentials)
    if not userinfo:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    if not userinfo.get("sub"):
        raise HTTPException(status_code=400, detail="User profile missing id")
    return userinfo


@app.get("/api/devices")
async def list_devices(userinfo: dict = Depends(_require_user)):
    """List devices for the authenticated user."""
    user_id = userinfo["sub"]
    rows = await get_devices_by_user(user_id)
    # Normalize to camelCase for frontend
    return [
        {
            "id": r["device_id"],
            "userId": r["user_id"],
            "name": r["name"],
            "type": r["type"],
            "brand": r["brand"],
            "model": r["model"],
            "hourlyEnergy": r["hourly_energy"],
            "isSmart": r["is_smart"],
            "runDurationMinutes": r["run_duration_minutes"],
        }
        for r in rows
    ]


@app.post("/api/devices")
async def create_device_endpoint(request: Request, userinfo: dict = Depends(_require_user)):
    """Create a device for the authenticated user. Body: name, type, brand?, model?, hourlyEnergy?, isSmart?, runDurationMinutes?."""
    body = await request.json()
    user_id = userinfo["sub"]
    name = body.get("name") or ""
    type_ = body.get("type") or ""
    if not name or not type_:
        raise HTTPException(status_code=400, detail="name and type are required")
    row = await db_create_device(
        user_id=user_id,
        name=name.strip(),
        type_=type_.strip(),
        brand=body.get("brand"),
        model=body.get("model"),
        hourly_energy=body.get("hourlyEnergy"),
        is_smart=bool(body.get("isSmart", False)),
        run_duration_minutes=body.get("runDurationMinutes"),
    )
    if not row:
        raise HTTPException(status_code=500, detail="Failed to create device")
    return _device_response(row)


def _device_response(row: dict):
    return {
        "id": row["device_id"],
        "userId": row["user_id"],
        "name": row["name"],
        "type": row["type"],
        "brand": row["brand"],
        "model": row["model"],
        "hourlyEnergy": row["hourly_energy"],
        "isSmart": row["is_smart"],
        "runDurationMinutes": row["run_duration_minutes"],
    }


@app.put("/api/devices/{device_id}")
async def update_device_endpoint(
    device_id: str,
    request: Request,
    userinfo: dict = Depends(_require_user),
):
    """Update a device. Only allowed if the device belongs to the authenticated user."""
    body = await request.json()
    user_id = userinfo["sub"]
    name = body.get("name") or ""
    type_ = body.get("type") or ""
    if not name or not type_:
        raise HTTPException(status_code=400, detail="name and type are required")
    row = await db_update_device(
        device_id=device_id,
        user_id=user_id,
        name=name.strip(),
        type_=type_.strip(),
        brand=body.get("brand"),
        model=body.get("model"),
        hourly_energy=body.get("hourlyEnergy"),
        is_smart=bool(body.get("isSmart", False)),
        run_duration_minutes=body.get("runDurationMinutes"),
    )
    if not row:
        raise HTTPException(status_code=404, detail="Device not found or access denied")
    return _device_response(row)


@app.delete("/api/devices/{device_id}")
async def delete_device_endpoint(device_id: str, userinfo: dict = Depends(_require_user)):
    """Delete a device. Only allowed if the device belongs to the authenticated user."""
    user_id = userinfo["sub"]
    deleted = await db_delete_device(device_id, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Device not found or access denied")
    return {"deleted": True}


@app.get("/api/users/me/profile")
async def get_profile(userinfo: dict = Depends(_require_user)):
    """Return the current user's profile including selected provider and zip."""
    user_id = userinfo["sub"]
    profile = await db_get_user_profile(user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": profile["id"],
        "email": profile["email"],
        "selectedProviderId": profile["selected_provider_id"],
        "zip": profile["zip"],
    }


# ---------------------------------------------------------------------------
# Utility rates
# ---------------------------------------------------------------------------

@app.post("/api/rates/fetch")
async def fetch_rates_endpoint(request: Request, userinfo: dict = Depends(_require_user)):
    """Fetch utility providers from OpenEI for a zip code and store them."""
    body = await request.json()
    zip_code = (body.get("zip") or "").strip()
    if not zip_code:
        raise HTTPException(status_code=400, detail="zip is required")
    try:
        providers = await fetch_and_store_providers(zip_code)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"OpenEI request failed: {e}")
    return [
        {
            "id": p["provider_id"],
            "zipCode": p["zip_code"],
            "utilityName": p["utility_name"],
            "rateName": p["rate_name"],
            "sector": p["sector"],
            "fetchedAt": p["fetched_at"].isoformat() if hasattr(p["fetched_at"], "isoformat") else str(p["fetched_at"]),
        }
        for p in providers
    ]


@app.get("/api/rates/providers")
async def list_providers_endpoint(zip: str = "", userinfo: dict = Depends(_require_user)):
    """Return cached utility providers for a zip code."""
    zip_code = zip.strip()
    if not zip_code:
        raise HTTPException(status_code=400, detail="zip query param is required")
    rows = await get_providers_by_zip(zip_code)
    return [
        {
            "id": r["provider_id"],
            "zipCode": r["zip_code"],
            "utilityName": r["utility_name"],
            "rateName": r["rate_name"],
            "sector": r["sector"],
            "fetchedAt": r["fetched_at"].isoformat() if hasattr(r["fetched_at"], "isoformat") else str(r["fetched_at"]),
        }
        for r in rows
    ]


@app.post("/api/rates/generate")
async def generate_rates_endpoint(request: Request, userinfo: dict = Depends(_require_user)):
    """Generate hourly rate rows for a provider/month/year."""
    body = await request.json()
    provider_id = body.get("provider_id") or ""
    month = body.get("month")
    year = body.get("year")
    if not provider_id or month is None or year is None:
        raise HTTPException(status_code=400, detail="provider_id, month, and year are required")
    try:
        count = await generate_monthly_rates(provider_id, int(month), int(year))
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Rate generation failed: {e}")
    return {"generated": count}


@app.get("/api/rates/monthly")
async def get_monthly_rates_endpoint(
    provider_id: str = "",
    month: int = 0,
    year: int = 0,
    userinfo: dict = Depends(_require_user),
):
    """Return hourly rate rows for a provider/month/year."""
    if not provider_id or not month or not year:
        raise HTTPException(status_code=400, detail="provider_id, month, and year are required")
    rows = await get_hourly_rates(provider_id, month, year)
    return [
        {
            "id": r["rate_id"],
            "providerId": r["provider_id"],
            "date": r["date"].isoformat() if hasattr(r["date"], "isoformat") else str(r["date"]),
            "hour": r["hour"],
            "baseRate": float(r["base_rate"]),
            "deliveryCost": float(r["delivery_cost"]),
            "totalRate": float(r["total_rate"]),
            "periodIndex": r["period_index"],
            "periodLabel": r["period_label"],
        }
        for r in rows
    ]


@app.put("/api/users/me/provider")
async def set_provider_endpoint(request: Request, userinfo: dict = Depends(_require_user)):
    """Set the user's selected utility provider."""
    body = await request.json()
    provider_id = body.get("provider_id")
    user_id = userinfo["sub"]
    ok = await db_set_user_provider(user_id, provider_id)
    if not ok:
        raise HTTPException(status_code=500, detail="Failed to set provider")
    return {"updated": True, "providerId": provider_id}
