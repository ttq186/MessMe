from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from core.config import settings


DB_URL = (
    f"postgresql+asyncpg://{settings.DB_USERNAME}:{settings.DB_PASSWORD}"
    f"@{settings.DB_HOSTNAME}:{settings.DB_PORT}/{settings.DB_NAME}"
)

async_engine = create_async_engine(DB_URL)
async_session = sessionmaker(
    async_engine, class_=AsyncSession, expire_on_commit=False
)
