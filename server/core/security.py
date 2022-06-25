from typing import Any
from datetime import datetime, timedelta

from fastapi import Response
from strawberry import BasePermission
from strawberry.types import Info
from jose import ExpiredSignatureError, JWTError, jwt
from passlib.context import CryptContext
from google.oauth2 import id_token
from google.auth.transport import requests

import exceptions
from api import deps
from models import User
from core.config import settings


pwd_context = CryptContext(schemes=["bcrypt"])


def verify_password(plain_pwd: str, hashed_pwd) -> bool:
    return pwd_context.verify(plain_pwd, hashed_pwd)


def get_hashed_password(plain_pwd: str) -> str:
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


def decode_access_token(token: str, secret_key: str | None = None) -> dict:
    try:
        token_data = jwt.decode(
            token,
            key=secret_key or settings.JWT_SECRET_KEY,
            algorithms=settings.JWT_ALGORITHM,
        )
        return token_data

    except ExpiredSignatureError:
        raise Exception("Token has expired!")
    except JWTError:
        raise Exception("Could not validate user credentials!")


def decode_oauth2_token_id(token_id: str) -> dict:
    try:
        request = requests.Request()
        token_data = id_token.verify_oauth2_token(
            token_id, request, settings.GOOGLE_CLIENT_ID
        )
        print(token_data)
        return token_data
    except Exception:
        raise exceptions.InvalidGoogleCredentials()


def set_access_token_on_http_only_cookie(response: Response, access_token: str) -> None:
    response.set_cookie(
        key="Authorization",
        value=access_token,
        expires=settings.ACCESS_TOKEN_EXPIRE_MINUTES,
        httponly=True,
    )


class IsAuthenticatedUser(BasePermission):
    async def has_permission(self, source: Any, info: Info, **kwargs) -> User:
        current_user = await deps.get_current_user(info)
        info.context["current_user"] = current_user
        return True


class IsAuthenticatedAdmin(BasePermission):
    async def has_permission(self, source: Any, info: Info, **kwargs) -> User:
        current_user = await deps.get_current_superuser(info)
        info.context["current_user"] = current_user
        return True
