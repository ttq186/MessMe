from enum import Enum

import strawberry
from strawberry.types import Info

from src import exceptions, utils
from src.auth import exceptions as auth_exceptions
from src.auth import utils as auth_utils
from src.auth.crud import user_crud
from src.auth.schemas import (AuthToken, SasToken, User, UserCreate,
                              UserDeleteSuccess, UserUpdate)
from src.config import settings
from src.contact.crud import contact_crud


class ContactStatus(str, Enum):
    STRANGER = "Stranger"
    FRIEND = "Friend"
    REQUESTED = "Requested"


async def resolver_login(info: Info, email: str, password: str) -> User:
    pg_session = info.context["pg_session"]
    user = await user_crud.get_by_email(pg_session, email=email)
    if user is None:
        raise auth_exceptions.InvalidLoginCredentials()
    if user.password is None:
        raise auth_exceptions.AccountCreatedByGoogle()
    if not auth_utils.verify_password(password, user.password):
        raise auth_exceptions.InvalidLoginCredentials()

    access_token = auth_utils.create_access_token(user.id)
    refresh_token = auth_utils.create_refresh_token(user.id)
    auth_utils.set_credentials_after_logging(
        response=info.context["response"],
        access_token=access_token,
        refresh_token=refresh_token,
    )
    return user


async def resolver_login_via_google(info: Info, tokenId: str) -> User:
    token_data = auth_utils.decode_oauth2_token_id(tokenId)
    email = token_data.get("email")

    session = info.context["pg_session"]
    user = await user_crud.get_by_email(session, email=email)
    if user is not None and user.password is not None:
        raise auth_exceptions.AccountCreatedWithoutGoogle()
    if user is None:
        user = await user_crud.create(session, obj_in=User(email=email))

    access_token = auth_utils.create_access_token(user.id)
    refresh_token = auth_utils.create_refresh_token(user.id)
    auth_utils.set_credentials_after_logging(
        response=info.context["response"],
        access_token=access_token,
        refresh_token=refresh_token,
    )
    return user


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
        [accepter_id, requester_id] = [contact.accepter_id, contact.requester_id]
        partner_id = accepter_id if requester_id == current_user_id else requester_id
        partners_status_by_id[partner_id] = (
            "Friend" if contact.is_established else "Requested"
        )
    return [
        User(
            **user.to_dict(),
            partner_status=partners_status_by_id[user.id]
            if partners_status_by_id.get(user.id) is not None
            else "Stranger"
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


async def resolver_refresh_token(info: Info) -> AuthToken:
    refresh_token = info.context.cookies.get("rftk")
    token_data = auth_utils.decode_token(
        token=refresh_token, secret_key=settings.REFRESH_SECRET_KEY
    )
    user = await user_crud.get(info.context["pg_session"], id=token_data.get("user_id"))
    if user is None:
        raise auth_exceptions.InvalidToken()
    payload = {"user_id": user.id}
    new_access_token = auth_utils.create_access_token(payload)
    new_refresh_token = auth_utils.create_refresh_token(payload)
    auth_utils.set_credentials_after_logging(
        info.context.response,
        access_token=new_access_token,
        refresh_token=new_refresh_token,
    )
    return AuthToken(access_token=new_access_token, refresh_token=new_refresh_token)


def resolver_get_sas_token() -> SasToken:
    sas_token = auth_utils.generate_sas_token()
    return SasToken(token=sas_token)


@strawberry.type
class AuthQuery:
    login: User = strawberry.field(resolver=resolver_login)
    login_via_google: User = strawberry.field(resolver=resolver_login_via_google)
    refresh_token: AuthToken = strawberry.field(resolver=resolver_refresh_token)


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
    sas_token: SasToken = strawberry.field(
        resolver=resolver_get_sas_token,
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
