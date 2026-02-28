from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import text
from config import DATABASE_URL
import os
import logging
import ssl

_use_ssl = os.getenv("DATABASE_SSL", "true").lower() in ("1", "true", "yes")
_verify_ssl = os.getenv("DATABASE_SSL_VERIFY", "false").lower() in ("1", "true", "yes")

_connect_args = {}
if _use_ssl:
    if _verify_ssl:
        _connect_args["ssl"] = True
    else:
        # Skip cert verification (avoids CERTIFICATE_VERIFY_FAILED on Render/Supabase)
        _ctx = ssl.create_default_context()
        _ctx.check_hostname = False
        _ctx.verify_mode = ssl.CERT_NONE
        _connect_args["ssl"] = _ctx

engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    connect_args=_connect_args,
    pool_pre_ping=True,
)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
logger = logging.getLogger(__name__)


async def check_database() -> bool:
    try:
        async with async_session() as session:
            await session.execute(text("SELECT 1"))
        return True
    except Exception as e:
        logger.warning("Database check failed: %s", e, exc_info=True)
        return False
