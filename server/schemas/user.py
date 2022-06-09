from datetime import date, datetime

from base import CamelModel

from pydantic import EmailStr


class UserBase(CamelModel):
    """Shared properties."""

    username: str | None = None
    email: EmailStr | None = None
    cover_img_url: str | None = None
    description: str | None = None
    is_female: bool | None = None
    date_of_birth: date | None = None
    created_at: datetime | None = None
    has_confirmed_email: bool | None = None
    is_admin: bool | None = None


class UserCreate(UserBase):
    email: EmailStr
    password: str


class UserUpdate(UserBase):
    pass


class UserOut(UserBase):
    """Properties to return to client."""
    id: str

    class Config:
        orm_mode = True
