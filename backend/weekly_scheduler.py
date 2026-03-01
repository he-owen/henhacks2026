import json
from daily_optimizer import run_optimization_hybrid

def find_optimal_day_for_appliances(appliances, user_preferences, prices_by_day):
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    appliance_best_day = {}

    for appliance in appliances:
        best_day = None
        best_cost = float("inf")

        for day in days:
            result = run_optimization_hybrid([appliance], prices_by_day, day, user_preferences)
            if result["status"] == "OPTIMAL":
                cost = result["total_estimated_cost"]
                if cost < best_cost:
                    best_cost = cost
                    best_day = day

        appliance_best_day[appliance["name"]] = {"best_day": best_day, "estimated_cost": round(best_cost, 2)}

    return appliance_best_day