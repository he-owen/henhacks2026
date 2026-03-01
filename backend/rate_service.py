"""
Rate service: fetches utility rates from OpenEI, computes hourly rates with
TOU delivery cost adjustments, and persists them via database.py.
"""

import calendar
import json
import os
from datetime import date, datetime
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from database import (
    upsert_utility_provider,
    get_provider_by_id,
    bulk_insert_hourly_rates,
)

API_BASE = "https://api.openei.org/utility_rates"

# Delivery cost constants ($/kWh).  Easy to tune or make configurable later.
BASE_DELIVERY_RATE = 0.04
PEAK_MULTIPLIER = 1.5
MID_PEAK_MULTIPLIER = 1.0
OFF_PEAK_MULTIPLIER = 0.6


def _get_api_key() -> str:
    key = os.environ.get("OPENEI_API_KEY", "")
    if not key:
        raise ValueError("OPENEI_API_KEY is not set")
    return key


def fetch_rates_from_openei(
    api_key: str,
    address: str,
    limit: int = 10,
    sector: str = "Residential",
) -> list[dict]:
    """Call the OpenEI utility_rates endpoint and return the raw items list."""
    params = {
        "version": 7,
        "format": "json",
        "detail": "full",
        "api_key": api_key,
        "address": address,
        "limit": limit,
        "sector": sector,
    }
    url = f"{API_BASE}?{urlencode(params)}"
    req = Request(url, headers={"User-Agent": "EnergyManager/1.0"})
    with urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read().decode())
    return data.get("items") or data.get("results") or []


async def fetch_and_store_providers(zip_code: str, sector: str = "Residential") -> list[dict]:
    """Fetch providers from OpenEI for a zip, upsert them, and return summary rows."""
    api_key = _get_api_key()
    items = fetch_rates_from_openei(api_key, address=zip_code, sector=sector)
    results = []
    for item in items:
        utility_name = item.get("utility") or item.get("label") or "Unknown"
        rate_name = item.get("name") or item.get("label") or "Default"
        row = await upsert_utility_provider(
            zip_code=zip_code,
            utility_name=utility_name,
            rate_name=rate_name,
            sector=item.get("sector") or sector,
            rate_structure_json=json.dumps(item.get("energyratestructure")),
            weekday_schedule_json=json.dumps(item.get("energyweekdayschedule")),
            weekend_schedule_json=json.dumps(item.get("energyweekendschedule")),
            fuel_adjustments_json=json.dumps(item.get("fueladjustmentsmonthly")),
        )
        if row:
            results.append(row)
    return results


def _classify_periods(rate_structure: list) -> dict[int, str]:
    """Classify each period index as peak/mid-peak/off-peak based on actual rate values."""
    if not rate_structure:
        return {}
    if len(rate_structure) <= 1:
        return {0: "flat"}

    rates_by_idx = {}
    for idx, period in enumerate(rate_structure):
        tiers = period if isinstance(period, list) else [period]
        if tiers and isinstance(tiers[0], dict):
            rates_by_idx[idx] = float(tiers[0].get("rate", 0) or 0)
        else:
            rates_by_idx[idx] = 0.0

    sorted_indices = sorted(rates_by_idx.keys(), key=lambda i: rates_by_idx[i])
    n = len(sorted_indices)
    labels = {}
    for rank, idx in enumerate(sorted_indices):
        if n == 2:
            labels[idx] = "off-peak" if rank == 0 else "peak"
        else:
            if rank == 0:
                labels[idx] = "off-peak"
            elif rank == n - 1:
                labels[idx] = "peak"
            else:
                labels[idx] = "mid-peak"
    return labels


def _delivery_cost_for_label(label: str) -> float:
    if label == "peak":
        return BASE_DELIVERY_RATE * PEAK_MULTIPLIER
    if label == "mid-peak":
        return BASE_DELIVERY_RATE * MID_PEAK_MULTIPLIER
    if label == "off-peak":
        return BASE_DELIVERY_RATE * OFF_PEAK_MULTIPLIER
    return BASE_DELIVERY_RATE * MID_PEAK_MULTIPLIER


def compute_rate_for_hour(
    rate_structure: list,
    weekday_schedule: list,
    weekend_schedule: list,
    fuel_adjustments: list | None,
    dt: datetime,
    period_labels: dict[int, str] | None = None,
) -> dict:
    """Compute the base rate and delivery cost for a specific datetime hour.

    Returns a dict with base_rate, delivery_cost, total_rate, period_index, period_label.
    """
    month_idx = dt.month - 1
    hour_idx = dt.hour
    is_weekend = dt.weekday() >= 5

    schedule = weekend_schedule if is_weekend else weekday_schedule

    if not schedule or len(schedule) != 12 or len(schedule[0]) != 24:
        return _flat_fallback(rate_structure, fuel_adjustments, month_idx)

    period_idx = schedule[month_idx][hour_idx]

    if not rate_structure or period_idx >= len(rate_structure):
        return _flat_fallback(rate_structure, fuel_adjustments, month_idx)

    period = rate_structure[period_idx]
    tiers = period if isinstance(period, list) else [period]
    if not tiers or not isinstance(tiers[0], dict):
        return _flat_fallback(rate_structure, fuel_adjustments, month_idx)

    tier = tiers[0]
    rate_val = tier.get("rate", 0) or 0
    adj = tier.get("adj", 0) or 0
    fam = fuel_adjustments or [0] * 12
    fuel = fam[month_idx] if month_idx < len(fam) else 0
    base_rate = float(rate_val) + float(adj) + float(fuel)

    if period_labels is None:
        period_labels = _classify_periods(rate_structure)
    label = period_labels.get(period_idx, "mid-peak")
    delivery = _delivery_cost_for_label(label)

    return {
        "base_rate": round(base_rate, 6),
        "delivery_cost": round(delivery, 6),
        "total_rate": round(base_rate + delivery, 6),
        "period_index": period_idx,
        "period_label": label,
    }


def _flat_fallback(rate_structure, fuel_adjustments, month_idx):
    """Best-effort flat rate when schedule data is missing."""
    base = 0.0
    if rate_structure and len(rate_structure) > 0:
        period = rate_structure[0]
        tiers = period if isinstance(period, list) else [period]
        if tiers and isinstance(tiers[0], dict):
            base = float(tiers[0].get("rate", 0) or 0) + float(tiers[0].get("adj", 0) or 0)
    fam = fuel_adjustments or [0] * 12
    fuel = fam[month_idx] if month_idx < len(fam) else 0
    base += float(fuel)
    delivery = BASE_DELIVERY_RATE * MID_PEAK_MULTIPLIER
    return {
        "base_rate": round(base, 6),
        "delivery_cost": round(delivery, 6),
        "total_rate": round(base + delivery, 6),
        "period_index": 0,
        "period_label": "flat",
    }


async def generate_monthly_rates(provider_id: str, month: int, year: int) -> int:
    """Compute hourly rates for every day/hour in the given month and store them."""
    provider = await get_provider_by_id(provider_id)
    if not provider:
        raise ValueError(f"Provider {provider_id} not found")

    rate_structure = provider.get("rate_structure_json") or []
    weekday_schedule = provider.get("weekday_schedule_json") or []
    weekend_schedule = provider.get("weekend_schedule_json") or []
    fuel_adjustments = provider.get("fuel_adjustments_json")

    # Parse JSON strings if stored as text
    if isinstance(rate_structure, str):
        rate_structure = json.loads(rate_structure) if rate_structure else []
    if isinstance(weekday_schedule, str):
        weekday_schedule = json.loads(weekday_schedule) if weekday_schedule else []
    if isinstance(weekend_schedule, str):
        weekend_schedule = json.loads(weekend_schedule) if weekend_schedule else []
    if isinstance(fuel_adjustments, str):
        fuel_adjustments = json.loads(fuel_adjustments) if fuel_adjustments else None

    period_labels = _classify_periods(rate_structure)
    num_days = calendar.monthrange(year, month)[1]
    rates: list[dict] = []

    for day in range(1, num_days + 1):
        dt_date = date(year, month, day)
        for hour in range(24):
            dt = datetime(year, month, day, hour)
            info = compute_rate_for_hour(
                rate_structure, weekday_schedule, weekend_schedule, fuel_adjustments, dt,
                period_labels=period_labels,
            )
            rates.append({
                "date": dt_date,
                "hour": hour,
                **info,
            })

    count = await bulk_insert_hourly_rates(provider_id, month, year, rates)
    return count
