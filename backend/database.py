from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import text
from config import DATABASE_URL
import os
import logging
import ssl

_use_ssl = os.getenv("DATABASE_SSL", "true").lower() in ("1", "true", "yes")
_verify_ssl = os.getenv("DATABASE_SSL_VERIFY", "false").lower() in ("1", "true", "yes")

_connect_args = {}
if _use_ssl:
    if _verify_ssl:
        _connect_args["ssl"] = True
    else:
        # Skip cert verification (avoids CERTIFICATE_VERIFY_FAILED on Render/Supabase)
        _ctx = ssl.create_default_context()
        _ctx.check_hostname = False
        _ctx.verify_mode = ssl.CERT_NONE
        _connect_args["ssl"] = _ctx

engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    connect_args=_connect_args,
    pool_pre_ping=True,
)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
logger = logging.getLogger(__name__)


async def check_database() -> bool:
    try:
        async with async_session() as session:
            await session.execute(text("SELECT 1"))
        return True
    except Exception as e:
        logger.warning("Database check failed: %s", e, exc_info=True)
        return False


async def upsert_user(user_id: str, email: str) -> bool:
    """Insert or update a user by Auth0 id and email. Returns True on success."""
    try:
        async with async_session() as session:
            await session.execute(
                text("""
                    INSERT INTO users (id, email)
                    VALUES (:id, :email)
                    ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email
                """),
                {"id": user_id, "email": email},
            )
            await session.commit()
        return True
    except Exception as e:
        logger.warning("User upsert failed: %s", e, exc_info=True)
        return False


async def get_devices_by_user(user_id: str) -> list[dict]:
    """Return all devices for the given user. Rows use snake_case keys."""
    async with async_session() as session:
        result = await session.execute(
            text("""
                SELECT device_id, user_id, name, type, brand, model,
                       hourly_energy, is_smart, run_duration_minutes
                FROM devices
                WHERE user_id = :user_id
                ORDER BY name
            """),
            {"user_id": user_id},
        )
        rows = result.mappings().all()
    return [dict(r) for r in rows]


async def create_device(
    user_id: str,
    name: str,
    type_: str,
    brand: str | None = None,
    model: str | None = None,
    hourly_energy: float | None = None,
    is_smart: bool = False,
    run_duration_minutes: int | None = None,
) -> dict | None:
    """Create a device for the user. Returns the created row as dict or None on failure."""
    try:
        async with async_session() as session:
            result = await session.execute(
                text("""
                    INSERT INTO devices (user_id, name, type, brand, model,
                                        hourly_energy, is_smart, run_duration_minutes)
                    VALUES (:user_id, :name, :type, :brand, :model,
                            :hourly_energy, :is_smart, :run_duration_minutes)
                    RETURNING device_id, user_id, name, type, brand, model,
                              hourly_energy, is_smart, run_duration_minutes
                """),
                {
                    "user_id": user_id,
                    "name": name,
                    "type": type_,
                    "brand": brand or None,
                    "model": model or None,
                    "hourly_energy": hourly_energy,
                    "is_smart": is_smart,
                    "run_duration_minutes": run_duration_minutes,
                },
            )
            row = result.mappings().first()
            await session.commit()
            return dict(row) if row else None
    except Exception as e:
        logger.warning("Create device failed: %s", e, exc_info=True)
        return None


async def update_device(
    device_id: str,
    user_id: str,
    name: str,
    type_: str,
    brand: str | None = None,
    model: str | None = None,
    hourly_energy: float | None = None,
    is_smart: bool = False,
    run_duration_minutes: int | None = None,
) -> dict | None:
    """Update a device only if it belongs to the user. Returns updated row or None."""
    try:
        async with async_session() as session:
            result = await session.execute(
                text("""
                    UPDATE devices
                    SET name = :name, type = :type, brand = :brand, model = :model,
                        hourly_energy = :hourly_energy, is_smart = :is_smart,
                        run_duration_minutes = :run_duration_minutes
                    WHERE device_id = :device_id AND user_id = :user_id
                    RETURNING device_id, user_id, name, type, brand, model,
                              hourly_energy, is_smart, run_duration_minutes
                """),
                {
                    "device_id": device_id,
                    "user_id": user_id,
                    "name": name,
                    "type": type_,
                    "brand": brand or None,
                    "model": model or None,
                    "hourly_energy": hourly_energy,
                    "is_smart": is_smart,
                    "run_duration_minutes": run_duration_minutes,
                },
            )
            row = result.mappings().first()
            await session.commit()
            return dict(row) if row else None
    except Exception as e:
        logger.warning("Update device failed: %s", e, exc_info=True)
        return None


async def delete_device(device_id: str, user_id: str) -> bool:
    """Delete a device only if it belongs to the user. Returns True if a row was deleted."""
    async with async_session() as session:
        result = await session.execute(
            text("DELETE FROM devices WHERE device_id = :device_id AND user_id = :user_id"),
            {"device_id": device_id, "user_id": user_id},
        )
        await session.commit()
    return result.rowcount > 0
