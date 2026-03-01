from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any

from database import check_database
from daily_optimizer import run_optimization_hybrid
from weekly_scheduler import find_optimal_day_for_appliances


class DailyOptimizeRequest(BaseModel):
    appliances: list[dict[str, Any]]
    prices_by_day: list[list[float]]
    day_of_week: str
    user_preferences: dict[str, Any]


class WeeklyScheduleRequest(BaseModel):
    appliances: list[dict[str, Any]]
    prices_by_day: list[list[float]]
    user_preferences: dict[str, Any]

app = FastAPI(title="API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"status": "ok", "docs": "/docs"}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/api/status")
async def status():
    db_ok = await check_database()
    return {
        "status": "ok",
        "database": "connected" if db_ok else "disconnected",
    }


@app.post("/api/optimize/daily")
async def optimize_daily(request: DailyOptimizeRequest):
    result = run_optimization_hybrid(
        request.appliances,
        request.prices_by_day,
        request.day_of_week,
        request.user_preferences,
    )
    return result


@app.post("/api/optimize/weekly")
async def optimize_weekly(request: WeeklyScheduleRequest):
    result = find_optimal_day_for_appliances(
        request.appliances,
        request.user_preferences,
        request.prices_by_day,
    )
    return result
