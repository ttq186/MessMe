from pydantic import BaseSettings


class Settings(BaseSettings):
    ROOT_PATH: str = ""

    PG_USERNAME: str
    PG_PASSWORD: str
    PG_HOSTNAME: str
    PG_PORT: int
    PG_NAME: str

    ACCESS_TOKEN_EXPIRE_MINUTES: int
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str

    GOOGLE_CLIENT_ID: str
    GOOGLE_APPLICATION_CREDENTIALS: str

    MONGO_HOSTNAME: str
    MONGO_PORT: int

    REDIS_HOSTNAME: str
    REDIS_PORT: int
    REDIS_PASSWORD: str

    class Config:
        env_file = ".env"


settings = Settings()
