# PhasePlan

Smart energy management for your home. Monitor your devices, optimize electricity costs with time-of-use rates, and reduce your carbon footprint.

![PhasePlan](docs/screenshots/image.png)

---

## Features

### Custom Optimization Engine
- MILP solver (PuLP/CBC) takes your devices, utility hourly rates, and weekly schedule to find the cheapest way to run everything across 24 hours
- Cycle appliances (washers, dryers, dishwashers) are scheduled in contiguous blocks
- HVAC modeled with pre-cooling/pre-heating before you arrive home
- Non-smart devices constrained to hours you're actually around
- Weekly mode checks all 7 days to find the cheapest day for heavy loads like laundry or EV charging

### Device Setup
- Type a device name (and optionally brand/model) and Gemini 2.5 Flash with Google Search grounding fills in type, wattage, smart capability, and run duration
- Edit energy, run time, and location inline in the data grid

### Bill OCR
- Upload a bill as PDF or image (PNG, JPG, WEBP, HEIC)
- Gemini extracts month, year, amount, kWh, and utility provider
- Review and edit extracted fields before saving

### Utility Rate Integration
- Fetches real rate structures from the OpenEI API by ZIP code
- Computes hourly rates for every day in a month, classifying each hour as peak, mid-peak, or off-peak
- Synthetic delivery cost model fills in gaps for energy-only rates
- Feeds directly into the optimizer

### Dashboard
- Today's usage and carbon saved with 30-day sparklines and trend indicators
- Monthly cost bar chart, daily energy line chart, energy-by-category pie chart
- Today's potential savings and lifetime totals (dollars saved, CO2 reduced, compliance rate)

### Schedule Feedback
- Daily dialog asks if you followed the suggested schedule
- Responses feed into compliance rate and cumulative savings
- 14-day schedule history on the optimization page

### Google Home Script Generator
- Generates YAML automation scripts from optimization results
- Copy to clipboard for Google Home routines

### Preferences
- Per-day home/awake hours and thermostat temperatures
- Manage multiple addresses with ZIP codes
- Copy-to-all-days shortcut for the weekly schedule

### Other
- Multi-location support with per-location device filtering across all views
- Auth0 authentication with protected routes and automatic backend user sync

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 6, React Router 7, MUI 7, MUI X Charts / DataGrid / DatePickers, react-spring |
| **Backend** | Python 3.12, FastAPI, Uvicorn, SQLAlchemy (async), asyncpg, PuLP (MILP solver) |
| **AI** | Google Gemini 2.5 Flash — device enrichment + bill OCR |
| **Database** | PostgreSQL 16, Prisma |
| **Auth** | Auth0 |
| **External APIs** | OpenEI Utility Rates API |
| **Deployment** | Docker Compose (dev), Vercel (frontend), Render (backend + DB) |

---

## Getting Started

```bash
git clone https://github.com/your-org/phaseplan.git
cd phaseplan
docker compose up
```

This starts PostgreSQL (port 5432), the FastAPI backend (port 8000), and the Nginx-served frontend (port 5173).
