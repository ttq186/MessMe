from datetime import datetime

import strawberry
from src.auth.schemas import User
from src.message.schemas import Message


@strawberry.type
class Contact:
    id: strawberry.ID
    requester_id: str | None
    accepter_id: str | None
    created_at: datetime | None
    invitation_message: str | None
    friend: User | None
    is_established: bool | None
    last_message: Message | None = None


@strawberry.input
class ContactCreate:
    invitation_message: str | None
    requester_id: str | None = None
    accepter_id: str | None = None
    created_at: datetime | None = None


@strawberry.input
class ContactUpdate:
    is_established: bool | None


@strawberry.type
class ContactDeleteSuccess:
    message: str
