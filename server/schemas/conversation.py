import strawberry
from pydantic import BaseModel


class ConversationBase(BaseModel):
    id: int | None


@strawberry.experimental.pydantic.type(model=ConversationBase, all_fields=True)
class Conversation:
    pass
