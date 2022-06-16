import strawberry
from strawberry.types import Info

import crud
from core import security
import utils
from schemas import User, UserCreate, UserUpdate, UserOut


async def resolver_get_users(info: Info) -> list[UserOut]:
    print(info.context["request"].cookies)
    users = await crud.user.get_multi(session=info.context["session"])
    return [UserOut.from_pydantic(user) for user in users]


async def resolver_get_user(info: Info, id: str) -> UserOut | None:
    user = await crud.user.get(sesion=info.context["session"], id=id)
    if user is None:
        raise Exception(f"User with id {id} not found")
    return UserOut.from_pydantic(user)


async def resolver_create_user(info: Info, user_in: UserCreate) -> UserOut:
    session = info.context["session"]
    user = await crud.user.get_by_email(session, email=user_in.email)

    if user is not None:
        raise Exception("Email already exists!")

    user_id = utils.generate_uuid()
    while await crud.user.get(session, user_id) is not None:
        user_id = utils.generate_uuid()
    user_in.id = user_id
    user_in.password = security.get_password_hashed(user_in.password)
    print(user_in)
    user = await crud.user.create(session, obj_in=user_in)
    return UserOut.from_pydantic(user)


async def resolver_update_user(info: Info, user_in: UserUpdate) -> User:
    pass


async def resolver_delete_user(info: Info, id: str) -> None:
    return


@strawberry.type
class UserQuery:
    users: list[UserOut] = strawberry.field(resolver=resolver_get_users)
    user: UserOut = strawberry.field(resolver=resolver_get_user)


@strawberry.type
class UserMutation:
    create_user: UserOut = strawberry.field(resolver=resolver_create_user)
    update_user: UserOut = strawberry.field(resolver=resolver_update_user)
    delete_user: UserOut = strawberry.field(resolver=resolver_delete_user)
