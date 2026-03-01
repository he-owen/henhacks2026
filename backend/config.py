import os
from pathlib import Path

from dotenv import load_dotenv

# Load .env from project root so AUTH0_DOMAIN, DATABASE_URL, etc. are set when running backend
for _p in (Path(__file__).resolve().parent.parent / ".env", Path.cwd() / ".env"):
    if _p.exists():
        load_dotenv(_p)
        break

# Use asyncpg for async SQLAlchemy (Supabase/etc often give postgresql://)
_raw_db = os.getenv(
    "DATABASE_URL", "postgresql+asyncpg://app:changeme@localhost:5432/appdb"
)
if _raw_db.startswith("postgresql://") and "+asyncpg" not in _raw_db:
    DATABASE_URL = _raw_db.replace("postgresql://", "postgresql+asyncpg://", 1)
else:
    DATABASE_URL = _raw_db
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

# Comma-separated origins allowed by CORS (e.g. http://localhost:5173,https://app.example.com)
_REQUIRED_ORIGINS = {
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://henhacks2026.vercel.app",
}
CORS_ORIGINS = list(
    _REQUIRED_ORIGINS
    | {
        origin.strip()
        for origin in os.getenv("CORS_ORIGINS", "").split(",")
        if origin.strip()
    }
)

# Auth0 (for validating sync requests via userinfo). Backend reads AUTH0_DOMAIN or VITE_AUTH0_DOMAIN.
AUTH0_DOMAIN = (
    os.getenv("AUTH0_DOMAIN") or os.getenv("VITE_AUTH0_DOMAIN") or ""
).rstrip("/")
