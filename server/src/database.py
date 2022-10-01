from motor.motor_asyncio import AsyncIOMotorClient
from redis import asyncio as aioredis
from redis.client import PubSub
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from src.config import settings

POSTGRES_URL = (
    f"postgresql+asyncpg://{settings.PG_USERNAME}:{settings.PG_PASSWORD}"
    f"@{settings.PG_HOSTNAME}:{settings.PG_PORT}/{settings.PG_NAME}"
)
postgres_engine = create_async_engine(
    POSTGRES_URL, connect_args={"server_settings": {"jit": "off"}}
)
postgres_session = sessionmaker(
    postgres_engine, class_=AsyncSession, expire_on_commit=False
)

MONGO_URL = f"mongodb://{settings.MONGO_HOSTNAME}:{settings.MONGO_PORT}"
mongo_client = AsyncIOMotorClient(MONGO_URL)

REDIS_URL = f"redis://{settings.REDIS_HOSTNAME}:{settings.REDIS_PORT}"
redis = aioredis.Redis.from_url(url=REDIS_URL)
