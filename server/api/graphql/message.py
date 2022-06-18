import strawberry
from strawberry.types import Info

import crud
from schemas import Message


async def get_messages(info: Info):
    messages = await crud.message.get_multi(info.context["session"])
    return messages


@strawberry.type
class MessageQuery:
    messages: list[Message] = strawberry.field(resolver=get_messages)
