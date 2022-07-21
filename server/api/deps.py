from typing import AsyncGenerator

from strawberry.types import Info

import crud
import exceptions
from core import security
from db.config import postgres_session, mongo_client
from schemas import User


async def get_postgres_session() -> AsyncGenerator:
    async with postgres_session() as session:
        yield session


def get_mongo_db():
    return mongo_client.messme


async def get_current_user(info: Info) -> User:
    cookies = info.context["request"].cookies
    access_token = cookies.get("authorization")
    logout_value = cookies.get("logout")
    if logout_value != "0" or access_token is None:
        raise exceptions.NotAuthenticated()

    token_data = security.decode_access_token(access_token)
    pg_session = info.context["pg_session"]
    user = await crud.user.get(pg_session, id=token_data["user_id"])
    return user


async def get_current_superuser(info: Info) -> User:
    current_user = await get_current_user(info)
    if not current_user.is_admin:
        raise exceptions.NotAuthorized()
    return current_user
