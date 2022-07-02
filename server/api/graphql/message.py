import asyncio
from typing import AsyncGenerator, AsyncIterator
import strawberry
from strawberry.types import Info

import crud
import exceptions
from core import security
from schemas import (
    MessageOut,
    MessageCreate,
    MessageUpdate,
    ObjectIdType,
    MessageDeleteSuccess,
)

queue = asyncio.Queue(maxsize=0)


async def resolver_get_messages(info: Info) -> list[MessageOut]:
    messages = await crud.message.get_multi(info.context["mongo_db"])
    return [MessageOut(**message) for message in messages]


async def resolver_get_messages_by_owner(info: Info, user_id: str) -> list[MessageOut]:
    messages = await crud.message.get_multi_by_owner(
        info.context["mongo_db"], user_id=user_id
    )
    return [MessageOut(**message) for message in messages]


async def resolver_get_message(info: Info, id: ObjectIdType) -> MessageOut:
    message = await crud.message.get(info.context["mongo_db"], id=id)
    if message is None:
        raise exceptions.ResourceNotFound(resource_type="Message", id=id)
    return MessageOut(**message)


async def resolver_create_message(info: Info, message_in: MessageCreate) -> MessageOut:
    message = await crud.message.create(info.context["mongo_db"], message_in)
    await queue.put(MessageOut(**message))

    return MessageOut(**message)


async def resolver_update_message(info: Info, message_in: MessageUpdate) -> MessageOut:
    mongo_db = info.context["mongo_db"]
    message = await crud.message.get(mongo_db, id=message_in._id)
    if message is None:
        raise exceptions.ResourceNotFound(resource_type="Message", id=message_in._id)
    message = await crud.message.update(mongo_db, message_in=message_in)
    return MessageOut(**message)


async def resolver_delete_message(info: Info, id: ObjectIdType) -> MessageDeleteSuccess:
    mongo_db = info.context["mongo_db"]
    message = await crud.message.get(mongo_db, id=id)
    if message is None:
        raise exceptions.ResourceNotFound(resource_type="Message", id=id)
    message_delete_result = await crud.message.delete(mongo_db, id=id)
    if message_delete_result:
        return MessageDeleteSuccess(message="Deleted message successfully!")
    raise exceptions.DeleteFailed(resource_type="Message", id=id)


@strawberry.type
class MessageQuery:
    messages: list[MessageOut] = strawberry.field(
        resolver=resolver_get_messages,
        permission_classes=[security.IsAuthenticatedUser],
    )
    messages_by_owner: list[MessageOut] = strawberry.field(
        resolver=resolver_get_messages_by_owner,
        permission_classes=[security.IsAuthenticatedUser],
    )
    message: MessageOut = strawberry.field(
        resolver=resolver_get_message, permission_classes=[security.IsAuthenticatedUser]
    )


@strawberry.type
class MessageMutation:
    create_message: MessageOut = strawberry.field(
        resolver=resolver_create_message,
        permission_classes=[security.IsAuthenticatedUser],
    )
    update_message: MessageOut = strawberry.field(
        resolver=resolver_update_message,
        permission_classes=[security.IsAuthenticatedUser],
    )
    delete_message: MessageDeleteSuccess = strawberry.field(
        resolver=resolver_delete_message,
        permission_classes=[security.IsAuthenticatedUser],
    )


@strawberry.type
class MessageSubscription:
    @strawberry.subscription
    async def messages(self, user_id: str) -> AsyncIterator[MessageOut]:
        while True:
            message = await queue.get()
            print(message)
            if message.receiver_id == user_id:
                queue.task_done()
                yield message
            else:
                await queue.put(message)
