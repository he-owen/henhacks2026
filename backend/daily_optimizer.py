from pulp import LpProblem, LpMinimize, LpVariable, lpSum, LpBinary, LpContinuous, LpStatus, PULP_CBC_CMD

def run_optimization_hybrid(appliances, prices_by_day, day_of_week, user_preferences):
    # Map day name to row index
    day_map = {
        "Monday": 0,
        "Tuesday": 1,
        "Wednesday": 2,
        "Thursday": 3,
        "Friday": 4,
        "Saturday": 5,
        "Sunday": 6
    }

    if day_of_week not in day_map:
        raise ValueError(f"Invalid day_of_week: {day_of_week}")

    prices = prices_by_day[day_map[day_of_week]]
    T = len(prices)
    availability = user_preferences.get("availability", [])
    # time_awake: hours the user is awake — TV and lights are restricted to these hours
    time_awake = user_preferences.get("time_awake", list(range(T)))
    temp_home = user_preferences.get("thermostat_temp_home", 72)
    temp_away = user_preferences.get("thermostat_temp_away", 78)
    hvac_lead = user_preferences.get("hvac_lead_time", 1)

    # Keywords identifying appliances that should only run while the user is awake
    AWAKE_ONLY_KEYWORDS = ("tv", "television", "light", "lamp", "bulb")

    prob = LpProblem("energy_optimization", LpMinimize)
    x = {}
    start_vars = {}
    temp = {}

    # Variables
    for i, app in enumerate(appliances):
        if app["type"] in ["cycle", "intermittent"]:
            for t in range(T):
                x[i, t] = LpVariable(f"x_{i}_{t}", cat=LpBinary)
        if app["type"] == "cycle":
            D = app["duration"]
            start_vars[i] = [LpVariable(f"start_{i}_{t}", cat=LpBinary) for t in range(T - D + 1)]
        elif app["type"] == "hvac":
            for t in range(T):
                temp[i, t] = LpVariable(f"temp_{i}_{t}", lowBound=60, upBound=85, cat=LpContinuous)

    # Objective
    prob += lpSum(
        x[i, t] * app.get("power", 0) * prices[t]
        for i, app in enumerate(appliances)
        if app["type"] in ["cycle", "intermittent"]
        for t in range(T)
    ) + lpSum(
        app.get("power", 0) * prices[t]
        for i, app in enumerate(appliances)
        if app["type"] == "hvac"
        for t in range(T)
    )

    # Constraints
    for i, app in enumerate(appliances):

        if app["type"] == "cycle":
            D = app["duration"]
            start = start_vars[i]
            prob += lpSum(start) == 1
            for t in range(T):
                possible_starts = [start[s] for s in range(max(0, t - D + 1), min(t + 1, T - D + 1))]
                if possible_starts:
                    prob += lpSum(possible_starts) == x[i, t]
            if not app.get("smart_enabled", True):
                for t in range(T):
                    if t not in availability:
                        prob += x[i, t] == 0

        elif app["type"] == "intermittent":
            prob += lpSum(x[i, t] for t in range(T)) <= app.get("max_hours", T)
            name_lower = app.get("name", "").lower()
            is_awake_device = any(k in name_lower for k in AWAKE_ONLY_KEYWORDS)
            # Awake devices (TV, lights) are restricted to time_awake hours;
            # all intermittent devices are also restricted to availability hours.
            allowed_hours = set(time_awake) & set(availability) if is_awake_device else set(availability)
            for t in range(T):
                if t not in allowed_hours:
                    prob += x[i, t] == 0

        elif app["type"] == "hvac":
            return_times = []
            for t in availability:
                if t - 1 >= 0 and (t - 1) not in availability:
                    return_times.append(t)
            pre_cool_hours = [rt - hvac_lead for rt in return_times if rt - hvac_lead >= 0]
            for t in range(T):
                if t in availability or t in pre_cool_hours:
                    prob += temp[i, t] == temp_home
                else:
                    prob += temp[i, t] == temp_away

    # EV Charger departure
    for i, app in enumerate(appliances):
        if app["name"] == "EV Charger":
            departure = app.get("departure_hour", T)
            for t in range(departure, T):
                prob += x[i, t] == 0

    # Washer -> Dryer sequencing
    washer_idx = next((i for i, a in enumerate(appliances) if a["name"] == "Washing Machine"), None)
    dryer_idx = next((i for i, a in enumerate(appliances) if a["name"] == "Dryer"), None)
    if washer_idx is not None and dryer_idx is not None:
        D_w = appliances[washer_idx]["duration"]
        start_w = start_vars[washer_idx]
        start_d = start_vars[dryer_idx]
        for t_w in range(len(start_w)):
            t_d = t_w + D_w
            if t_d < len(start_d):
                prob += start_d[t_d] >= start_w[t_w]
            else:
                prob += start_w[t_w] == 0
        for t in range(T):
            prob += x[washer_idx, t] + x[dryer_idx, t] <= 1

    # Solve
    prob.solve(PULP_CBC_CMD(msg=0))
    status_str = LpStatus[prob.status]
    if status_str != "Optimal":
        return {"status": status_str}

    # Minimal Output
    schedule_output = []
    total_cost = 0
    for i, app in enumerate(appliances):
        if app["type"] in ["cycle", "intermittent"]:
            run_times = [t for t in range(T) if (x[i, t].value() or 0) >= 0.99]
            total_cost += sum(prices[t] * app.get("power", 0) for t in run_times)
            schedule_output.append({"appliance": app["name"], "run_times": run_times})
        elif app["type"] == "hvac":
            total_cost += sum(prices[t] * app.get("power", 0) for t in range(T))
            schedule_output.append({"appliance": app["name"], "run_times": "continuous"})

    return {"status": "OPTIMAL", "schedule": schedule_output, "total_estimated_cost": round(total_cost, 2)}