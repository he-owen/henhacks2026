"""
Seed script for demo data.
Uses the Gemini API for device enrichment so energy numbers are accurate.
Bill history includes usage_kwh (kWh) for each bill.

Usage:
    cd <project-root>
    python database/seed.py              # seed all three users
    python database/seed.py --clean       # wipe seed users first, then re-seed
    python database/seed.py --bills-only # seed only bill history (no devices)
    python database/seed.py --clean --bills-only  # replace only bill history with kWh
"""

import asyncio
import json
import logging
import os
import sys
import uuid
import random
from datetime import date, timedelta
from pathlib import Path
from decimal import Decimal

# Add backend to path so we can import its modules
_project_root = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_project_root / "backend"))

from config import DATABASE_URL
from database import (
    async_session,
    upsert_user,
    create_device as db_create_device,
    create_location as db_create_location,
    create_bill as db_create_bill,
    upsert_user_preferences as db_upsert_user_preferences,
    save_schedule as db_save_schedule,
    submit_schedule_feedback as db_submit_schedule_feedback,
)
from sqlalchemy import text

logging.basicConfig(level=logging.INFO, format="%(levelname)s  %(message)s")
log = logging.getLogger("seed")

# ---------------------------------------------------------------------------
# Gemini service (for device enrichment)
# ---------------------------------------------------------------------------
try:
    from GeminiAPI.service import GeminiService
    gemini = GeminiService()
    log.info("Gemini API loaded — devices will be enriched with real energy data")
except Exception as e:
    gemini = None
    log.warning("Gemini API not available (%s) — devices will use defaults", e)


def enrich_device(name: str, brand: str, model: str) -> dict:
    if gemini:
        try:
            result = gemini.enrich_device(name, brand, model)
            log.info("  Gemini enriched %s %s %s → %s", brand, name, model, result)
            return result
        except Exception as e:
            log.warning("  Gemini enrichment failed for %s: %s — using defaults", name, e)
    return {"type": "Other", "hourlyEnergy": 0.0, "isSmart": False, "runDurationMinutes": 60}


# ---------------------------------------------------------------------------
# Seed user definitions
# ---------------------------------------------------------------------------

SEED_USERS = [
    {
        "email": "saakethp@udel.edu",
        "locations": [
            {"name": "Home", "zip": "19711"},
        ],
        "devices": [
            {"name": "Smart Refrigerator",      "brand": "Samsung",  "model": "RF28R7551SR"},
            {"name": "OLED TV",                  "brand": "LG",       "model": "OLED65C3PUA"},
            {"name": "Learning Thermostat",      "brand": "Nest",     "model": "3rd Generation"},
            {"name": "Front Load Washer",        "brand": "Samsung",  "model": "WF45R6100AW"},
            {"name": "Electric Dryer",           "brand": "Samsung",  "model": "DVE45R6100W"},
            {"name": "Air Purifier Fan",         "brand": "Dyson",    "model": "Pure Cool TP04"},
            {"name": "Desktop Computer",         "brand": "Apple",    "model": "Mac Studio M2 Max"},
            {"name": "Smart Light Bulbs (4-pack)", "brand": "Philips", "model": "Hue A19 White"},
            {"name": "Dishwasher",               "brand": "Bosch",    "model": "SHPM88Z75N"},
        ],
        "bills": [
            {"month": 3,  "year": 2025, "total": 142.30, "kwh": 980,  "utility": "Delmarva Power"},
            {"month": 4,  "year": 2025, "total": 128.50, "kwh": 890,  "utility": "Delmarva Power"},
            {"month": 5,  "year": 2025, "total": 118.20, "kwh": 820,  "utility": "Delmarva Power"},
            {"month": 6,  "year": 2025, "total": 165.80, "kwh": 1150, "utility": "Delmarva Power"},
            {"month": 7,  "year": 2025, "total": 198.40, "kwh": 1380, "utility": "Delmarva Power"},
            {"month": 8,  "year": 2025, "total": 205.10, "kwh": 1420, "utility": "Delmarva Power"},
            {"month": 9,  "year": 2025, "total": 172.60, "kwh": 1200, "utility": "Delmarva Power"},
            {"month": 10, "year": 2025, "total": 135.40, "kwh": 940,  "utility": "Delmarva Power"},
            {"month": 11, "year": 2025, "total": 128.90, "kwh": 895,  "utility": "Delmarva Power"},
            {"month": 12, "year": 2025, "total": 152.70, "kwh": 1060, "utility": "Delmarva Power"},
            {"month": 1,  "year": 2026, "total": 161.20, "kwh": 1120, "utility": "Delmarva Power"},
            {"month": 2,  "year": 2026, "total": 148.80, "kwh": 1030, "utility": "Delmarva Power"},
        ],
        "preferences": {
            "temp_awake": 72,
            "temp_sleeping": 68,
            "schedule": {
                "monday":    {"awakeStart": "07:00", "awakeEnd": "23:00", "homeStart": "16:00", "homeEnd": "08:00"},
                "tuesday":   {"awakeStart": "07:00", "awakeEnd": "23:00", "homeStart": "16:00", "homeEnd": "08:00"},
                "wednesday": {"awakeStart": "07:00", "awakeEnd": "23:00", "homeStart": "16:00", "homeEnd": "08:00"},
                "thursday":  {"awakeStart": "07:00", "awakeEnd": "23:00", "homeStart": "16:00", "homeEnd": "08:00"},
                "friday":    {"awakeStart": "07:00", "awakeEnd": "23:30", "homeStart": "16:00", "homeEnd": "09:00"},
                "saturday":  {"awakeStart": "09:00", "awakeEnd": "00:00", "homeStart": "00:00", "homeEnd": "23:59"},
                "sunday":    {"awakeStart": "09:00", "awakeEnd": "23:00", "homeStart": "00:00", "homeEnd": "23:59"},
            },
        },
    },
    {
        "email": "brendonu1@gmail.com",
        "locations": [
            {"name": "Home", "zip": "19702"},
        ],
        "devices": [
            {"name": "French Door Refrigerator", "brand": "Whirlpool", "model": "WRX735SDHZ"},
            {"name": "4K OLED TV",                "brand": "Sony",      "model": "XR55A80K"},
            {"name": "Smart Thermostat",          "brand": "Ecobee",    "model": "SmartThermostat Premium"},
            {"name": "Front Load Washer",         "brand": "LG",        "model": "WM4000HWA"},
            {"name": "Electric Dryer",            "brand": "LG",        "model": "DLEX4000W"},
            {"name": "Dishwasher",                "brand": "Bosch",     "model": "SHPM88Z75N"},
            {"name": "Desktop PC",                "brand": "HP",        "model": "Pavilion TP01-2066"},
            {"name": "EV Charger",                "brand": "Tesla",     "model": "Wall Connector Gen 3"},
            {"name": "Window AC Unit",            "brand": "LG",        "model": "LW8016ER"},
            {"name": "Gaming Console",            "brand": "Sony",      "model": "PlayStation 5"},
        ],
        "bills": [
            {"month": 3,  "year": 2025, "total": 168.40, "kwh": 1160, "utility": "Delmarva Power"},
            {"month": 4,  "year": 2025, "total": 155.20, "kwh": 1070, "utility": "Delmarva Power"},
            {"month": 5,  "year": 2025, "total": 145.80, "kwh": 1010, "utility": "Delmarva Power"},
            {"month": 6,  "year": 2025, "total": 195.30, "kwh": 1350, "utility": "Delmarva Power"},
            {"month": 7,  "year": 2025, "total": 238.90, "kwh": 1660, "utility": "Delmarva Power"},
            {"month": 8,  "year": 2025, "total": 245.60, "kwh": 1700, "utility": "Delmarva Power"},
            {"month": 9,  "year": 2025, "total": 202.10, "kwh": 1400, "utility": "Delmarva Power"},
            {"month": 10, "year": 2025, "total": 162.70, "kwh": 1130, "utility": "Delmarva Power"},
            {"month": 11, "year": 2025, "total": 155.30, "kwh": 1080, "utility": "Delmarva Power"},
            {"month": 12, "year": 2025, "total": 178.50, "kwh": 1240, "utility": "Delmarva Power"},
            {"month": 1,  "year": 2026, "total": 190.40, "kwh": 1320, "utility": "Delmarva Power"},
            {"month": 2,  "year": 2026, "total": 175.90, "kwh": 1220, "utility": "Delmarva Power"},
        ],
        "preferences": {
            "temp_awake": 71,
            "temp_sleeping": 67,
            "schedule": {
                "monday":    {"awakeStart": "06:30", "awakeEnd": "23:00", "homeStart": "17:00", "homeEnd": "07:30"},
                "tuesday":   {"awakeStart": "06:30", "awakeEnd": "23:00", "homeStart": "17:00", "homeEnd": "07:30"},
                "wednesday": {"awakeStart": "06:30", "awakeEnd": "23:00", "homeStart": "17:00", "homeEnd": "07:30"},
                "thursday":  {"awakeStart": "06:30", "awakeEnd": "23:00", "homeStart": "17:00", "homeEnd": "07:30"},
                "friday":    {"awakeStart": "06:30", "awakeEnd": "23:30", "homeStart": "17:00", "homeEnd": "09:00"},
                "saturday":  {"awakeStart": "08:00", "awakeEnd": "00:00", "homeStart": "00:00", "homeEnd": "23:59"},
                "sunday":    {"awakeStart": "08:30", "awakeEnd": "23:00", "homeStart": "00:00", "homeEnd": "23:59"},
            },
        },
    },
    {
        "email": "heowen10@gmail.com",
        "locations": [
            {"name": "Home", "zip": "19713"},
        ],
        "devices": [
            {"name": "Side-by-Side Refrigerator", "brand": "LG",          "model": "LRSXS2706V"},
            {"name": "Smart TV",                   "brand": "TCL",         "model": "55S546"},
            {"name": "Smart Thermostat",           "brand": "Honeywell",   "model": "T9 Smart"},
            {"name": "Top Load Washer",            "brand": "Maytag",      "model": "MVW7230HC"},
            {"name": "Electric Dryer",             "brand": "Maytag",      "model": "MED7230HC"},
            {"name": "Dishwasher",                 "brand": "KitchenAid",  "model": "KDTM404KPS"},
            {"name": "Monitor",                    "brand": "Dell",        "model": "U2723QE"},
            {"name": "Robot Vacuum",               "brand": "iRobot",      "model": "Roomba j7+"},
            {"name": "Microwave",                  "brand": "Panasonic",   "model": "NN-SN67KS"},
            {"name": "Smart Speaker",              "brand": "Amazon",      "model": "Echo Show 10"},
        ],
        "bills": [
            {"month": 3,  "year": 2025, "total": 132.80, "kwh": 920,  "utility": "Delmarva Power"},
            {"month": 4,  "year": 2025, "total": 121.40, "kwh": 840,  "utility": "Delmarva Power"},
            {"month": 5,  "year": 2025, "total": 112.90, "kwh": 780,  "utility": "Delmarva Power"},
            {"month": 6,  "year": 2025, "total": 155.60, "kwh": 1080, "utility": "Delmarva Power"},
            {"month": 7,  "year": 2025, "total": 185.20, "kwh": 1290, "utility": "Delmarva Power"},
            {"month": 8,  "year": 2025, "total": 192.40, "kwh": 1340, "utility": "Delmarva Power"},
            {"month": 9,  "year": 2025, "total": 160.30, "kwh": 1110, "utility": "Delmarva Power"},
            {"month": 10, "year": 2025, "total": 125.60, "kwh": 870,  "utility": "Delmarva Power"},
            {"month": 11, "year": 2025, "total": 118.40, "kwh": 820,  "utility": "Delmarva Power"},
            {"month": 12, "year": 2025, "total": 140.90, "kwh": 980,  "utility": "Delmarva Power"},
            {"month": 1,  "year": 2026, "total": 149.60, "kwh": 1040, "utility": "Delmarva Power"},
            {"month": 2,  "year": 2026, "total": 138.20, "kwh": 960,  "utility": "Delmarva Power"},
        ],
        "preferences": {
            "temp_awake": 73,
            "temp_sleeping": 69,
            "schedule": {
                "monday":    {"awakeStart": "07:30", "awakeEnd": "23:30", "homeStart": "17:30", "homeEnd": "08:00"},
                "tuesday":   {"awakeStart": "07:30", "awakeEnd": "23:30", "homeStart": "17:30", "homeEnd": "08:00"},
                "wednesday": {"awakeStart": "07:30", "awakeEnd": "23:30", "homeStart": "17:30", "homeEnd": "08:00"},
                "thursday":  {"awakeStart": "07:30", "awakeEnd": "23:30", "homeStart": "17:30", "homeEnd": "08:00"},
                "friday":    {"awakeStart": "07:30", "awakeEnd": "00:00", "homeStart": "17:30", "homeEnd": "09:30"},
                "saturday":  {"awakeStart": "09:30", "awakeEnd": "00:00", "homeStart": "00:00", "homeEnd": "23:59"},
                "sunday":    {"awakeStart": "09:00", "awakeEnd": "23:00", "homeStart": "00:00", "homeEnd": "23:59"},
            },
        },
    },
]


# ---------------------------------------------------------------------------
# Schedule generation helpers (mirrors backend/main.py logic)
# ---------------------------------------------------------------------------
DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

DEFAULT_PRICES = []
for d in range(7):
    weekend = d in (5, 6)
    day_prices = []
    for h in range(24):
        if h < 6:
            day_prices.append(0.11 if weekend else 0.12)
        elif h < 9:
            day_prices.append(0.14 if weekend else 0.15)
        elif h < 14:
            day_prices.append(0.16 if weekend else 0.18)
        elif h < 21:
            day_prices.append(0.17 if weekend else 0.28)
        else:
            day_prices.append(0.13 if weekend else 0.15)
    DEFAULT_PRICES.append(day_prices)


def carbon_intensity(hour: int) -> float:
    if hour < 6 or hour >= 21:
        return 0.32
    if hour < 9 or hour >= 17:
        return 0.42
    return 0.52


def generate_fake_schedule(devices: list[dict], day_name: str) -> tuple[list, float, float, float, float]:
    """
    Generate a plausible optimized schedule for the given devices and day.
    Returns (schedule_json, optimized_cost, typical_cost, carbon_optimized, carbon_typical).
    """
    day_idx = DAY_NAMES.index(day_name)
    prices = DEFAULT_PRICES[day_idx]
    schedule = []
    opt_cost = 0.0
    typ_cost = 0.0
    opt_carbon = 0.0
    typ_carbon = 0.0

    for dev in devices:
        power = dev.get("hourly_energy") or 0.0
        if power == 0:
            continue
        dev_type = (dev.get("type") or "").lower()
        run_min = dev.get("run_duration_minutes") or 60
        name = dev.get("name", "Device")

        if dev_type in ("ac", "hvac", "thermostat") or "thermostat" in name.lower():
            run_times = "continuous"
            for h in range(24):
                opt_cost += power * prices[h]
                opt_carbon += power * carbon_intensity(h)
                typ_cost += power * prices[h]
                typ_carbon += power * carbon_intensity(h)
        elif dev_type in ("refrigerator",) or "refrigerator" in name.lower() or "fridge" in name.lower():
            run_times = "continuous"
            for h in range(24):
                opt_cost += power * prices[h]
                opt_carbon += power * carbon_intensity(h)
                typ_cost += power * prices[h]
                typ_carbon += power * carbon_intensity(h)
        elif dev_type in ("washer", "washing machine", "dryer", "dishwasher", "ev charger"):
            duration_h = max(1, round(run_min / 60))
            # Optimized: cheapest consecutive hours
            best_start = 0
            best_cost = float("inf")
            for start in range(24):
                c = sum(prices[(start + o) % 24] for o in range(duration_h))
                if c < best_cost:
                    best_cost = c
                    best_start = start
            run_times = [(best_start + o) % 24 for o in range(duration_h)]
            for h in run_times:
                opt_cost += power * prices[h]
                opt_carbon += power * carbon_intensity(h)
            # Typical: start at 5 PM
            for o in range(duration_h):
                h = (17 + o) % 24
                typ_cost += power * prices[h]
                typ_carbon += power * carbon_intensity(h)
        else:
            max_hours = max(1, round(run_min / 60))
            # Optimized: cheapest hours
            sorted_hours = sorted(range(24), key=lambda h: prices[h])
            run_times = sorted(sorted_hours[:max_hours])
            for h in run_times:
                opt_cost += power * prices[h]
                opt_carbon += power * carbon_intensity(h)
            # Typical: peak hours
            peak = list(range(14, 21))
            for h in peak[:max_hours]:
                typ_cost += power * prices[h]
                typ_carbon += power * carbon_intensity(h)

        schedule.append({
            "appliance": name,
            "run_times": run_times,
            "cost": round(opt_cost, 4),
        })

    # Add some random variation so each day isn't identical
    variation = random.uniform(0.92, 1.08)
    opt_cost *= variation
    typ_cost *= variation * random.uniform(1.0, 1.05)

    return schedule, round(opt_cost, 4), round(typ_cost, 4), round(opt_carbon, 4), round(typ_carbon, 4)


# ---------------------------------------------------------------------------
# Database helpers
# ---------------------------------------------------------------------------

async def get_user_id_by_email(email: str) -> str | None:
    """Look up an existing user's Auth0 id by email."""
    async with async_session() as session:
        result = await session.execute(
            text("SELECT id FROM users WHERE email = :email"),
            {"email": email},
        )
        row = result.scalar_one_or_none()
        return row


async def clean_user_data(user_id: str, bills_only: bool = False):
    """Delete seeded data for a user. If bills_only, only clear bill_history."""
    async with async_session() as session:
        if bills_only:
            await session.execute(text("DELETE FROM bill_history WHERE user_id = :uid"), {"uid": user_id})
            await session.commit()
            log.info("  Cleaned bill history for user %s", user_id)
        else:
            await session.execute(text("DELETE FROM saved_schedules WHERE user_id = :uid"), {"uid": user_id})
            await session.execute(text("DELETE FROM user_preferences WHERE user_id = :uid"), {"uid": user_id})
            await session.execute(text("DELETE FROM bill_history WHERE user_id = :uid"), {"uid": user_id})
            await session.execute(text("DELETE FROM devices WHERE user_id = :uid"), {"uid": user_id})
            await session.execute(text("DELETE FROM locations WHERE user_id = :uid"), {"uid": user_id})
            await session.commit()
            log.info("  Cleaned existing data for user %s", user_id)


# ---------------------------------------------------------------------------
# Main seed logic
# ---------------------------------------------------------------------------

async def seed_user(user_def: dict, clean: bool = False, bills_only: bool = False):
    email = user_def["email"]
    log.info("=" * 60)
    log.info("Seeding user: %s", email)

    # Resolve or create user
    user_id = await get_user_id_by_email(email)
    if user_id:
        log.info("  Found existing user: %s", user_id)
    else:
        user_id = f"seed|{email}"
        log.info("  User not found — creating with placeholder id: %s", user_id)
        await upsert_user(user_id, email)

    if clean:
        await clean_user_data(user_id, bills_only=bills_only)

    if bills_only:
        # Reseed only bill history (and optionally get home location for location_id)
        home_location_id = None
        async with async_session() as session:
            result = await session.execute(
                text("SELECT location_id FROM locations WHERE user_id = :uid LIMIT 1"),
                {"uid": user_id},
            )
            row = result.mappings().first()
            if row:
                home_location_id = row["location_id"]
        # --- Bills only ---
        for bill in user_def["bills"]:
            kwh = bill.get("kwh")
            if kwh is None:
                log.warning("  Bill %d/%d missing 'kwh' — skipping or use 0", bill["month"], bill["year"])
            usage_kwh = int(kwh) if kwh is not None else None
            row = await db_create_bill(
                user_id=user_id,
                month=bill["month"],
                year=bill["year"],
                bill_total=bill["total"],
                usage_kwh=usage_kwh,
                utility=bill.get("utility"),
                location_id=home_location_id,
            )
            if row:
                log.info("  Created bill: %d/%d $%.2f (%s kWh)",
                         bill["month"], bill["year"], bill["total"], usage_kwh if usage_kwh is not None else "—")
        return

    # --- Locations ---
    location_ids = {}
    for loc in user_def["locations"]:
        row = await db_create_location(user_id, loc["name"], loc["zip"])
        if row:
            location_ids[loc["name"]] = row["location_id"]
            log.info("  Created location: %s (%s) → %s", loc["name"], loc["zip"], row["location_id"])
        else:
            log.warning("  Failed to create location %s", loc["name"])

    home_location_id = location_ids.get("Home")

    # --- Devices (enriched via Gemini) ---
    created_devices = []
    for dev in user_def["devices"]:
        log.info("  Enriching device: %s %s %s ...", dev["brand"], dev["name"], dev["model"])
        enriched = enrich_device(dev["name"], dev["brand"], dev["model"])

        row = await db_create_device(
            user_id=user_id,
            name=dev["name"],
            type_=enriched.get("type", "Other"),
            brand=dev["brand"],
            model=dev["model"],
            hourly_energy=float(enriched.get("hourlyEnergy", 0.0)),
            is_smart=bool(enriched.get("isSmart", False)),
            run_duration_minutes=int(enriched.get("runDurationMinutes", 60)),
            location_id=home_location_id,
        )
        if row:
            created_devices.append(dict(row))
            log.info("    Created: %s [%s] %.3f kWh/hr, %d min/day",
                     dev["name"], enriched.get("type"), enriched.get("hourlyEnergy", 0), enriched.get("runDurationMinutes", 60))
        else:
            log.warning("    Failed to create device %s", dev["name"])

    # --- Bills (always include usage_kwh for energy tracking) ---
    for bill in user_def["bills"]:
        kwh = bill.get("kwh")
        if kwh is None:
            log.warning("  Bill %d/%d missing 'kwh' — skipping or use 0", bill["month"], bill["year"])
        usage_kwh = int(kwh) if kwh is not None else None
        row = await db_create_bill(
            user_id=user_id,
            month=bill["month"],
            year=bill["year"],
            bill_total=bill["total"],
            usage_kwh=usage_kwh,
            utility=bill.get("utility"),
            location_id=home_location_id,
        )
        if row:
            log.info("  Created bill: %d/%d $%.2f (%s kWh)",
                     bill["month"], bill["year"], bill["total"], usage_kwh if usage_kwh is not None else "—")

    # --- Preferences ---
    prefs = user_def["preferences"]
    await db_upsert_user_preferences(
        user_id=user_id,
        weekly_schedule_json=json.dumps(prefs["schedule"]),
        temp_awake=prefs["temp_awake"],
        temp_sleeping=prefs["temp_sleeping"],
    )
    log.info("  Set preferences: awake=%s°F, sleeping=%s°F", prefs["temp_awake"], prefs["temp_sleeping"])

    # --- Saved schedules (past 14 days) ---
    if created_devices:
        today = date.today()
        for days_ago in range(1, 15):
            sched_date = today - timedelta(days=days_ago)
            day_name = DAY_NAMES[sched_date.weekday()]

            schedule_json, opt_cost, typ_cost, opt_carbon, typ_carbon = generate_fake_schedule(
                created_devices, day_name
            )

            row = await db_save_schedule(
                user_id=user_id,
                schedule_date=sched_date.isoformat(),
                day_of_week=day_name,
                schedule_json=json.dumps(schedule_json),
                appliances_json=json.dumps([{
                    "name": d["name"],
                    "power": d.get("hourly_energy", 0),
                    "type": d.get("type", "Other"),
                } for d in created_devices]),
                optimized_cost=opt_cost,
                typical_cost=typ_cost,
                carbon_optimized=opt_carbon,
                carbon_typical=typ_carbon,
            )

            if row:
                # Randomly mark some as followed/not_followed (leave recent ones pending)
                if days_ago > 2:
                    followed = random.random() < 0.72  # ~72% compliance
                    await db_submit_schedule_feedback(row["schedule_id"], user_id, followed)
                    status_str = "followed" if followed else "not_followed"
                else:
                    status_str = "pending"
                log.info("  Schedule %s (%s) — $%.2f opt / $%.2f typ — %s",
                         sched_date.isoformat(), day_name, opt_cost, typ_cost, status_str)

    log.info("Done seeding %s", email)


async def main():
    clean = "--clean" in sys.argv
    bills_only = "--bills-only" in sys.argv
    if clean:
        log.info("Running in CLEAN mode — existing data will be wiped first")
    if bills_only:
        log.info("Running in BILLS-ONLY mode — only bill history will be seeded (use with --clean to replace bills)")

    for user_def in SEED_USERS:
        await seed_user(user_def, clean=clean, bills_only=bills_only)

    log.info("=" * 60)
    log.info("Seeding complete!")
    log.info("  Users seeded: %s", ", ".join(u["email"] for u in SEED_USERS))
    log.info("  Devices per user: %s", ", ".join(str(len(u["devices"])) for u in SEED_USERS))
    log.info("  Bills per user: 12 months")
    log.info("  Schedules per user: 14 days of history")


if __name__ == "__main__":
    asyncio.run(main())
