from datetime import datetime

import strawberry
from pydantic import BaseModel


class MessageBase(BaseModel):
    id: int | None
    user_id: str | None
    conversation_id: int | None
    content: str | None
    created_at: datetime | None


@strawberry.experimental.pydantic.type(model=MessageBase, all_fields=True)
class Message:
    pass
