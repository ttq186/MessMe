from typing import AsyncGenerator

from strawberry.types import Info

import crud
import exceptions
from models import User
from core import security
from db.session import async_session


async def get_db_session() -> AsyncGenerator:
    async with async_session() as session:
        yield session


async def get_current_user(info: Info) -> User:
    cookies = info.context["request"].cookies
    access_token = cookies.get("Authorization")
    if access_token is None:
        raise exceptions.NotAuthenticated()

    token_data = security.decode_access_token(access_token)
    db_session = info.context["db_session"]
    user = await crud.user.get(db_session, id=token_data["user_id"])
    return user


async def get_current_superuser(info: Info) -> User:
    current_user = await get_current_user(info)
    if not current_user.is_admin:
        raise exceptions.NotAuthorized()
    return current_user
