from .base import CamelModel


class ContactBase(CamelModel):
    user_id: str | None = None
    friend_id: str | None = None


class ContactCreate(ContactBase):
    pass


class ContactUpdate(ContactBase):
    pass


class ContactOut(ContactBase):
    id: int

    class Config:
        orm_mode = True
