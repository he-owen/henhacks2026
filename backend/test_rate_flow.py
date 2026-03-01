"""
End-to-end test for the utility rate pipeline.

Tests:
  1. Fetch providers from OpenEI for a zip code and store in utility_providers
  2. Verify utility_providers table is populated correctly
  3. Generate hourly rates for a provider/month/year
  4. Verify hourly_rates table has correct row counts and structure
  5. Query rates back and validate filtering by provider + month + year
  6. Verify user profile provider linkage

Usage:
    cd backend
    python test_rate_flow.py
"""

import asyncio
import calendar
import sys
from datetime import date

from config import DATABASE_URL

print(f"Using DB: {DATABASE_URL[:40]}...")


async def main():
    from database import (
        async_session,
        upsert_utility_provider,
        get_providers_by_zip,
        get_provider_by_id,
        get_hourly_rates,
        bulk_insert_hourly_rates,
        check_database,
    )
    from rate_service import (
        fetch_and_store_providers,
        generate_monthly_rates,
    )

    ZIP = "19805"
    MONTH = 3
    YEAR = 2026
    passed = 0
    failed = 0

    def ok(label):
        nonlocal passed
        passed += 1
        print(f"  [PASS] {label}")

    def fail(label, detail=""):
        nonlocal failed
        failed += 1
        print(f"  [FAIL] {label}  {detail}")

    # ------------------------------------------------------------------
    print("\n=== 1. Database connectivity ===")
    db_ok = await check_database()
    if db_ok:
        ok("Database connection")
    else:
        fail("Database connection")
        print("Cannot continue without DB. Exiting.")
        sys.exit(1)

    # ------------------------------------------------------------------
    print("\n=== 2. Fetch & store providers from OpenEI ===")
    try:
        providers = await fetch_and_store_providers(ZIP)
        print(f"  Fetched {len(providers)} provider(s) from OpenEI for zip {ZIP}")
        if len(providers) > 0:
            ok(f"fetch_and_store_providers returned {len(providers)} rows")
        else:
            fail("fetch_and_store_providers returned 0 rows")
    except Exception as e:
        fail("fetch_and_store_providers raised exception", str(e))
        providers = []

    # ------------------------------------------------------------------
    print("\n=== 3. Verify utility_providers table ===")
    db_providers = await get_providers_by_zip(ZIP)
    print(f"  Rows in utility_providers for zip {ZIP}: {len(db_providers)}")

    if len(db_providers) > 0:
        ok(f"get_providers_by_zip returned {len(db_providers)} rows")
    else:
        fail("get_providers_by_zip returned 0 rows")

    required_fields = ["provider_id", "zip_code", "utility_name", "rate_name", "sector", "fetched_at"]
    if db_providers:
        row = db_providers[0]
        missing = [f for f in required_fields if f not in row]
        if missing:
            fail(f"Provider row missing fields: {missing}")
        else:
            ok("Provider row has all required fields")
        print(f"  Sample provider: {row.get('utility_name')} — {row.get('rate_name')}")

    # ------------------------------------------------------------------
    print("\n=== 4. Verify provider detail (rate structure JSON stored) ===")
    if db_providers:
        pid = db_providers[0]["provider_id"]
        detail = await get_provider_by_id(pid)
        if detail:
            ok(f"get_provider_by_id found provider {pid[:8]}...")
            rs = detail.get("rate_structure_json")
            wd = detail.get("weekday_schedule_json")
            we = detail.get("weekend_schedule_json")

            if rs and isinstance(rs, list) and len(rs) > 0:
                ok(f"rate_structure_json present ({len(rs)} period(s))")
            elif rs is None or rs == [] or rs == "null":
                fail("rate_structure_json is empty/null")
            else:
                ok(f"rate_structure_json present (type={type(rs).__name__})")

            if wd and isinstance(wd, list) and len(wd) == 12:
                ok(f"weekday_schedule_json present (12 months)")
                if len(wd[0]) == 24:
                    ok("weekday_schedule month has 24 hour slots")
                else:
                    fail(f"weekday_schedule month has {len(wd[0])} slots, expected 24")
            elif wd:
                fail(f"weekday_schedule_json unexpected shape: len={len(wd) if isinstance(wd, list) else '?'}")
            else:
                print("  [WARN] weekday_schedule_json is null — rate will use flat fallback")

            if we and isinstance(we, list) and len(we) == 12:
                ok(f"weekend_schedule_json present (12 months)")
            elif we:
                fail(f"weekend_schedule_json unexpected shape")
            else:
                print("  [WARN] weekend_schedule_json is null — weekends will use flat fallback")
        else:
            fail(f"get_provider_by_id returned None for {pid[:8]}...")
    else:
        print("  [SKIP] No providers to check detail")

    # ------------------------------------------------------------------
    print(f"\n=== 5. Generate hourly rates for {MONTH}/{YEAR} ===")
    if db_providers:
        pid = db_providers[0]["provider_id"]
        try:
            count = await generate_monthly_rates(pid, MONTH, YEAR)
            expected_days = calendar.monthrange(YEAR, MONTH)[1]
            expected_rows = expected_days * 24
            print(f"  Generated {count} hourly rate rows (expected {expected_rows})")
            if count == expected_rows:
                ok(f"Row count matches: {count} = {expected_days} days * 24 hours")
            elif count > 0:
                fail(f"Row count mismatch: got {count}, expected {expected_rows}")
            else:
                fail("generate_monthly_rates returned 0")
        except Exception as e:
            fail("generate_monthly_rates raised exception", str(e))
    else:
        print("  [SKIP] No providers available")

    # ------------------------------------------------------------------
    print(f"\n=== 6. Query hourly_rates table — provider + month + year filter ===")
    if db_providers:
        pid = db_providers[0]["provider_id"]
        rates = await get_hourly_rates(pid, MONTH, YEAR)
        expected_days = calendar.monthrange(YEAR, MONTH)[1]
        expected_rows = expected_days * 24
        print(f"  Rows returned: {len(rates)}")

        if len(rates) == expected_rows:
            ok(f"Correct row count: {len(rates)}")
        elif len(rates) > 0:
            fail(f"Row count: {len(rates)}, expected {expected_rows}")
        else:
            fail("Query returned 0 rows")

        if rates:
            r = rates[0]
            rate_fields = ["rate_id", "provider_id", "date", "hour", "base_rate",
                           "delivery_cost", "total_rate", "period_index", "period_label"]
            missing = [f for f in rate_fields if f not in r]
            if missing:
                fail(f"Rate row missing fields: {missing}")
            else:
                ok("Rate row has all required fields")

            if r["provider_id"] == pid:
                ok("provider_id matches the queried provider")
            else:
                fail(f"provider_id mismatch: {r['provider_id']} != {pid}")

            rate_date = r["date"]
            if isinstance(rate_date, date):
                if rate_date.month == MONTH and rate_date.year == YEAR:
                    ok(f"Date is in the correct month/year: {rate_date}")
                else:
                    fail(f"Date outside requested month: {rate_date}")
            else:
                ok(f"Date value present: {rate_date}")

            base = float(r["base_rate"])
            deliv = float(r["delivery_cost"])
            total = float(r["total_rate"])
            if abs(total - (base + deliv)) < 0.000001:
                ok(f"total_rate = base_rate + delivery_cost ({total:.6f} = {base:.6f} + {deliv:.6f})")
            else:
                fail(f"total_rate mismatch: {total} != {base} + {deliv}")

            valid_labels = {"peak", "mid-peak", "off-peak", "flat"}
            if r["period_label"] in valid_labels:
                ok(f"period_label is valid: '{r['period_label']}'")
            else:
                fail(f"Unknown period_label: '{r['period_label']}'")

    # ------------------------------------------------------------------
    print(f"\n=== 7. Verify rates only for the requested provider ===")
    if len(db_providers) >= 2:
        other_pid = db_providers[1]["provider_id"]
        other_rates = await get_hourly_rates(other_pid, MONTH, YEAR)
        if len(other_rates) == 0:
            ok(f"No rates leaked to other provider {other_pid[:8]}...")
        else:
            print(f"  [INFO] Other provider also has {len(other_rates)} rates (may have been generated separately)")
    else:
        print("  [SKIP] Only 1 provider in DB, cannot cross-check")

    # ------------------------------------------------------------------
    print(f"\n=== 8. Verify no data leaks across months ===")
    if db_providers:
        pid = db_providers[0]["provider_id"]
        wrong_month = (MONTH % 12) + 1
        wrong_rates = await get_hourly_rates(pid, wrong_month, YEAR)
        if len(wrong_rates) == 0:
            ok(f"No rates for month {wrong_month} (only generated for month {MONTH})")
        else:
            print(f"  [INFO] Month {wrong_month} has {len(wrong_rates)} rates (may have been generated separately)")

    # ------------------------------------------------------------------
    print(f"\n=== 9. TOU mix: verify off-peak, mid-peak, peak (not all peak) ===")
    if db_providers:
        # Use Delmarva Resident Bundled if available, else first provider
        delmarva = next(
            (p for p in db_providers if "delmarva" in (p.get("utility_name") or "").lower()
            and "resident" in (p.get("rate_name") or "").lower()),
            db_providers[0],
        )
        pid = delmarva["provider_id"]
        # Regenerate Feb 2026 to ensure TOU heuristic is applied
        await generate_monthly_rates(pid, 2, 2026)
        feb_rates = await get_hourly_rates(pid, 2, 2026)
        if feb_rates:
            labels = [r["period_label"] for r in feb_rates]
            peak_count = labels.count("peak")
            off_count = labels.count("off-peak")
            mid_count = labels.count("mid-peak")
            flat_count = labels.count("flat")
            print(f"  Feb 2026 labels: peak={peak_count}, mid-peak={mid_count}, off-peak={off_count}, flat={flat_count}")
            if peak_count == len(feb_rates):
                fail("All hours are peak — TOU heuristic not applied")
            elif off_count > 0 or mid_count > 0:
                ok(f"TOU mix present: {off_count} off-peak, {mid_count} mid-peak, {peak_count} peak")
            else:
                fail(f"Unexpected label distribution: {set(labels)}")
        else:
            print("  [SKIP] No Feb 2026 rates to check")
    else:
        print("  [SKIP] No providers")

    # ------------------------------------------------------------------
    print(f"\n=== 10. Spot-check hourly coverage for each day ===")
    if db_providers:
        pid = db_providers[0]["provider_id"]
        rates = await get_hourly_rates(pid, MONTH, YEAR)
        days_map = {}
        for r in rates:
            d = str(r["date"])
            if d not in days_map:
                days_map[d] = set()
            days_map[d].add(r["hour"])

        expected_days = calendar.monthrange(YEAR, MONTH)[1]
        if len(days_map) == expected_days:
            ok(f"All {expected_days} days have rate data")
        else:
            fail(f"Only {len(days_map)} days have data, expected {expected_days}")

        bad_days = []
        for d, hours in days_map.items():
            if len(hours) != 24:
                bad_days.append((d, len(hours)))
        if not bad_days:
            ok("Every day has exactly 24 hourly entries")
        else:
            fail(f"{len(bad_days)} day(s) have wrong hour count: {bad_days[:5]}")

    # ------------------------------------------------------------------
    print(f"\n{'='*50}")
    print(f"Results: {passed} passed, {failed} failed")
    if failed == 0:
        print("All checks passed!")
    else:
        print("Some checks failed — review output above.")
    print()

    return failed


if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(min(exit_code, 1))
