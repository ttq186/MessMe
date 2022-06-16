from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

from core.config import settings


pwd_context = CryptContext(schemes=["bcrypt"])


def verify_password(plain_pwd: str, hashed_pwd) -> bool:
    return pwd_context.verify(plain_pwd, hashed_pwd)


def get_password_hashed(plain_pwd: str) -> str:
    return pwd_context.hash(plain_pwd)


def create_access_token(
    payload: dict, expires_date: datetime | None = None, secret_key: str | None = None
) -> str:
    to_encode = payload.copy()
    if expires_date is not None:
        expire = datetime.now() + expires_date
    else:
        expire = datetime.now() + timedelta(settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"expire": expire})
    jwt_token = jwt.encode(
        payload,
        key=secret_key or settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )
    return jwt_token
