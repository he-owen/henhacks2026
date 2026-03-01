"""
Test that bundled rates have delivery_cost = 0.

Runs: fetch providers for 19805, find Delmarva Resident Bundled,
      generate Feb 2026 rates, verify delivery_cost is 0 for all hours.

Usage:
    cd backend
    python test_bundled_rates.py
"""

import asyncio
import calendar
import sys

from config import DATABASE_URL

print(f"Using DB: {DATABASE_URL[:40]}...")

ZIP = "19805"
MONTH = 2  # February
YEAR = 2026


async def main():
    from database import (
        get_providers_by_zip,
        get_hourly_rates,
        check_database,
    )
    from rate_service import (
        fetch_and_store_providers,
        generate_monthly_rates,
    )

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
    if not await check_database():
        fail("Database connection")
        print("Cannot continue. Exiting.")
        sys.exit(1)
    ok("Database connection")

    # ------------------------------------------------------------------
    print(f"\n=== 2. Fetch providers for zip {ZIP} ===")
    try:
        await fetch_and_store_providers(ZIP)
        ok("Fetched and stored providers")
    except Exception as e:
        fail("fetch_and_store_providers", str(e))
        sys.exit(1)

    # ------------------------------------------------------------------
    print(f"\n=== 3. Find Delmarva Resident Bundled ===")
    providers = await get_providers_by_zip(ZIP)
    delmarva_bundled = next(
        (
            p
            for p in providers
            if "delmarva" in (p.get("utility_name") or "").lower()
            and "bundled" in (p.get("rate_name") or "").lower()
            and "resident" in (p.get("rate_name") or "").lower()
        ),
        None,
    )

    if not delmarva_bundled:
        # Try looser match: delmarva + bundled
        delmarva_bundled = next(
            (
                p
                for p in providers
                if "delmarva" in (p.get("utility_name") or "").lower()
                and "bundled" in (p.get("rate_name") or "").lower()
            ),
            None,
        )

    if not delmarva_bundled:
        # List what we have
        print("  Available providers:")
        for p in providers[:10]:
            print(f"    - {p.get('utility_name')} — {p.get('rate_name')} (service_type={p.get('service_type')})")
        fail("Could not find Delmarva Resident Bundled")
        sys.exit(1)

    ok(f"Found: {delmarva_bundled.get('utility_name')} — {delmarva_bundled.get('rate_name')}")

    service_type = delmarva_bundled.get("service_type")
    rate_name = (delmarva_bundled.get("rate_name") or "").lower()
    if (service_type or "").strip().lower() == "bundled":
        ok(f"Provider service_type is 'Bundled' (got: {service_type!r})")
    elif "bundled" in rate_name:
        ok(f"Provider inferred as bundled from rate name (service_type={service_type!r})")
    else:
        fail(f"Provider should be bundled (service_type={service_type!r}, rate_name={rate_name!r})")

    # ------------------------------------------------------------------
    print(f"\n=== 4. Generate rates for Feb {YEAR} ===")
    pid = delmarva_bundled["provider_id"]
    try:
        count = await generate_monthly_rates(pid, MONTH, YEAR)
        expected = calendar.monthrange(YEAR, MONTH)[1] * 24
        if count == expected:
            ok(f"Generated {count} hourly rate rows")
        else:
            fail(f"Expected {expected} rows, got {count}")
    except Exception as e:
        fail("generate_monthly_rates", str(e))
        sys.exit(1)

    # ------------------------------------------------------------------
    print(f"\n=== 5. Verify delivery_cost = 0 for bundled ===")
    rates = await get_hourly_rates(pid, MONTH, YEAR)
    if not rates:
        fail("No rates returned")
        sys.exit(1)

    bad = [r for r in rates if float(r["delivery_cost"]) != 0]
    if bad:
        fail(f"Found {len(bad)} rows with delivery_cost != 0 (expected 0 for bundled)")
        sample = bad[0]
        print(f"  Sample: date={sample['date']} hour={sample['hour']} delivery_cost={sample['delivery_cost']}")
    else:
        ok(f"All {len(rates)} rows have delivery_cost = 0")

    # ------------------------------------------------------------------
    print(f"\n=== 6. Verify total_rate = base_rate (no delivery added) ===")
    bad_total = [r for r in rates if abs(float(r["total_rate"]) - float(r["base_rate"])) > 0.000001]
    if bad_total:
        fail(f"Found {len(bad_total)} rows where total_rate != base_rate")
        sample = bad_total[0]
        print(f"  Sample: base={sample['base_rate']} total={sample['total_rate']} delivery={sample['delivery_cost']}")
    else:
        ok(f"All {len(rates)} rows have total_rate = base_rate")

    # ------------------------------------------------------------------
    print(f"\n=== 7. Sample row ===")
    r = rates[0]
    print(f"  date={r['date']} hour={r['hour']} base_rate={r['base_rate']} delivery_cost={r['delivery_cost']} total_rate={r['total_rate']} period_label={r['period_label']}")

    # ------------------------------------------------------------------
    print(f"\n{'='*50}")
    print(f"Results: {passed} passed, {failed} failed")
    if failed == 0:
        print("Bundled rate test PASSED: delivery cost correctly omitted.")
    else:
        print("Some checks failed.")
    print()

    return failed


if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(min(exit_code, 1))
