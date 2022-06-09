from datetime import datetime
from .base import CamelModel


class MessageBase(CamelModel):
    user_id: str | None = None
    conversation_id: str | None = None
    content: str | None = None
    created_at: datetime | None = None


class MessageCreate(MessageBase):
    content: str


class MessageUpdate(MessageBase):
    pass


class MessageOut(MessageBase):
    id: int

    class Config:
        orm_mode = True
