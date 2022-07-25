import strawberry
from strawberry.types import Info

import crud
import utils
import exceptions
from core import security
from schemas import User


async def resolver_login(info: Info, email: str, password: str) -> User:
    pg_session = info.context["pg_session"]
    user = await crud.user.get_by_email(pg_session, email=email)
    if user is None:
        raise exceptions.InvalidLoginCredentials()
    if user is not None and user.password is None:
        raise exceptions.AccountCreatedByGoogle()
    if not security.verify_password(password, user.password):
        raise exceptions.InvalidLoginCredentials()

    access_token = security.create_access_token({"user_id": user.id})
    response_obj = info.context["response"]
    security.set_access_token_on_http_only_cookie(response_obj, access_token)
    security.set_logout_detection_cookie(response_obj)
    return user


async def resolver_login_via_google(info: Info, tokenId: str) -> User:
    token_data = security.decode_oauth2_token_id(tokenId)
    email = token_data.get("email")

    session = info.context["pg_session"]
    user = await crud.user.get_by_email(session, email=email)
    if user is not None and user.password is not None:
        raise exceptions.AccountCreatedWithoutGoogle()

    if user is None:
        user_in = User(email=email)
        user_id = utils.generate_uuid()
        while await crud.user.get(session, id=user_id) is not None:
            user_id = utils.generate_uuid()
        user_in.id = user_id
        user = await crud.user.create(session, obj_in=user_in)

    access_token = security.create_access_token({"user_id": user.id})
    response_obj = info.context["response"]
    security.set_access_token_on_http_only_cookie(response_obj, access_token)
    security.set_logout_detection_cookie(response_obj)
    return user


@strawberry.type
class AuthQuery:
    login: User = strawberry.field(resolver=resolver_login)
    login_via_google: User = strawberry.field(resolver=resolver_login_via_google)
