from datetime import datetime
from enum import Enum

import strawberry

from src.message.schemas import Message
from src.user.schemas import User


class ContactStatus(str, Enum):
    STRANGER = "Stranger"
    FRIEND = "Friend"
    REQUESTED = "Requested"


@strawberry.type
class Contact:
    id: strawberry.ID
    requester_id: str | None
    accepter_id: str | None
    created_at: datetime | None
    invitation_message: str | None
    is_established: bool | None
    friend: User | None = None
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


@strawberry.type
class OnlineContact:
    id: str
