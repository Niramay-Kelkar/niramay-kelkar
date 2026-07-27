import logging

from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, async_sessionmaker, create_async_engine
from sqlmodel import SQLModel

from app.config import get_settings

logger = logging.getLogger(__name__)

_engine: AsyncEngine | None = None
_session_factory: async_sessionmaker[AsyncSession] | None = None


def _get_engine() -> AsyncEngine | None:
    global _engine, _session_factory
    settings = get_settings()
    if not settings.database_url:
        return None
    if _engine is None:
        _engine = create_async_engine(settings.database_url)
        _session_factory = async_sessionmaker(_engine, expire_on_commit=False)
    return _engine


async def init_db() -> None:
    """Create tables if DATABASE_URL is configured. No-op otherwise."""
    engine = _get_engine()
    if engine is None:
        logger.info("DATABASE_URL not set — skipping DB init, contact submissions won't be saved.")
        return

    import app.db_models  # noqa: F401  (registers models with SQLModel.metadata)

    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


def session_factory() -> async_sessionmaker[AsyncSession] | None:
    """Returns the session factory, or None if no database is configured."""
    _get_engine()
    return _session_factory
