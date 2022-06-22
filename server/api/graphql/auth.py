import strawberry
from strawberry.types import Info

import crud
import exceptions
from core import security
from schemas import User
from core.config import settings


@strawberry.type
class LoginSuccess:
    user: User
    login_type: str = "Normal"


async def resolver_login(info: Info, email: str, password: str) -> User:
    db_session = info.context["db_session"]
    user = await crud.user.get_by_email(db_session, email=email)
    if user is None:
        raise exceptions.InvalidLoginCredentials()
    if not security.verify_password(password, user.password):
        raise exceptions.InvalidLoginCredentials()

    access_token = security.create_access_token({"user_id": user.id})
    response = info.context["response"]
    response.set_cookie(
        key="Authorization",
        value=access_token,
        expires=settings.ACCESS_TOKEN_EXPIRE_MINUTES,
        httponly=True,
    )
    return User.from_pydantic(user, extra={"login_type": "Normal"})


@strawberry.type
class AuthMutation:
    login: User = strawberry.field(resolver=resolver_login)
