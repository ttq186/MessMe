from datetime import datetime, timedelta

from fastapi import Response
from google.auth.transport import requests
from google.cloud import storage
from google.oauth2 import id_token, service_account
from jose import ExpiredSignatureError, JWTError, jwt
from passlib.context import CryptContext
from src.config import settings

from . import exceptions

pwd_context = CryptContext(schemes=["bcrypt"])


def verify_password(plain_pwd: str, hashed_pwd) -> bool:
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


def decode_access_token(token: str, secret_key: str | None = None) -> dict:
    try:
        token_data = jwt.decode(
            token,
            key=secret_key or settings.ACCESS_SECRET_KEY,
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
        return token_data
    except Exception:
        raise exceptions.InvalidGoogleCredentials()


def set_tokens_on_cookie(
    response: Response, access_token: str, refresh_token: str
) -> None:
    response.set_cookie(
        key="actk",
        value=access_token,
        expires=settings.ACCESS_TOKEN_EXPIRE_MINUTES,
        httponly=True,
        secure=True,
    )
    response.set_cookie(
        key="rftk",
        value=refresh_token,
        expires=settings.REFRESH_TOKEN_EXPIRE_MINUTES,
        httponly=True,
        secure=True,
    )


def set_logout_detection_cookie(response: Response) -> None:
    response.set_cookie(key="logout", value="0")


def generate_signed_url(bucket_name: str, blob_type: str, blob_name: str) -> str:
    credentials = service_account.Credentials.from_service_account_file(
        filename=settings.GOOGLE_APPLICATION_CREDENTIALS,
        scopes=["https://www.googleapis.com/auth/cloud-platform"],
    )
    storage_client = storage.Client(credentials=credentials)
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)
    signed_url = blob.generate_signed_url(
        version="v4",
        expiration=timedelta(minutes=15),
        method="PUT",
        content_type=blob_type,
    )
    return signed_url
