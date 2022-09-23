from datetime import date, datetime

import strawberry


@strawberry.type
class User:
    email: str
    id: str | None
    username: str | None
    password: str | None
    avatar_url: str | None
    description: str | None
    is_female: bool | None
    phone_number: str | None
    date_of_birth: date | None
    created_at: datetime | None
    has_confirmed_email: bool | None
    partner_status: str | None
    is_admin: bool


@strawberry.input
class UserCreate:
    email: str
    password: str | None = None
    id: str | None = None


@strawberry.input
class UserUpdate:
    id: str
    password: str | None = None
    username: str | None = None
    avatar_url: str | None = None
    description: str | None = None
    is_female: bool | None = None
    phone_number: str | None = None
    date_of_birth: date | None = None
    has_confirmed_email: bool | None = None


@strawberry.type
class UserDeleteSuccess:
    message: str


@strawberry.type
class SasToken:
    token: str
