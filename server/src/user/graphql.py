import strawberry
from strawberry.types import Info

from src import exceptions, utils
from src.auth import utils as auth_utils
from src.contact.crud import contact_crud
from src.contact.schemas import ContactStatus
from src.user.crud import user_crud
from src.user.schemas import User, UserCreate, UserDeleteSuccess, UserUpdate
from src.database import redis


async def resolver_get_users(info: Info, search: str | None = None) -> list[User]:
    pg_session = info.context["pg_session"]
    current_user = info.context["current_user"]
    current_user_id = current_user.id

    users = await user_crud.get_multi(pg_session, search=search)
    contacts = await contact_crud.get_multi_by_requester_or_accepter_id(
        pg_session, user_id=current_user_id
    )

    partners_status_by_id = {}
    for contact in contacts:
        accepter_id, requester_id = contact.accepter_id, contact.requester_id
        partner_id = accepter_id if requester_id == current_user_id else requester_id
        partners_status_by_id[partner_id] = (
            ContactStatus.FRIEND if contact.is_established else ContactStatus.REQUESTED
        )
    return [
        User(
            **user.to_dict(),
            partner_status=partners_status_by_id.get(user.id) or ContactStatus.STRANGER,
        )
        for user in users
    ]


async def resolver_get_user(info: Info, id: str) -> User | None:
    current_user = info.context["current_user"]
    if current_user.id != id and (not current_user.is_admin):
        raise exceptions.NotAuthorized()
    user = await user_crud.get(session=info.context["pg_session"], id=id)
    if user is None:
        raise exceptions.ResourceNotFound(resource_type="User", id=id)
    return user


async def resolver_get_current_user(info: Info) -> User | None:
    current_user = info.context["current_user"]
    return current_user


async def resolver_get_online_user_ids(info: Info) -> list[strawberry.ID]:
    current_user = info.context["current_user"]
    contacts = await contact_crud.get_multi_by_requester_or_accepter_id(
        info.context["pg_session"], user_id=current_user.id, is_established=True
    )
    user_ids = [
        contact.accepter_id
        if contact.accepter_id != current_user.id
        else contact.requester_id
        for contact in contacts
    ]
    async with redis.client() as conn:
        await conn.set(f"user:{current_user.id}", "online", ex=5)
        statuses = await conn.mget(*[f"user:{user_id}" for user_id in user_ids])
    return [id for id, status in zip(user_ids, statuses) if status == b"online"]


async def resolver_create_user(info: Info, user_in: UserCreate) -> User:
    pg_session = info.context["pg_session"]
    user = await user_crud.get_by_email(pg_session, email=user_in.email)
    if user is not None:
        raise exceptions.EmailAlreadyExists()
    user_in.password = auth_utils.get_hashed_password(user_in.password)
    user = await user_crud.create(pg_session, obj_in=user_in)
    return user


async def resolver_update_user(info: Info, user_in: UserUpdate) -> User:
    current_user: User = info.context["current_user"]
    if current_user.id != user_in.id and (not current_user.is_admin):
        raise exceptions.NotAuthorized()

    pg_session = info.context["pg_session"]
    user = await user_crud.get(pg_session, id=user_in.id)
    if user is None:
        raise exceptions.ResourceNotFound(resource_type="User", id=user_in.id)
    if user_in.password is not None:
        user_in.password = auth_utils.get_hashed_password(user_in.password)
    user = await user_crud.update(pg_session, db_obj=user, obj_in=user_in)
    return user


async def resolver_delete_user(info: Info, id: str) -> UserDeleteSuccess:
    current_user = info.context["current_user"]
    pg_session = info.context["pg_session"]
    if current_user.id != id and (not current_user.is_admin):
        raise exceptions.NotAuthorized()
    user = await user_crud.get(pg_session, id=id)
    if user is None:
        raise exceptions.ResourceNotFound(resource_type="User", id=id)
    await user_crud.delete(pg_session, id=id)
    return UserDeleteSuccess(message="Deleted Successfully!")


@strawberry.type
class UserQuery:
    users: list[User] = strawberry.field(
        resolver=resolver_get_users, permission_classes=[utils.IsAuthenticatedUser]
    )
    user: User = strawberry.field(
        resolver=resolver_get_user, permission_classes=[utils.IsAuthenticatedUser]
    )
    current_user: User = strawberry.field(
        resolver=resolver_get_current_user,
        permission_classes=[utils.IsAuthenticatedUser],
    )
    online_user_ids: list[strawberry.ID] = strawberry.field(
        resolver=resolver_get_online_user_ids,
        permission_classes=[utils.IsAuthenticatedUser],
    )


@strawberry.type
class UserMutation:
    create_user: User = strawberry.field(resolver=resolver_create_user)
    update_user: User = strawberry.field(
        resolver=resolver_update_user,
        permission_classes=[utils.IsAuthenticatedUser],
    )
    delete_user: UserDeleteSuccess = strawberry.field(
        resolver=resolver_delete_user,
        permission_classes=[utils.IsAuthenticatedAdmin],
    )
