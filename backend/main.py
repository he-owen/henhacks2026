from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from auth0_userinfo import get_userinfo
from config import CORS_ORIGINS
from database import check_database, upsert_user

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
