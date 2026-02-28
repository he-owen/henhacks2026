import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://app:changeme@localhost:5432/appdb")
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

# Comma-separated origins allowed by CORS (e.g. http://localhost:5173,https://app.example.com)
CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")
    if origin.strip()
]
