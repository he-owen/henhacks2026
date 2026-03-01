from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import text
from config import DATABASE_URL
import os
import logging
import ssl
import uuid

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
                SELECT d.device_id, d.user_id, d.location_id, d.name, d.type,
                       d.brand, d.model, d.hourly_energy, d.is_smart,
                       d.run_duration_minutes, l.name AS location_name
                FROM devices d
                LEFT JOIN locations l ON l.location_id = d.location_id
                WHERE d.user_id = :user_id
                ORDER BY d.name
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
    location_id: str | None = None,
) -> dict | None:
    """Create a device for the user. Returns the created row as dict or None on failure."""
    device_id = str(uuid.uuid4())
    try:
        async with async_session() as session:
            result = await session.execute(
                text("""
                    INSERT INTO devices (device_id, user_id, location_id, name, type, brand, model,
                                        hourly_energy, is_smart, run_duration_minutes)
                    VALUES (:device_id, :user_id, :location_id, :name, :type, :brand, :model,
                            :hourly_energy, :is_smart, :run_duration_minutes)
                    RETURNING device_id, user_id, location_id, name, type, brand, model,
                              hourly_energy, is_smart, run_duration_minutes
                """),
                {
                    "device_id": device_id,
                    "user_id": user_id,
                    "location_id": location_id,
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
    location_id: str | None = None,
) -> dict | None:
    """Update a device only if it belongs to the user. Returns updated row or None."""
    try:
        async with async_session() as session:
            result = await session.execute(
                text("""
                    UPDATE devices
                    SET name = :name, type = :type, brand = :brand, model = :model,
                        hourly_energy = :hourly_energy, is_smart = :is_smart,
                        run_duration_minutes = :run_duration_minutes,
                        location_id = :location_id
                    WHERE device_id = :device_id AND user_id = :user_id
                    RETURNING device_id, user_id, location_id, name, type, brand, model,
                              hourly_energy, is_smart, run_duration_minutes
                """),
                {
                    "device_id": device_id,
                    "user_id": user_id,
                    "location_id": location_id,
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


# ---------------------------------------------------------------------------
# Utility providers & hourly rates
# ---------------------------------------------------------------------------

async def upsert_utility_provider(
    zip_code: str,
    utility_name: str,
    rate_name: str,
    sector: str = "Residential",
    rate_structure_json: str | None = None,
    weekday_schedule_json: str | None = None,
    weekend_schedule_json: str | None = None,
    fuel_adjustments_json: str | None = None,
) -> dict | None:
    try:
        async with async_session() as session:
            result = await session.execute(
                text("""
                    INSERT INTO utility_providers
                        (provider_id, zip_code, utility_name, rate_name, sector,
                         rate_structure_json, weekday_schedule_json,
                         weekend_schedule_json, fuel_adjustments_json, fetched_at)
                    VALUES
                        (gen_random_uuid(), :zip_code, :utility_name, :rate_name, :sector,
                         CAST(:rate_structure_json AS jsonb), CAST(:weekday_schedule_json AS jsonb),
                         CAST(:weekend_schedule_json AS jsonb), CAST(:fuel_adjustments_json AS jsonb), NOW())
                    ON CONFLICT (zip_code, utility_name, rate_name) DO UPDATE SET
                        sector = EXCLUDED.sector,
                        rate_structure_json = EXCLUDED.rate_structure_json,
                        weekday_schedule_json = EXCLUDED.weekday_schedule_json,
                        weekend_schedule_json = EXCLUDED.weekend_schedule_json,
                        fuel_adjustments_json = EXCLUDED.fuel_adjustments_json,
                        fetched_at = NOW()
                    RETURNING provider_id, zip_code, utility_name, rate_name, sector, fetched_at
                """),
                {
                    "zip_code": zip_code,
                    "utility_name": utility_name,
                    "rate_name": rate_name,
                    "sector": sector,
                    "rate_structure_json": rate_structure_json,
                    "weekday_schedule_json": weekday_schedule_json,
                    "weekend_schedule_json": weekend_schedule_json,
                    "fuel_adjustments_json": fuel_adjustments_json,
                },
            )
            row = result.mappings().first()
            await session.commit()
            return dict(row) if row else None
    except Exception as e:
        logger.warning("Upsert utility provider failed: %s", e, exc_info=True)
        return None


async def get_providers_by_zip(zip_code: str) -> list[dict]:
    async with async_session() as session:
        result = await session.execute(
            text("""
                SELECT provider_id, zip_code, utility_name, rate_name, sector, fetched_at
                FROM utility_providers
                WHERE zip_code = :zip_code
                ORDER BY utility_name, rate_name
            """),
            {"zip_code": zip_code},
        )
        return [dict(r) for r in result.mappings().all()]


async def get_provider_by_id(provider_id: str) -> dict | None:
    async with async_session() as session:
        result = await session.execute(
            text("""
                SELECT provider_id, zip_code, utility_name, rate_name, sector,
                       rate_structure_json, weekday_schedule_json,
                       weekend_schedule_json, fuel_adjustments_json, fetched_at
                FROM utility_providers
                WHERE provider_id = :provider_id
            """),
            {"provider_id": provider_id},
        )
        row = result.mappings().first()
        return dict(row) if row else None


async def bulk_insert_hourly_rates(provider_id: str, month: int, year: int, rates: list[dict]) -> int:
    """Delete existing rates for the provider/month then insert new ones. Returns inserted count."""
    try:
        async with async_session() as session:
            await session.execute(
                text("""
                    DELETE FROM hourly_rates
                    WHERE provider_id = :provider_id
                      AND EXTRACT(MONTH FROM date) = :month
                      AND EXTRACT(YEAR FROM date) = :year
                """),
                {"provider_id": provider_id, "month": month, "year": year},
            )
            if rates:
                values_parts = []
                params = {"provider_id": provider_id}
                for i, r in enumerate(rates):
                    values_parts.append(
                        f"(gen_random_uuid(), :provider_id, :date_{i}, :hour_{i}, :base_rate_{i}, "
                        f":delivery_cost_{i}, :total_rate_{i}, :period_index_{i}, :period_label_{i})"
                    )
                    params[f"date_{i}"] = r["date"]
                    params[f"hour_{i}"] = r["hour"]
                    params[f"base_rate_{i}"] = r["base_rate"]
                    params[f"delivery_cost_{i}"] = r["delivery_cost"]
                    params[f"total_rate_{i}"] = r["total_rate"]
                    params[f"period_index_{i}"] = r["period_index"]
                    params[f"period_label_{i}"] = r["period_label"]
                values_sql = ",\n".join(values_parts)
                await session.execute(
                    text(f"""
                        INSERT INTO hourly_rates
                            (rate_id, provider_id, date, hour, base_rate, delivery_cost,
                             total_rate, period_index, period_label)
                        VALUES {values_sql}
                        ON CONFLICT (provider_id, date, hour) DO UPDATE SET
                            base_rate = EXCLUDED.base_rate,
                            delivery_cost = EXCLUDED.delivery_cost,
                            total_rate = EXCLUDED.total_rate,
                            period_index = EXCLUDED.period_index,
                            period_label = EXCLUDED.period_label
                    """),
                    params,
                )
            await session.commit()
            return len(rates)
    except Exception as e:
        logger.warning("Bulk insert hourly rates failed: %s", e, exc_info=True)
        return 0


async def get_hourly_rates(provider_id: str, month: int, year: int) -> list[dict]:
    async with async_session() as session:
        result = await session.execute(
            text("""
                SELECT rate_id, provider_id, date, hour, base_rate,
                       delivery_cost, total_rate, period_index, period_label
                FROM hourly_rates
                WHERE provider_id = :provider_id
                  AND EXTRACT(MONTH FROM date) = :month
                  AND EXTRACT(YEAR FROM date) = :year
                ORDER BY date, hour
            """),
            {"provider_id": provider_id, "month": month, "year": year},
        )
        return [dict(r) for r in result.mappings().all()]


async def get_user_profile(user_id: str) -> dict | None:
    async with async_session() as session:
        result = await session.execute(
            text("""
                SELECT u.id, u.email, u.selected_provider_id,
                       (SELECT l.zip FROM locations l WHERE l.user_id = u.id LIMIT 1) AS zip,
                       EXISTS(SELECT 1 FROM user_preferences p WHERE p.user_id = u.id) AS has_preferences
                FROM users u
                WHERE u.id = :user_id
            """),
            {"user_id": user_id},
        )
        row = result.mappings().first()
        return dict(row) if row else None


# ---------------------------------------------------------------------------
# Locations
# ---------------------------------------------------------------------------

async def get_locations_by_user(user_id: str) -> list[dict]:
    async with async_session() as session:
        result = await session.execute(
            text("""
                SELECT location_id, user_id, name, zip
                FROM locations
                WHERE user_id = :user_id
                ORDER BY name
            """),
            {"user_id": user_id},
        )
        return [dict(r) for r in result.mappings().all()]


async def create_location(user_id: str, name: str, zip_code: str) -> dict | None:
    location_id = str(uuid.uuid4())
    try:
        async with async_session() as session:
            result = await session.execute(
                text("""
                    INSERT INTO locations (location_id, user_id, name, zip)
                    VALUES (:location_id, :user_id, :name, :zip)
                    RETURNING location_id, user_id, name, zip
                """),
                {"location_id": location_id, "user_id": user_id, "name": name, "zip": zip_code},
            )
            row = result.mappings().first()
            await session.commit()
            return dict(row) if row else None
    except Exception as e:
        logger.warning("Create location failed: %s", e, exc_info=True)
        return None


async def update_location(location_id: str, user_id: str, name: str, zip_code: str) -> dict | None:
    try:
        async with async_session() as session:
            result = await session.execute(
                text("""
                    UPDATE locations SET name = :name, zip = :zip
                    WHERE location_id = :location_id AND user_id = :user_id
                    RETURNING location_id, user_id, name, zip
                """),
                {"location_id": location_id, "user_id": user_id, "name": name, "zip": zip_code},
            )
            row = result.mappings().first()
            await session.commit()
            return dict(row) if row else None
    except Exception as e:
        logger.warning("Update location failed: %s", e, exc_info=True)
        return None


async def delete_location(location_id: str, user_id: str) -> bool:
    async with async_session() as session:
        result = await session.execute(
            text("DELETE FROM locations WHERE location_id = :location_id AND user_id = :user_id"),
            {"location_id": location_id, "user_id": user_id},
        )
        await session.commit()
    return result.rowcount > 0


# ---------------------------------------------------------------------------
# Bill history
# ---------------------------------------------------------------------------

async def get_bills_by_user(user_id: str) -> list[dict]:
    async with async_session() as session:
        result = await session.execute(
            text("""
                SELECT bill_id, user_id, month, year, bill_total,
                       usage_kwh, utility, location_id, created_date
                FROM bill_history
                WHERE user_id = :user_id
                ORDER BY year DESC, month DESC
            """),
            {"user_id": user_id},
        )
        return [dict(r) for r in result.mappings().all()]


async def create_bill(
    user_id: str,
    month: int,
    year: int,
    bill_total: float,
    usage_kwh: int | None = None,
    utility: str | None = None,
    location_id: str | None = None,
) -> dict | None:
    bill_id = str(uuid.uuid4())
    try:
        async with async_session() as session:
            result = await session.execute(
                text("""
                    INSERT INTO bill_history
                        (bill_id, user_id, month, year, bill_total, usage_kwh, utility, location_id)
                    VALUES
                        (:bill_id, :user_id, :month, :year, :bill_total, :usage_kwh, :utility, :location_id)
                    RETURNING bill_id, user_id, month, year, bill_total, usage_kwh, utility, location_id, created_date
                """),
                {
                    "bill_id": bill_id,
                    "user_id": user_id,
                    "month": month,
                    "year": year,
                    "bill_total": bill_total,
                    "usage_kwh": usage_kwh,
                    "utility": utility,
                    "location_id": location_id,
                },
            )
            row = result.mappings().first()
            await session.commit()
            return dict(row) if row else None
    except Exception as e:
        logger.warning("Create bill failed: %s", e, exc_info=True)
        return None


async def update_bill(
    bill_id: str,
    user_id: str,
    month: int,
    year: int,
    bill_total: float,
) -> dict | None:
    try:
        async with async_session() as session:
            result = await session.execute(
                text("""
                    UPDATE bill_history
                    SET month = :month, year = :year, bill_total = :bill_total
                    WHERE bill_id = :bill_id AND user_id = :user_id
                    RETURNING bill_id, user_id, month, year, bill_total, usage_kwh, utility, location_id, created_date
                """),
                {
                    "bill_id": bill_id,
                    "user_id": user_id,
                    "month": month,
                    "year": year,
                    "bill_total": bill_total,
                },
            )
            row = result.mappings().first()
            await session.commit()
            return dict(row) if row else None
    except Exception as e:
        logger.warning("Update bill failed: %s", e, exc_info=True)
        return None


async def delete_bill(bill_id: str, user_id: str) -> bool:
    async with async_session() as session:
        result = await session.execute(
            text("DELETE FROM bill_history WHERE bill_id = :bill_id AND user_id = :user_id"),
            {"bill_id": bill_id, "user_id": user_id},
        )
        await session.commit()
    return result.rowcount > 0


async def set_user_provider(user_id: str, provider_id: str | None) -> bool:
    try:
        async with async_session() as session:
            await session.execute(
                text("""
                    UPDATE users SET selected_provider_id = :provider_id
                    WHERE id = :user_id
                """),
                {"user_id": user_id, "provider_id": provider_id},
            )
            await session.commit()
        return True
    except Exception as e:
        logger.warning("Set user provider failed: %s", e, exc_info=True)
        return False


# ---------------------------------------------------------------------------
# User preferences
# ---------------------------------------------------------------------------

async def upsert_user_preferences(
    user_id: str,
    weekly_schedule_json: str,
    temp_awake: float,
    temp_sleeping: float,
) -> dict | None:
    try:
        async with async_session() as session:
            result = await session.execute(
                text("""
                    INSERT INTO user_preferences
                        (preference_id, user_id, weekly_schedule, temp_awake, temp_sleeping)
                    VALUES
                        (gen_random_uuid(), :user_id,
                         CAST(:weekly_schedule AS jsonb), :temp_awake, :temp_sleeping)
                    ON CONFLICT (user_id) DO UPDATE SET
                        weekly_schedule = CAST(EXCLUDED.weekly_schedule AS jsonb),
                        temp_awake = EXCLUDED.temp_awake,
                        temp_sleeping = EXCLUDED.temp_sleeping
                    RETURNING preference_id, user_id, weekly_schedule, temp_awake, temp_sleeping
                """),
                {
                    "user_id": user_id,
                    "weekly_schedule": weekly_schedule_json,
                    "temp_awake": temp_awake,
                    "temp_sleeping": temp_sleeping,
                },
            )
            row = result.mappings().first()
            await session.commit()
            return dict(row) if row else None
    except Exception as e:
        logger.warning("Upsert user preferences failed: %s", e, exc_info=True)
        return None


async def get_user_preferences(user_id: str) -> dict | None:
    async with async_session() as session:
        result = await session.execute(
            text("""
                SELECT preference_id, user_id, weekly_schedule, temp_awake, temp_sleeping
                FROM user_preferences
                WHERE user_id = :user_id
            """),
            {"user_id": user_id},
        )
        row = result.mappings().first()
        return dict(row) if row else None
