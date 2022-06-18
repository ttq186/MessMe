import strawberry
from strawberry.types import Info

import crud
import utils
import models
from api import deps
from core import security
from schemas import User, UserCreate, UserUpdate, UserOut, UserDeleteSuccess


async def resolver_get_users(info: Info) -> list[UserOut]:
    users = await crud.user.get_multi(session=info.context["db_session"])
    return [UserOut.from_pydantic(user) for user in users]


async def resolver_get_user(info: Info, id: str) -> UserOut | None:
    current_user: models.User = info.context.get("current_user")
    print(current_user.id != id)

    if current_user.id != id and (not current_user.is_admin):
        raise Exception("You don't have this privilege")
    user = await crud.user.get(session=info.context["db_session"], id=id)
    if user is None:
        raise Exception(f"User with id {id} does not exist!")
    return UserOut.from_pydantic(user)


async def resolver_create_user(info: Info, user_in: UserCreate) -> UserOut:
    print(user_in)
    db_session = info.context["db_session"]
    user = await crud.user.get_by_email(db_session, email=user_in.email)
    if user is not None:
        raise Exception("Email already exists!")

    user_id = utils.generate_uuid()
    while await crud.user.get(db_session, user_id) is not None:
        user_id = utils.generate_uuid()
    user_in.id = user_id
    user_in.password = security.get_password_hashed(user_in.password)
    print(user_in)
    user = await crud.user.create(db_session, bj_in=user_in)
    return UserOut.from_pydantic(user)


async def resolver_update_user(info: Info, user_in: UserUpdate) -> User:
    current_user = await deps.get_current_user(info)

    if current_user.id != user_in.id and (not current_user.is_admin):
        raise Exception("You don't have this privilege")

    db_session = info.context["session"]
    user = await crud.user.get(db_session, id=user_in.id)
    if user is None:
        raise Exception(f"User with id {user_in.id} does not exist!")
    user = await crud.user.update(db_session, b_obj=user, obj_in=user_in)
    return user


async def resolver_delete_user(info: Info, id: str) -> UserDeleteSuccess:
    current_user = await deps.get_current_user(info)

    db_session = info.context["session"]
    if current_user.id != id and (not current_user.is_admin):
        raise Exception("You don't have this privilege")
    user = await crud.user.get(db_session, id=id)
    if user is None:
        raise Exception(f"User with id {id} does not exist!")
    await crud.user.delete(db_session, id=id)
    return UserDeleteSuccess(message="Deleted Successfully!")


@strawberry.type
class UserQuery:
    users: list[UserOut] = strawberry.field(
        resolver=resolver_get_users, permission_classes=[security.IsAuthenticatedAdmin]
    )
    user: UserOut = strawberry.field(
        resolver=resolver_get_user, permission_classes=[security.IsAuthenticatedUser]
    )


@strawberry.type
class UserMutation:
    create_user: UserOut = strawberry.field(resolver=resolver_create_user)
    update_user: UserOut = strawberry.field(
        resolver=resolver_update_user, permission_classes=[security.IsAuthenticatedUser]
    )
    delete_user: UserDeleteSuccess = strawberry.field(
        resolver=resolver_delete_user,
        permission_classes=[security.IsAuthenticatedAdmin],
    )
