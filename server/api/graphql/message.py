from bson import json_util
from typing import AsyncIterator

import strawberry
from strawberry.types import Info

import crud
import exceptions
from core import security
from api import deps
from schemas import (
    Message,
    MessageCreate,
    MessageUpdate,
    MessageDeleteSuccess,
    ObjectIdType,
)
from db.config import broadcast
from utils import generate_channel_by_users_id


async def resolver_get_messages(info: Info) -> list[Message]:
    messages = await crud.message.get_multi(info.context["mongo_db"])
    return messages


async def resolver_get_messages_by_sender_and_receiver(
    info: Info, sender_id: str, receiver_id: str
) -> list[Message]:
    channel_id = generate_channel_by_users_id(
        sender_id, receiver_id, channel_type="message"
    )
    messages = await crud.message.get_multi_by_channel_id(
        info.context["mongo_db"], channel_id=channel_id
    )
    return messages


async def resolver_get_message(info: Info, id: ObjectIdType) -> Message:
    message = await crud.message.get(info.context["mongo_db"], id=id)
    if message is None:
        raise exceptions.ResourceNotFound(resource_type="Message", id=id)
    return message


async def resolver_create_message(
    info: Info, message_in: MessageCreate, receiver_id: str | None = None
) -> Message:
    if receiver_id is None and message_in.channel_id is None:
        raise Exception("At least receiver_id or channel_id has to be provided!")

    current_user = info.context.get("current_user")
    message_in.sender_id = current_user.id

    if receiver_id is not None:
        user = crud.user.get(info.context["pg_session"], receiver_id)
        if user is None:
            raise exceptions.ResourceNotFound(resource_type="User", id=receiver_id)
        message_in.channel_id = generate_channel_by_users_id(
            current_user.id, receiver_id, channel_type="message"
        )
    message = await crud.message.create(info.context["mongo_db"], message_in)
    await broadcast.publish(
        channel=message_in.channel_id, message=json_util.dumps(message.__dict__)
    )
    return message


async def resolver_update_message(info: Info, message_in: MessageUpdate) -> Message:
    mongo_db = info.context["mongo_db"]
    message = await crud.message.get(mongo_db, id=message_in._id)
    if message is None:
        raise exceptions.ResourceNotFound(resource_type="Message", id=message_in._id)
    message = await crud.message.update(mongo_db, message_in=message_in)
    return message


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
    messages: list[Message] = strawberry.field(
        resolver=resolver_get_messages,
        permission_classes=[security.IsAuthenticatedUser],
    )
    messages_by_sender_and_receiver: list[Message] = strawberry.field(
        resolver=resolver_get_messages_by_sender_and_receiver,
        permission_classes=[security.IsAuthenticatedUser],
    )
    message: Message = strawberry.field(
        resolver=resolver_get_message, permission_classes=[security.IsAuthenticatedUser]
    )


@strawberry.type
class MessageMutation:
    create_message: Message = strawberry.field(
        resolver=resolver_create_message,
        permission_classes=[security.IsAuthenticatedUser],
    )
    update_message: Message = strawberry.field(
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
    async def message(
        self, info: Info, receiver_id: str, sender_id: str | None = None
    ) -> AsyncIterator[Message]:
        current_user = await deps.get_current_user(info)
        channel_id = generate_channel_by_users_id(
            current_user.id, receiver_id, channel_type="message"
        )
        async with broadcast.subscribe(channel=channel_id) as subscriber:
            async for event in subscriber:
                data = json_util.loads(event.message)
                yield Message(**data)
