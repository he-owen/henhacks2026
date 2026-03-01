import asyncio
import logging
import traceback

from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Any

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
    upsert_user_preferences as db_upsert_user_preferences,
    get_user_preferences as db_get_user_preferences,
    get_locations_by_user,
    create_location as db_create_location,
    update_location as db_update_location,
    delete_location as db_delete_location,
    get_bills_by_user,
    create_bill as db_create_bill,
    update_bill as db_update_bill,
    delete_bill as db_delete_bill,
)
from daily_optimizer import run_optimization_hybrid
from weekly_scheduler import find_optimal_day_for_appliances
from rate_service import fetch_and_store_providers, generate_monthly_rates


# ---------------------------------------------------------------------------
# Pydantic models
# ---------------------------------------------------------------------------

class DailyOptimizeRequest(BaseModel):
    appliances: list[dict[str, Any]]
    prices_by_day: list[list[float]]
    day_of_week: str
    user_preferences: dict[str, Any]


class WeeklyScheduleRequest(BaseModel):
    appliances: list[dict[str, Any]]
    prices_by_day: list[list[float]]
    user_preferences: dict[str, Any]


class DailyOptimizeMeRequest(BaseModel):
    """Prices + preferences only — appliances are loaded from the authenticated user's DB devices."""
    prices_by_day: list[list[float]]
    day_of_week: str
    user_preferences: dict[str, Any]


class WeeklyScheduleMeRequest(BaseModel):
    """Prices + preferences only — appliances are loaded from the authenticated user's DB devices."""
    prices_by_day: list[list[float]]
    user_preferences: dict[str, Any]


# ---------------------------------------------------------------------------
# Helper: map a DB device row → optimizer appliance dict
# ---------------------------------------------------------------------------

def device_to_appliance(row: dict) -> dict:
    """
    Convert a DB device row (snake_case keys) to the appliance format
    expected by run_optimization_hybrid.

    DB type → optimizer type mapping:
      - "AC" / name contains "thermostat" or "hvac"  → "hvac"
      - "EV" / name contains "ev" or "charger"        → "cycle"
      - run_duration_minutes is set and > 0            → "cycle"
      - otherwise                                      → "intermittent"
    """
    db_type = (row.get("type") or "").lower()
    name = row.get("name") or ""
    name_lower = name.lower()
    power = float(row.get("hourly_energy") or 0.0)
    is_smart = bool(row.get("is_smart", False))
    run_minutes = row.get("run_duration_minutes")  # int | None

    # Keywords identifying awake-only devices — must always be intermittent
    AWAKE_ONLY_DB_TYPES = ("tv", "television", "light", "lighting")
    AWAKE_ONLY_NAME_KEYWORDS = ("tv", "television", "light", "lamp", "bulb")

    # Determine optimizer type
    is_awake_device = (
        db_type in AWAKE_ONLY_DB_TYPES or
        any(k in name_lower for k in AWAKE_ONLY_NAME_KEYWORDS)
    )

    if db_type in ("ac", "hvac") or any(k in name_lower for k in ("thermostat", "hvac", " ac")):
        opt_type = "hvac"
    elif db_type == "ev" or any(k in name_lower for k in ("ev charger", "charger", "electric vehicle")):
        opt_type = "cycle"
    elif is_awake_device:
        # TVs and lights must be intermittent so the awake-hours constraint applies
        opt_type = "intermittent"
    elif run_minutes and run_minutes > 0:
        opt_type = "cycle"
    else:
        opt_type = "intermittent"

    appliance: dict[str, Any] = {
        "name": name,
        "power": power,
        "type": opt_type,        # optimizer type: hvac / cycle / intermittent
        "device_type": row.get("type") or "Other",  # original DB type for frontend grouping
        "smart_enabled": is_smart,
    }

    if opt_type == "cycle":
        duration_hours = max(1, round((run_minutes or 60) / 60))
        appliance["duration"] = duration_hours
        # EV chargers need a departure_hour; default to 8 AM
        if db_type == "ev" or any(k in name_lower for k in ("ev charger", "charger", "electric vehicle")):
            appliance["departure_hour"] = row.get("departure_hour", 8)
    elif opt_type == "intermittent":
        max_hours = max(1, round((run_minutes or 240) / 60))
        appliance["max_hours"] = max_hours

    return appliance


logger = logging.getLogger(__name__)

try:
    from GeminiAPI.service import GeminiService
    _gemini = GeminiService()
    logger.info("Gemini API enabled for device enrichment")
except Exception as e:
    _gemini = None
    logger.warning("Gemini API not available: %s — device enrichment will use defaults", e)

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


@app.exception_handler(Exception)
async def _global_exception_handler(request: Request, exc: Exception):
    """Catch-all so unhandled errors return JSON (CORS middleware can then add headers)."""
    logger.error("Unhandled exception on %s %s: %s", request.method, request.url.path, exc, exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


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


@app.post("/api/optimize/daily")
async def optimize_daily(request: DailyOptimizeRequest):
    result = run_optimization_hybrid(
        request.appliances,
        request.prices_by_day,
        request.day_of_week,
        request.user_preferences,
    )
    return result


@app.post("/api/optimize/weekly")
async def optimize_weekly(request: WeeklyScheduleRequest):
    result = find_optimal_day_for_appliances(
        request.appliances,
        request.user_preferences,
        request.prices_by_day,
    )
    return result


@app.post("/api/optimize/daily/me")
async def optimize_daily_me(
    request: DailyOptimizeMeRequest,
    userinfo: dict = Depends(_require_user),
):
    """
    Run the daily optimizer using the authenticated user's devices from the DB.
    Body: prices_by_day (7×24 floats), day_of_week, user_preferences.
    """
    user_id = userinfo["sub"]
    rows = await get_devices_by_user(user_id)
    if not rows:
        raise HTTPException(status_code=404, detail="No devices found for this user")

    appliances = [device_to_appliance(r) for r in rows]

    result = run_optimization_hybrid(
        appliances,
        request.prices_by_day,
        request.day_of_week,
        request.user_preferences,
    )
    return {**result, "appliances_used": appliances}


@app.post("/api/optimize/weekly/me")
async def optimize_weekly_me(
    request: WeeklyScheduleMeRequest,
    userinfo: dict = Depends(_require_user),
):
    """
    Run the weekly scheduler using the authenticated user's devices from the DB.
    Body: prices_by_day (7×24 floats), user_preferences.
    """
    user_id = userinfo["sub"]
    rows = await get_devices_by_user(user_id)
    if not rows:
        raise HTTPException(status_code=404, detail="No devices found for this user")

    # Only schedule devices relevant for weekly best-day planning
    WEEKLY_TYPE_KEYWORDS = {"washer", "washing machine", "dryer", "dishwasher", "ev", "electric vehicle", "ev charger", "charger"}
    WEEKLY_NAME_KEYWORDS = ("wash", "dryer", "laundry", "dishwash", "ev", "charger", "electric vehicle")

    def _is_weekly_device(row: dict) -> bool:
        db_type = (row.get("type") or "").lower().strip()
        name = (row.get("name") or "").lower().strip()
        return db_type in WEEKLY_TYPE_KEYWORDS or any(k in name for k in WEEKLY_NAME_KEYWORDS)

    weekly_rows = [r for r in rows if _is_weekly_device(r)]
    if not weekly_rows:
        raise HTTPException(status_code=404, detail="No washer, dryer, dishwasher, or EV charger found")

    appliances = [device_to_appliance(r) for r in weekly_rows]

    result = find_optimal_day_for_appliances(
        appliances,
        request.user_preferences,
        request.prices_by_day,
    )
    return result


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


@app.get("/api/devices")
async def list_devices(userinfo: dict = Depends(_require_user)):
    """List devices for the authenticated user."""
    user_id = userinfo["sub"]
    rows = await get_devices_by_user(user_id)
    return [
        {
            "id": r["device_id"],
            "userId": r["user_id"],
            "locationId": r.get("location_id"),
            "locationName": r.get("location_name"),
            "name": r["name"],
            "type": r["type"],
            "brand": r["brand"],
            "model": r["model"],
            "hourlyEnergy": r.get("hourly_energy"),
            "isSmart": r["is_smart"],
            "runDurationMinutes": r["run_duration_minutes"],
        }
        for r in rows
    ]


@app.post("/api/devices")
async def create_device_endpoint(request: Request, userinfo: dict = Depends(_require_user)):
    """Create a device. Body: name, brand, model (required). Gemini fills type, hourlyEnergy, isSmart, runDurationMinutes if not provided."""
    body = await request.json()
    user_id = userinfo["sub"]
    name = (body.get("name") or "").strip()
    brand = (body.get("brand") or "").strip()
    model = (body.get("model") or "").strip()
    if not name or not brand or not model:
        raise HTTPException(status_code=400, detail="name, brand, and model are required")

    location_id = body.get("locationId") or None
    type_ = body.get("type") or ""
    hourly_energy = body.get("hourlyEnergy")
    is_smart = body.get("isSmart")
    run_duration_minutes = body.get("runDurationMinutes")

    if _gemini and (not type_ or hourly_energy is None or is_smart is None or run_duration_minutes is None):
        logger.info("Enriching device via Gemini: name=%r, brand=%r, model=%r", name, brand, model)
        try:
            enriched = await asyncio.to_thread(
                _gemini.enrich_device, name, brand or "", model or ""
            )
            logger.info("Gemini enrichment result: %s", enriched)
            type_ = type_ or enriched.get("type", "Other")
            if hourly_energy is None:
                hourly_energy = enriched.get("hourlyEnergy", 0.0)
            if is_smart is None:
                is_smart = enriched.get("isSmart", False)
            if run_duration_minutes is None:
                run_duration_minutes = enriched.get("runDurationMinutes", 60)
        except Exception as e:
            logger.exception("Gemini enrichment failed")
            raise HTTPException(
                status_code=502,
                detail=f"Failed to enrich device with Gemini: {getattr(e, 'message', str(e))}",
            )
    elif not type_ or hourly_energy is None or is_smart is None or run_duration_minutes is None:
        logger.info("Using default values (Gemini not configured)")
    type_ = type_ or "Other"
    if hourly_energy is None:
        hourly_energy = 0.0
    if is_smart is None:
        is_smart = False
    if run_duration_minutes is None:
        run_duration_minutes = 60

    row = await db_create_device(
        user_id=user_id,
        name=name,
        type_=type_,
        brand=brand or None,
        model=model or None,
        hourly_energy=float(hourly_energy),
        is_smart=bool(is_smart),
        run_duration_minutes=int(run_duration_minutes),
        location_id=location_id,
    )
    if not row:
        raise HTTPException(status_code=500, detail="Failed to create device")
    return _device_response(row)


def _device_response(row: dict):
    return {
        "id": row["device_id"],
        "userId": row["user_id"],
        "locationId": row.get("location_id"),
        "name": row["name"],
        "type": row["type"],
        "brand": row["brand"],
        "model": row["model"],
        "hourlyEnergy": row.get("hourly_energy"),
        "isSmart": row["is_smart"],
        "runDurationMinutes": row["run_duration_minutes"],
    }


@app.post("/api/devices/batch")
async def create_devices_batch_endpoint(request: Request, userinfo: dict = Depends(_require_user)):
    """Create multiple identical devices in one call. Gemini is invoked only once."""
    body = await request.json()
    user_id = userinfo["sub"]
    name = (body.get("name") or "").strip()
    brand = (body.get("brand") or "").strip()
    model = (body.get("model") or "").strip()
    quantity = int(body.get("quantity", 1))
    if not name or not brand or not model:
        raise HTTPException(status_code=400, detail="name, brand, and model are required")
    if quantity < 1 or quantity > 50:
        raise HTTPException(status_code=400, detail="quantity must be between 1 and 50")

    location_id = body.get("locationId") or None
    type_ = body.get("type") or ""
    hourly_energy = body.get("hourlyEnergy")
    is_smart = body.get("isSmart")
    run_duration_minutes = body.get("runDurationMinutes")

    if _gemini and (not type_ or hourly_energy is None or is_smart is None or run_duration_minutes is None):
        logger.info("Enriching device via Gemini (batch=%d): name=%r, brand=%r, model=%r", quantity, name, brand, model)
        try:
            enriched = await asyncio.to_thread(
                _gemini.enrich_device, name, brand or "", model or ""
            )
            logger.info("Gemini enrichment result: %s", enriched)
            type_ = type_ or enriched.get("type", "Other")
            if hourly_energy is None:
                hourly_energy = enriched.get("hourlyEnergy", 0.0)
            if is_smart is None:
                is_smart = enriched.get("isSmart", False)
            if run_duration_minutes is None:
                run_duration_minutes = enriched.get("runDurationMinutes", 60)
        except Exception as e:
            logger.exception("Gemini enrichment failed")
            raise HTTPException(
                status_code=502,
                detail=f"Failed to enrich device with Gemini: {getattr(e, 'message', str(e))}",
            )
    type_ = type_ or "Other"
    if hourly_energy is None:
        hourly_energy = 0.0
    if is_smart is None:
        is_smart = False
    if run_duration_minutes is None:
        run_duration_minutes = 60

    results = []
    for i in range(quantity):
        device_name = f"{name} ({i + 1})" if quantity > 1 else name
        row = await db_create_device(
            user_id=user_id,
            name=device_name,
            type_=type_,
            brand=brand or None,
            model=model or None,
            hourly_energy=float(hourly_energy),
            is_smart=bool(is_smart),
            run_duration_minutes=int(run_duration_minutes),
            location_id=location_id,
        )
        if not row:
            raise HTTPException(status_code=500, detail=f"Failed to create device {i + 1}")
        results.append(_device_response(row))
    return results


@app.put("/api/devices/{device_id}")
async def update_device_endpoint(
    device_id: str,
    request: Request,
    userinfo: dict = Depends(_require_user),
):
    """Update a device. Body: name, brand, model (required). Gemini fills type, hourlyEnergy (in-use only), isSmart, runDurationMinutes if not provided."""
    body = await request.json()
    user_id = userinfo["sub"]
    name = (body.get("name") or "").strip()
    brand = (body.get("brand") or "").strip()
    model = (body.get("model") or "").strip()
    if not name or not brand or not model:
        raise HTTPException(status_code=400, detail="name, brand, and model are required")

    location_id = body.get("locationId") or None
    type_ = body.get("type") or ""
    hourly_energy = body.get("hourlyEnergy")
    is_smart = body.get("isSmart")
    run_duration_minutes = body.get("runDurationMinutes")

    if _gemini and (not type_ or hourly_energy is None or is_smart is None or run_duration_minutes is None):
        try:
            enriched = await asyncio.to_thread(
                _gemini.enrich_device, name, brand or "", model or ""
            )
            type_ = type_ or enriched.get("type", "Other")
            if hourly_energy is None:
                hourly_energy = enriched.get("hourlyEnergy", 0.0)
            if is_smart is None:
                is_smart = enriched.get("isSmart", False)
            if run_duration_minutes is None:
                run_duration_minutes = enriched.get("runDurationMinutes", 60)
        except Exception as e:
            raise HTTPException(
                status_code=502,
                detail=f"Failed to enrich device with Gemini: {getattr(e, 'message', str(e))}",
            )
    type_ = type_ or "Other"
    if hourly_energy is None:
        hourly_energy = 0.0
    if is_smart is None:
        is_smart = False
    if run_duration_minutes is None:
        run_duration_minutes = 60

    row = await db_update_device(
        device_id=device_id,
        user_id=user_id,
        name=name,
        type_=type_,
        brand=brand or None,
        model=model or None,
        hourly_energy=float(hourly_energy),
        is_smart=bool(is_smart),
        run_duration_minutes=int(run_duration_minutes),
        location_id=location_id,
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


# ---------------------------------------------------------------------------
# Locations
# ---------------------------------------------------------------------------

def _location_response(row: dict):
    return {
        "id": row["location_id"],
        "userId": row["user_id"],
        "name": row["name"],
        "zip": row["zip"],
    }


@app.get("/api/locations")
async def list_locations(userinfo: dict = Depends(_require_user)):
    user_id = userinfo["sub"]
    rows = await get_locations_by_user(user_id)
    return [_location_response(r) for r in rows]


@app.post("/api/locations")
async def create_location_endpoint(request: Request, userinfo: dict = Depends(_require_user)):
    body = await request.json()
    user_id = userinfo["sub"]
    name = (body.get("name") or "").strip()
    zip_code = (body.get("zip") or "").strip()
    if not name or not zip_code:
        raise HTTPException(status_code=400, detail="name and zip are required")
    row = await db_create_location(user_id, name, zip_code)
    if not row:
        raise HTTPException(status_code=500, detail="Failed to create location")
    return _location_response(row)


@app.put("/api/locations/{location_id}")
async def update_location_endpoint(location_id: str, request: Request, userinfo: dict = Depends(_require_user)):
    body = await request.json()
    user_id = userinfo["sub"]
    name = (body.get("name") or "").strip()
    zip_code = (body.get("zip") or "").strip()
    if not name or not zip_code:
        raise HTTPException(status_code=400, detail="name and zip are required")
    row = await db_update_location(location_id, user_id, name, zip_code)
    if not row:
        raise HTTPException(status_code=404, detail="Location not found or access denied")
    return _location_response(row)


@app.delete("/api/locations/{location_id}")
async def delete_location_endpoint(location_id: str, userinfo: dict = Depends(_require_user)):
    user_id = userinfo["sub"]
    deleted = await db_delete_location(location_id, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Location not found or access denied")
    return {"deleted": True}


# ---------------------------------------------------------------------------
# Bills
# ---------------------------------------------------------------------------

def _bill_response(row: dict):
    return {
        "id": row["bill_id"],
        "userId": row["user_id"],
        "month": row["month"],
        "year": row["year"],
        "totalAmount": float(row["bill_total"]),
        "usageKwh": row.get("usage_kwh"),
        "utility": row.get("utility"),
        "locationId": row.get("location_id"),
        "createdDate": row["created_date"].isoformat() if hasattr(row["created_date"], "isoformat") else str(row["created_date"]),
    }


@app.get("/api/bills")
async def list_bills(userinfo: dict = Depends(_require_user)):
    user_id = userinfo["sub"]
    rows = await get_bills_by_user(user_id)
    return [_bill_response(r) for r in rows]


@app.post("/api/bills")
async def create_bill_endpoint(request: Request, userinfo: dict = Depends(_require_user)):
    body = await request.json()
    user_id = userinfo["sub"]
    month = body.get("month")
    year = body.get("year")
    total_amount = body.get("totalAmount")
    if month is None or year is None or total_amount is None:
        raise HTTPException(status_code=400, detail="month, year, and totalAmount are required")
    row = await db_create_bill(
        user_id=user_id,
        month=int(month),
        year=int(year),
        bill_total=float(total_amount),
        usage_kwh=int(body["usageKwh"]) if body.get("usageKwh") is not None else None,
        utility=body.get("utility") or None,
        location_id=body.get("locationId") or None,
    )
    if not row:
        raise HTTPException(status_code=500, detail="Failed to create bill")
    return _bill_response(row)


ALLOWED_BILL_MIMES = {
    "application/pdf", "image/png", "image/jpeg", "image/webp",
    "image/heic", "image/heif",
}

HEIC_MIMES = {"image/heic", "image/heif"}


def _convert_heic_to_jpeg(raw_bytes: bytes) -> tuple[bytes, str]:
    """Convert HEIC/HEIF bytes to JPEG. Returns (jpeg_bytes, 'image/jpeg')."""
    import io
    from pillow_heif import register_heif_opener
    from PIL import Image

    register_heif_opener()
    img = Image.open(io.BytesIO(raw_bytes))
    img = img.convert("RGB")
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=90)
    return buf.getvalue(), "image/jpeg"


@app.post("/api/bills/extract")
async def extract_bill_endpoint(request: Request, userinfo: dict = Depends(_require_user)):
    """Accept a PDF or image upload, use Gemini to extract bill data."""
    if not _gemini:
        raise HTTPException(status_code=503, detail="Gemini API not configured")

    content_type = request.headers.get("content-type", "")
    mime_type = "application/pdf"

    if "multipart/form-data" in content_type:
        form = await request.form()
        file = form.get("file")
        if not file:
            raise HTTPException(status_code=400, detail="No file uploaded")
        file_bytes = await file.read()
        file_mime = (getattr(file, "content_type", "") or "").lower()
        # Normalize common variants
        if file_mime in ("image/jpg",):
            file_mime = "image/jpeg"
        mime_type = file_mime or "application/pdf"
    else:
        file_bytes = await request.body()

    if not file_bytes:
        raise HTTPException(status_code=400, detail="Empty file")

    if mime_type not in ALLOWED_BILL_MIMES:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {mime_type}")

    if mime_type in HEIC_MIMES:
        try:
            file_bytes, mime_type = await asyncio.to_thread(_convert_heic_to_jpeg, file_bytes)
        except Exception as e:
            logger.exception("HEIC conversion failed")
            raise HTTPException(status_code=400, detail=f"Failed to convert HEIC image: {e}")

    try:
        extracted = await asyncio.to_thread(_gemini.extract_bill, file_bytes, mime_type)
    except Exception as e:
        logger.exception("Gemini bill extraction failed")
        raise HTTPException(status_code=502, detail=f"Failed to extract bill data: {e}")

    return extracted


@app.put("/api/bills/{bill_id}")
async def update_bill_endpoint(bill_id: str, request: Request, userinfo: dict = Depends(_require_user)):
    body = await request.json()
    user_id = userinfo["sub"]
    month = body.get("month")
    year = body.get("year")
    total_amount = body.get("totalAmount")
    if month is None or year is None or total_amount is None:
        raise HTTPException(status_code=400, detail="month, year, and totalAmount are required")
    row = await db_update_bill(
        bill_id=bill_id,
        user_id=user_id,
        month=int(month),
        year=int(year),
        bill_total=float(total_amount),
    )
    if not row:
        raise HTTPException(status_code=404, detail="Bill not found or access denied")
    return _bill_response(row)


@app.delete("/api/bills/{bill_id}")
async def delete_bill_endpoint(bill_id: str, userinfo: dict = Depends(_require_user)):
    user_id = userinfo["sub"]
    deleted = await db_delete_bill(bill_id, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Bill not found or access denied")
    return {"deleted": True}


@app.get("/api/users/me/profile")
async def get_profile(userinfo: dict = Depends(_require_user)):
    """Return the current user's profile including selected provider and zip."""
    user_id = userinfo["sub"]
    profile = await db_get_user_profile(user_id)
    if not profile:
        # New user may not exist in DB yet; create them from Auth0 userinfo
        email = userinfo.get("email") or userinfo.get("name") or ""
        await upsert_user(user_id, email or user_id)
        profile = await db_get_user_profile(user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": profile["id"],
        "email": profile["email"],
        "selectedProviderId": profile["selected_provider_id"],
        "zip": profile["zip"],
        "hasPreferences": bool(profile.get("has_preferences")),
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
    # Deduplicate by provider_id (OpenEI can return same plan multiple times)
    seen = set()
    unique = []
    for p in providers:
        pid = p["provider_id"]
        if pid not in seen:
            seen.add(pid)
            unique.append(p)
    return [
        {
            "id": p["provider_id"],
            "zipCode": p["zip_code"],
            "utilityName": p["utility_name"],
            "rateName": p["rate_name"],
            "sector": p["sector"],
            "fetchedAt": p["fetched_at"].isoformat() if hasattr(p["fetched_at"], "isoformat") else str(p["fetched_at"]),
        }
        for p in unique
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


# ---------------------------------------------------------------------------
# User preferences
# ---------------------------------------------------------------------------

@app.get("/api/users/me/preferences")
async def get_preferences_endpoint(userinfo: dict = Depends(_require_user)):
    """Return the current user's preferences."""
    user_id = userinfo["sub"]
    prefs = await db_get_user_preferences(user_id)
    if not prefs:
        return None
    return {
        "id": prefs["preference_id"],
        "weeklySchedule": prefs["weekly_schedule"],
        "tempAwake": prefs["temp_awake"],
        "tempSleeping": prefs["temp_sleeping"],
    }


@app.put("/api/users/me/preferences")
async def set_preferences_endpoint(request: Request, userinfo: dict = Depends(_require_user)):
    """Create or update the user's preferences."""
    import json as _json
    body = await request.json()
    user_id = userinfo["sub"]
    required = ["weeklySchedule", "tempAwake", "tempSleeping"]
    missing = [f for f in required if f not in body]
    if missing:
        raise HTTPException(status_code=400, detail=f"Missing fields: {missing}")
    schedule = body["weeklySchedule"]
    if isinstance(schedule, dict):
        schedule_json = _json.dumps(schedule)
    else:
        schedule_json = schedule
    row = await db_upsert_user_preferences(
        user_id=user_id,
        weekly_schedule_json=schedule_json,
        temp_awake=float(body["tempAwake"]),
        temp_sleeping=float(body["tempSleeping"]),
    )
    if not row:
        raise HTTPException(status_code=500, detail="Failed to save preferences")
    return {
        "id": row["preference_id"],
        "weeklySchedule": row["weekly_schedule"],
        "tempAwake": row["temp_awake"],
        "tempSleeping": row["temp_sleeping"],
    }
