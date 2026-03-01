"""
Test energy and delivery service types for zip 19805, Feb 2026.

- Energy only (Unbundled): base = OpenEI energy rate, delivery = our calculated TOU delivery.
  total_rate = base_rate + delivery_cost
- Delivery only: base = 0, delivery = OpenEI delivery rate. total_rate = delivery_cost.
- Bundled: delivery_cost = 0 (already tested in test_bundled_rates.py)

Usage:
    cd backend
    python test_energy_delivery_rates.py
"""

import asyncio
import calendar
import sys

from config import DATABASE_URL

print(f"Using DB: {DATABASE_URL[:40]}...")

ZIP = "19805"
MONTH = 2
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
        sys.exit(1)
    ok("Database connection")

    # ------------------------------------------------------------------
    print(f"\n=== 2. Fetch providers for zip {ZIP} (limit=25 for energy/delivery mix) ===")
    try:
        await fetch_and_store_providers(ZIP, limit=25)
        ok("Fetched and stored providers")
    except Exception as e:
        fail("fetch_and_store_providers", str(e))
        sys.exit(1)

    # ------------------------------------------------------------------
    print(f"\n=== 3. Find Energy (Unbundled) and Delivery providers ===")
    providers = await get_providers_by_zip(ZIP)

    # Energy/Unbundled: rate name has "Unbundled" (energy-only; we calculate delivery)
    # Note: "Unbundled" contains "bundled" as substring, so match "unbundled" only
    energy_provider = next(
        (
            p
            for p in providers
            if "delmarva" in (p.get("utility_name") or "").lower()
            and "unbundled" in (p.get("rate_name") or "").lower()
        ),
        None,
    )

    # Delivery: service_type == "Delivery" (exact, not "Delivery with Standard Offer")
    delivery_provider = next(
        (
            p
            for p in providers
            if (p.get("service_type") or "").strip() == "Delivery"
            and "delmarva" in (p.get("utility_name") or "").lower()
        ),
        None,
    )

    if not energy_provider:
        print("  Available providers (first 15):")
        for p in providers[:15]:
            print(f"    - {p.get('utility_name')} — {p.get('rate_name')} (service_type={p.get('service_type')})")
        fail("Could not find Energy/Unbundled provider")
    else:
        ok(f"Found Energy: {energy_provider.get('utility_name')} — {energy_provider.get('rate_name')}")

    if not delivery_provider:
        print("  [SKIP] No Delivery provider (service_type='Delivery') — same utility+rate_name may overwrite with Delivery with Standard Offer)")
    else:
        ok(f"Found Delivery: {delivery_provider.get('utility_name')} — {delivery_provider.get('rate_name')} (service_type={delivery_provider.get('service_type')})")

    expected_rows = calendar.monthrange(YEAR, MONTH)[1] * 24

    # ------------------------------------------------------------------
    print(f"\n=== 4. Energy (Unbundled): delivery_cost should be calculated (non-zero) ===")
    if energy_provider:
        pid = energy_provider["provider_id"]
        try:
            count = await generate_monthly_rates(pid, MONTH, YEAR)
            if count != expected_rows:
                fail(f"Energy: expected {expected_rows} rows, got {count}")
            else:
                ok(f"Energy: generated {count} rows")
        except Exception as e:
            fail("Energy generate_monthly_rates", str(e))

        rates = await get_hourly_rates(pid, MONTH, YEAR)
        if rates:
            with_delivery = [r for r in rates if float(r["delivery_cost"]) > 0]
            total_ok = all(
                abs(float(r["total_rate"]) - (float(r["base_rate"]) + float(r["delivery_cost"]))) < 0.000001
                for r in rates
            )
            if len(with_delivery) == len(rates) and total_ok:
                ok(f"Energy: all {len(rates)} rows have delivery_cost > 0 and total = base + delivery")
            else:
                fail(f"Energy: {len(with_delivery)}/{len(rates)} have delivery>0, total_ok={total_ok}")
            r0 = rates[0]
            print(f"  Sample: base={r0['base_rate']} delivery={r0['delivery_cost']} total={r0['total_rate']}")
    else:
        fail("Skipped Energy test (no provider)")

    # ------------------------------------------------------------------
    print(f"\n=== 5. Delivery only: base_rate=0, delivery_cost=OpenEI rate, total=delivery ===")
    if delivery_provider:
        pid = delivery_provider["provider_id"]
        try:
            count = await generate_monthly_rates(pid, MONTH, YEAR)
            if count != expected_rows:
                fail(f"Delivery: expected {expected_rows} rows, got {count}")
            else:
                ok(f"Delivery: generated {count} rows")
        except Exception as e:
            fail("Delivery generate_monthly_rates", str(e))

        rates = await get_hourly_rates(pid, MONTH, YEAR)
        if rates:
            base_zero = all(float(r["base_rate"]) == 0 for r in rates)
            total_eq_delivery = all(
                abs(float(r["total_rate"]) - float(r["delivery_cost"])) < 0.000001
                for r in rates
            )
            delivery_positive = all(float(r["delivery_cost"]) > 0 for r in rates)
            if base_zero and total_eq_delivery and delivery_positive:
                ok(f"Delivery: base=0, total=delivery for all {len(rates)} rows")
            else:
                fail(f"Delivery: base_zero={base_zero} total_eq_delivery={total_eq_delivery} delivery_positive={delivery_positive}")
            r0 = rates[0]
            print(f"  Sample: base={r0['base_rate']} delivery={r0['delivery_cost']} total={r0['total_rate']}")
    else:
        print("  [SKIP] Delivery test (no pure Delivery provider; DB unique key is zip+utility+rate_name)")

    # ------------------------------------------------------------------
    print(f"\n{'='*50}")
    print(f"Results: {passed} passed, {failed} failed")
    if failed == 0:
        print("Energy and Delivery service type tests PASSED.")
    else:
        print("Some checks failed.")
    print()

    return failed


if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(min(exit_code, 1))
