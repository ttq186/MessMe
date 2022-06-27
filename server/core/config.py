from pydantic import BaseSettings


class Settings(BaseSettings):
    ROOT_PATH: str = ""
    DB_USERNAME: str
    DB_PASSWORD: str
    DB_HOSTNAME: str
    DB_PORT: int
    DB_NAME: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str
    GOOGLE_CLIENT_ID: str
    GOOGLE_APPLICATION_CREDENTIALS: str
    MONGODB_USERNAME: str
    MONGODB_PASSWORD: str
    MONGODB_URL: str

    class Config:
        env_file = ".env"


settings = Settings()
