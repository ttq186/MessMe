from typing import AsyncGenerator

from src.auth import exceptions as auth_exceptions
from src.auth import schemas as auth_schemas
from src.auth import utils as auth_utils
from src.auth.crud import user_crud
from src.database import mongo_client, postgres_session
from strawberry.types import Info


async def get_postgres_session() -> AsyncGenerator:
    async with postgres_session() as session:
        yield session


def get_mongo_db():
    return mongo_client.messme


async def get_current_user(info: Info) -> auth_schemas.User:
    cookies = info.context["request"].cookies
    access_token = cookies.get("authorization")
    logout_value = cookies.get("logout")
    if logout_value != "0" or access_token is None:
        raise auth_exceptions.NotAuthenticated()

    token_data = auth_utils.decode_access_token(access_token)
    pg_session = info.context["pg_session"]
    user = await user_crud.get(pg_session, id=token_data["user_id"])
    return user


async def get_current_superuser(info: Info) -> auth_schemas.User:
    current_user = await get_current_user(info)
    if not current_user.is_admin:
        raise auth_exceptions.NotAuthorized()
    return current_user
