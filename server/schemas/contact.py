from datetime import datetime

import strawberry
from .user import User


@strawberry.type
class Contact:
    id: strawberry.ID
    user_id: str | None
    friend_id: str | None
    created_at: datetime | None = None
    invitation_message: str | None = None
    friend: User | None = None
    last_interaction_at: datetime | None = None


@strawberry.input
class ContactCreate:
    user_id: str | None = None
    friend_id: str | None = None
    created_at: datetime | None = None
    invitation_message: str | None = None
    last_interaction_at: datetime | None = None


@strawberry.type
class ContactDeleteSuccess:
    message: str
