import strawberry
from pydantic import BaseModel


class LoginBase(BaseModel):
    email: str
    password: str


class TokenOutBase(BaseModel):
    access_token: str
    token_type: str = "Bearer"
    login_type: str = "Normal"


@strawberry.experimental.pydantic.type(model=LoginBase, all_fields=True)
class Login:
    pass


@strawberry.experimental.pydantic.type(model=TokenOutBase, all_fields=True)
class TokenOut:
    pass
