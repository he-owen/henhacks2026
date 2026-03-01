import json
from daily_optimizer import run_optimization_hybrid
from weekly_scheduler import find_optimal_day_for_appliances

# Load sample JSON
with open("backend/sample.json") as f:
    data = json.load(f)

appliances = data["appliances"]
user_preferences = data["user_preferences"]
prices_by_day = data["prices"]

# --------------------------
# Test single-day optimization
# --------------------------
day_of_week = data.get("day_of_week", "Tuesday")
daily_result = run_optimization_hybrid(appliances, prices_by_day, day_of_week, user_preferences)

print(f"\n--- Daily Optimization for {day_of_week} ---")
if daily_result["status"] == "OPTIMAL":
    for a in daily_result["schedule"]:
        print(f"{a['appliance']}: {a['run_times']}")
    print(f"Estimated total cost: ${daily_result['total_estimated_cost']}")
else:
    print("Optimization was not feasible.")

# --------------------------
# Test weekly optimization
# --------------------------
weekly_result = find_optimal_day_for_appliances(appliances, user_preferences, prices_by_day)

print("\n--- Weekly Optimization (best day per appliance) ---")
for app_name, info in weekly_result.items():
    print(f"{app_name}: Best day = {info['best_day']}, Estimated cost = ${info['estimated_cost']}")