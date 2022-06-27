from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from motor.motor_asyncio import AsyncIOMotorClient

from core.config import settings


POSTGRES_URL = (
    f"postgresql+asyncpg://{settings.DB_USERNAME}:{settings.DB_PASSWORD}"
    f"@{settings.DB_HOSTNAME}:{settings.DB_PORT}/{settings.DB_NAME}"
)
postgres_engine = create_async_engine(
    POSTGRES_URL, connect_args={"server_settings": {"jit": "off"}}
)
postgres_session = sessionmaker(
    postgres_engine, class_=AsyncSession, expire_on_commit=False
)


MONGO_URL = (
    f"mongodb+srv://{settings.MONGODB_USERNAME}:{settings.MONGODB_PASSWORD}"
    f"@{settings.MONGODB_URL}/?retryWrites=true&w=majority"
)
mongo_client = AsyncIOMotorClient(MONGO_URL)
mongo_session = mongo_client.college
