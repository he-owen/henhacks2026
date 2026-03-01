<div align="center">

# ⚡ PhasePlan

### Smart energy management for your home

Monitor your devices, optimize electricity costs with time-of-use rates, and reduce your carbon footprint — all from a single dashboard.

**[Live Demo](https://phaseplan.vercel.app)** · **[Report Bug](https://github.com/your-org/phaseplan/issues)** · **[Request Feature](https://github.com/your-org/phaseplan/issues)**

</div>

---

## ✨ Features

- **AI-Powered Device Enrichment** — Add a device by name; Gemini auto-detects type, wattage, smart capability, and typical run duration
- **Daily Cost Optimization** — Linear programming solver (PuLP/CBC) schedules appliances across 24 hours to minimize electricity cost using real TOU pricing
- **Weekly Smart Scheduling** — Finds the cheapest day of the week to run heavy appliances like washers, dryers, dishwashers, and EV chargers
- **Bill OCR Extraction** — Upload a utility bill image or PDF; Gemini extracts month, year, amount, kWh, and utility provider automatically
- **Utility Rate Integration** — Fetches real rate structures from the OpenEI API by ZIP code with peak/mid-peak/off-peak delivery pricing
- **Carbon Footprint Tracking** — Estimates CO₂ emissions per device with time-varying carbon intensity factors
- **Schedule Feedback Loop** — Confirms whether you followed suggested schedules; tracks compliance rate and cumulative savings over time
- **Multi-Location Support** — Manage devices and rates across multiple addresses
- **Auth0 Authentication** — Secure login with protected routes and automatic user sync

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 6, React Router 7, MUI 7 (Material UI), MUI X Charts / DataGrid / DatePickers, react-spring |
| **Backend** | Python 3.12, FastAPI, Uvicorn, SQLAlchemy (async), asyncpg, PuLP (LP solver) |
| **AI / ML** | Google Gemini 2.5 Flash (`google-genai`) — device enrichment + bill OCR |
| **Database** | PostgreSQL 16, Prisma (schema management + migrations) |
| **Auth** | Auth0 (`@auth0/auth0-react`) |
| **External APIs** | OpenEI Utility Rates API |
| **Deployment** | Docker Compose (dev), Vercel (frontend), Render (backend + DB) |

---

## 🏗️ Architecture

```
┌─────────────┐     HTTPS/JSON     ┌──────────────┐     SQL      ┌──────────────┐
│  React SPA  │ ◄──────────────► │  FastAPI     │ ◄──────────► │ PostgreSQL   │
│  (Vite/MUI) │                    │  (Uvicorn)   │              │  (Prisma)    │
└─────────────┘                    └──────┬───────┘              └──────────────┘
                                          │
                              ┌───────────┼───────────┐
                              ▼           ▼           ▼
                        ┌──────────┐ ┌──────────┐ ┌──────────┐
                        │  Auth0   │ │  Gemini  │ │  OpenEI  │
                        │ (AuthN)  │ │  (AI)    │ │ (Rates)  │
                        └──────────┘ └──────────┘ └──────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **Python** 3.12+
- **PostgreSQL** 16+ (or use Docker)
- **Docker & Docker Compose** (optional — for one-command setup)

### Option 1: Docker Compose (recommended)

```bash
git clone https://github.com/your-org/phaseplan.git
cd phaseplan

# Create a .env file (see Environment Variables below)
cp .env.example .env

docker compose up
```

This starts PostgreSQL (port 5432), the FastAPI backend (port 8000), and the Nginx-served frontend (port 5173).

### Option 2: Manual Setup

```bash
# 1. Clone & install frontend dependencies
git clone https://github.com/your-org/phaseplan.git
cd phaseplan
npm install
cd frontend && npm install && cd ..

# 2. Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..

# 3. Configure environment
#    Copy .env.example to .env and fill in your values (see table below)

# 4. Push database schema
npm run db:push

# 5. Seed sample data (optional)
npm run db:seed

# 6. Start both servers
npm run dev           # Frontend on http://localhost:5173
npm run dev:backend   # Backend  on http://localhost:8000
```

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server (frontend) |
| `npm run dev:backend` | Start Uvicorn with hot-reload (backend) |
| `npm run build` | Production build (frontend) |
| `npm run db:push` | Apply Prisma schema to local DB |
| `npm run db:push:prod` | Apply schema to production DB |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:seed` | Seed the database |

---

## 🔐 Environment Variables

Create a `.env` file in the project root with the following variables:

| Variable | Required | Default | Description |
|---|:---:|---|---|
| `DATABASE_URL` | ✅ | — | PostgreSQL connection string (`postgresql://user:pass@host:5432/dbname`) |
| `VITE_AUTH0_DOMAIN` | ✅ | — | Auth0 tenant domain (e.g. `dev-xxxx.us.auth0.com`) |
| `VITE_AUTH0_CLIENT_ID` | ✅ | — | Auth0 SPA application client ID |
| `VITE_API_URL` | ✅ | `https://henhacks2026.onrender.com` | Backend API base URL |
| `GEMINI_API_KEY` | ⬜ | — | Google Gemini API key (device enrichment + bill OCR) |
| `OPENEI_API_KEY` | ⬜ | — | OpenEI API key (utility rate structures) |
| `AUTH0_DOMAIN` | ⬜ | *from VITE_AUTH0_DOMAIN* | Backend Auth0 domain override |
| `CORS_ORIGINS` | ⬜ | — | Additional comma-separated CORS origins |
| `HOST` | ⬜ | `0.0.0.0` | Backend bind host |
| `PORT` | ⬜ | `8000` | Backend bind port |
| `POSTGRES_USER` | ⬜ | `app` | Docker Compose DB user |
| `POSTGRES_PASSWORD` | ⬜ | `changeme` | Docker Compose DB password |
| `POSTGRES_DB` | ⬜ | `appdb` | Docker Compose DB name |

> **Note:** Gemini features degrade gracefully — if `GEMINI_API_KEY` is not set, device enrichment and bill OCR are unavailable but the app still works.

---

## 📡 API Reference

All authenticated endpoints require a valid Auth0 Bearer token in the `Authorization` header.

<details>
<summary><strong>Users</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| POST | `/api/users/me` | ✅ | Sync Auth0 user to database |
| GET | `/api/users/me/profile` | ✅ | Get user profile + selected provider |
| PUT | `/api/users/me/provider` | ✅ | Set utility provider |
| GET | `/api/users/me/preferences` | ✅ | Get user preferences |
| PUT | `/api/users/me/preferences` | ✅ | Update user preferences |

</details>

<details>
<summary><strong>Devices</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| GET | `/api/devices` | ✅ | List all devices |
| POST | `/api/devices` | ✅ | Create device (with Gemini enrichment) |
| POST | `/api/devices/batch` | ✅ | Create multiple devices |
| PUT | `/api/devices/{id}` | ✅ | Update device |
| DELETE | `/api/devices/{id}` | ✅ | Delete device |

</details>

<details>
<summary><strong>Locations</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| GET | `/api/locations` | ✅ | List all locations |
| POST | `/api/locations` | ✅ | Create location |
| PUT | `/api/locations/{id}` | ✅ | Update location |
| DELETE | `/api/locations/{id}` | ✅ | Delete location |

</details>

<details>
<summary><strong>Billing</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| GET | `/api/bills` | ✅ | List bill history |
| POST | `/api/bills` | ✅ | Create bill record |
| POST | `/api/bills/extract` | ✅ | Upload bill image/PDF → Gemini OCR extraction |
| PUT | `/api/bills/{id}` | ✅ | Update bill |
| DELETE | `/api/bills/{id}` | ✅ | Delete bill |

</details>

<details>
<summary><strong>Rates</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| POST | `/api/rates/fetch` | ✅ | Fetch utility providers from OpenEI by ZIP |
| GET | `/api/rates/providers` | ✅ | List cached providers for a ZIP code |
| POST | `/api/rates/generate` | ✅ | Generate hourly rate table for provider/month |
| GET | `/api/rates/monthly` | ✅ | Get saved hourly rates |

</details>

<details>
<summary><strong>Optimization</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| POST | `/api/optimize/daily` | ⬜ | Run daily optimizer (pass appliances in body) |
| POST | `/api/optimize/weekly` | ⬜ | Run weekly optimizer (pass appliances in body) |
| POST | `/api/optimize/daily/me` | ✅ | Daily optimizer using user's saved devices |
| POST | `/api/optimize/weekly/me` | ✅ | Weekly optimizer using user's saved devices |

</details>

<details>
<summary><strong>Schedules</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| POST | `/api/schedules/generate` | ✅ | Auto-generate today's optimized schedule |
| GET | `/api/schedules/today` | ✅ | Get today's saved schedule |
| GET | `/api/schedules/pending` | ✅ | Get schedules awaiting feedback |
| POST | `/api/schedules/{id}/feedback` | ✅ | Submit followed/not-followed feedback |
| GET | `/api/schedules/history` | ✅ | Get schedule history |
| GET | `/api/schedules/savings` | ✅ | Get aggregate savings summary |

</details>

---

## 📂 Project Structure

```
phaseplan/
├── frontend/                # React SPA
│   └── src/
│       ├── App.jsx          # Root component + routes
│       ├── api.js           # Axios client (auto-attaches Auth0 token)
│       ├── auth/            # Auth0 login/logout, protected routes
│       ├── dashboard/       # Main dashboard (charts, schedule, summary)
│       ├── crud-dashboard/  # Device, billing, location CRUD pages
│       ├── landing/         # Public landing page
│       ├── sign-in/         # Sign-in page
│       └── shared-theme/    # MUI theme customizations
├── backend/
│   ├── main.py              # FastAPI app + all route handlers
│   ├── config.py            # Environment variable loading
│   ├── database.py          # SQLAlchemy async engine + session
│   ├── daily_optimizer.py   # PuLP LP solver (24-hour schedule)
│   ├── weekly_scheduler.py  # Weekly cheapest-day optimizer
│   ├── rate_service.py      # OpenEI rate fetching + hourly rate generation
│   ├── GeminiAPI/           # Google Gemini integration (device enrichment + bill OCR)
│   └── requirements.txt     # Python dependencies
├── database/
│   ├── schema.prisma        # Prisma schema (source of truth for DB)
│   ├── seed.py              # Database seeder
│   └── migrations/          # SQL migration files
├── generated/               # Auto-generated Prisma client
├── docker-compose.yml       # PostgreSQL + backend + frontend containers
└── package.json             # Root scripts (dev, build, db:push, etc.)
```

---

## 🗄️ Production Database

The backend expects tables `users`, `devices`, `locations`, `utility_providers`, `hourly_rates`, `bill_history`. If you see **`relation "devices" does not exist`** (or similar), the production database has not had the schema applied.

```bash
# Apply Prisma schema to production DB (use your Render/Supabase DATABASE_URL)
DATABASE_URL="postgresql://user:pass@host:5432/dbname" npm run db:push:prod
```

Then redeploy or restart the backend on Render. Only needed when the schema changes.

---

<div align="center">

**Built with ❤️ at [HenHacks 2026](https://henhacks.com)**

</div>
