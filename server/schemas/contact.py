from datetime import datetime

import strawberry
from .user import User
from .message import Message


@strawberry.type
class Contact:
    id: strawberry.ID
    requester_id: str | None
    accepter_id: str | None
    created_at: datetime | None = None
    invitation_message: str | None = None
    friend: User | None = None
    last_message: Message | None = None


@strawberry.input
class ContactCreate:
    requester_id: str | None = None
    accepter_id: str | None = None
    created_at: datetime | None = None
    invitation_message: str | None = None


@strawberry.type
class ContactDeleteSuccess:
    message: str
