from typing import List
from datetime import date, datetime

import strawberry
from pydantic import BaseModel

from .message import Message
from .attachment import Attachment
from .conversation import Conversation


class UserBase(BaseModel):
    id: str | None
    username: str | None
    email: str | None
    cover_img_url: str | None
    description: str | None
    is_female: bool | None
    date_of_birth: date | None
    created_at: datetime | None
    has_confirmed_email: bool | None
    is_admin: bool | None


class UserCreateBase(UserBase):
    id: str | None
    email: str
    password: str


class UserUpdateBase(UserBase):
    password: str | None


class UserOutBase(UserBase):
    conversations: List[Conversation] | None
    messages: List[Message] | None
    attachments: List[Attachment] | None


@strawberry.type
class UserDeleteSuccess:
    message: str


@strawberry.experimental.pydantic.type(model=UserBase, all_fields=True)
class User:
    login_type: str | None = "Normal"


@strawberry.experimental.pydantic.type(model=UserOutBase, all_fields=True)
class UserOut:
    pass


@strawberry.experimental.pydantic.input(model=UserCreateBase, all_fields=True)
class UserCreate:
    pass


@strawberry.experimental.pydantic.input(model=UserUpdateBase, all_fields=True)
class UserUpdate:
    pass
