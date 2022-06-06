from pydantic import BaseSettings


class Settings(BaseSettings):
    ROOT_PATH: str = ""
    DB_USERNAME: str
    DB_PASSWORD: str
    DB_HOSTNAME: str
    DB_PORT: int
    DB_NAME: str

    class Config:
        env_file = ".env"


settings = Settings()
