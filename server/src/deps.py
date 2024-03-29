from typing import AsyncGenerator

from strawberry.types import Info

from src import exceptions
from src.auth import utils as auth_utils
from src.database import mongo_client, postgres_session
from src.user.crud import user_crud
from src.user.schemas import User


async def get_postgres_session() -> AsyncGenerator:
    async with postgres_session() as session:
        yield session


def get_mongo_db():
    return mongo_client.messme


async def get_current_user(info: Info) -> User:
    cookies = info.context["request"].cookies
    access_token = cookies.get("actk")
    logout_value = cookies.get("logout")
    if logout_value != "0" or access_token is None:
        raise exceptions.NotAuthenticated()

    token_data = auth_utils.decode_token(access_token)
    pg_session = info.context["pg_session"]
    user = await user_crud.get(pg_session, id=token_data["user_id"])
    return user


async def get_current_superuser(info: Info) -> User:
    current_user = await get_current_user(info)
    if not current_user.is_admin:
        raise exceptions.NotAuthorized()
    return current_user
