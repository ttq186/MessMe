import strawberry
from strawberry.types import Info

from src import utils
from src.auth import exceptions as auth_exceptions
from src.auth import utils as auth_utils
from src.auth.schemas import AuthToken, SasToken
from src.config import settings
from src.user.crud import user_crud
from src.user.schemas import User


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
    sas_token: SasToken = strawberry.field(
        resolver=resolver_get_sas_token,
        permission_classes=[utils.IsAuthenticatedUser],
    )
