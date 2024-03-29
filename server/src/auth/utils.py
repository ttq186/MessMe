from datetime import datetime, timedelta

from azure.storage.blob import (AccountSasPermissions, ResourceTypes,
                                generate_account_sas)
from fastapi import Response
from google.auth.transport import requests
from google.oauth2 import id_token
from jose import ExpiredSignatureError, JWTError, jwt
from passlib.context import CryptContext

from src.auth import exceptions
from src.config import settings

pwd_context = CryptContext(schemes=["bcrypt"])


def verify_password(plain_pwd: str, hashed_pwd: str) -> bool:
    return pwd_context.verify(plain_pwd, hashed_pwd)


def get_hashed_password(plain_pwd: str) -> str:
    return pwd_context.hash(plain_pwd)


def create_token(
    payload: dict, expires_in: timedelta | None = None, secret_key: str | None = None
) -> str:
    expire = datetime.now() + (
        expires_in or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    payload.update({"exp": expire})
    jwt_token = jwt.encode(
        payload,
        key=secret_key or settings.ACCESS_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )
    return jwt_token


def decode_token(token: str, secret_key: str | None = None) -> dict:
    try:
        token_data = jwt.decode(
            token,
            key=secret_key or settings.ACCESS_SECRET_KEY,
            algorithms=settings.JWT_ALGORITHM,
        )
        return token_data
    except ExpiredSignatureError:
        raise exceptions.TokenHasExpired()
    except JWTError:
        raise exceptions.InvalidToken()


def decode_oauth2_token_id(token_id: str) -> dict:
    try:
        request = requests.Request()
        token_data = id_token.verify_oauth2_token(
            token_id, request, settings.GOOGLE_CLIENT_ID
        )
        return token_data
    except Exception:
        raise exceptions.InvalidGoogleCredentials()


def set_tokens_on_cookie(
    response: Response, access_token: str, refresh_token: str
) -> None:
    response.set_cookie(
        key="actk",
        value=access_token,
        expires=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        httponly=True,
        secure=True,
        samesite="strict",
    )
    response.set_cookie(
        key="rftk",
        expires=settings.REFRESH_TOKEN_EXPIRE_MINUTES * 60,
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="strict",
    )


def set_logout_detection_cookie(response: Response) -> None:
    response.set_cookie(
        key="logout",
        value="0",
        secure=True,
        expires=settings.REFRESH_TOKEN_EXPIRE_MINUTES * 60,
    )


def create_access_token(user_id: str) -> str:
    return create_token(payload={"user_id": user_id})


def create_refresh_token(user_id: str) -> str:
    return create_token(
        payload={"user_id": user_id},
        expires_in=timedelta(minutes=settings.REFRESH_TOKEN_EXPIRE_MINUTES),
        secret_key=settings.REFRESH_SECRET_KEY,
    )


def set_credentials_after_logging(
    response: Response,
    access_token: str,
    refresh_token: str,
):
    set_tokens_on_cookie(
        response=response, access_token=access_token, refresh_token=refresh_token
    )
    set_logout_detection_cookie(response)


def generate_sas_token() -> str:
    sas_token = generate_account_sas(
        account_name=settings.AZURE_STORAGE_ACCOUNT_NAME,
        resource_types=ResourceTypes(object=True),
        account_key=settings.AZURE_ACCESS_KEY,
        permission=AccountSasPermissions(read=True, write=True),
        expiry=datetime.now() + timedelta(minutes=30),
    )
    return sas_token
