from pydantic import BaseSettings


class Settings(BaseSettings):
    ROOT_PATH: str = ""

    # Postgres config
    PG_USERNAME: str
    PG_PASSWORD: str
    PG_HOSTNAME: str
    PG_PORT: int
    PG_NAME: str

    # MongoDB config
    MONGO_HOSTNAME: str
    MONGO_PORT: int

    # Redis config
    REDIS_HOSTNAME: str
    REDIS_PORT: int

    # JWT config
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str

    # Google OAuth2 config
    GOOGLE_CLIENT_ID: str
    GOOGLE_APPLICATION_CREDENTIALS: str

    class Config:
        env_file = ".env"


settings = Settings()
