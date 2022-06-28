import strawberry
from strawberry.types import Info

import crud
import exceptions
from core import security
from schemas import MessageOut, MessageCreate, MessageUpdate


async def resolver_get_messages(info: Info) -> list[MessageOut]:
    messsages = await crud.message.get_multi(info.context["mongo_db"])
    return messsages


async def resolver_get_message(info: Info, id: int) -> MessageOut:
    message = await crud.message.get(info.context["mongo_db"], id=id)
    if message is None:
        raise exceptions.ResourceNotFound(resource_type="Message", id=id)
    return message


async def resolver_create_message(info: Info, message_in: MessageCreate) -> MessageOut:
    message = await crud.message.get(info.context["mongo_db"], id=id)
    if message is None:
        raise exceptions.ResourceNotFound(resource_type="Message", id=id)


async def resolver_update_message(info: Info, message_in: MessageUpdate) -> MessageOut:
    message = await crud.message.get(info.context["mongo_db"], id=id)
    if message is None:
        raise exceptions.ResourceNotFound(resource_type="Message", id=id)


async def resolver_delete_message(info: Info, id: int) -> MessageOut:
    message = await crud.message.get(info.context["mongo_db"], id=id)
    if message is None:
        raise exceptions.ResourceNotFound(resource_type="Message", id=id)


@strawberry.type
class MessageQuery:
    messages: list[MessageOut] = strawberry.field(
        resolver=resolver_get_messages,
        permission_classes=[security.IsAuthenticatedUser],
    )
    message = strawberry.field(
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
    delete_message: MessageOut = strawberry.field(
        resolver=resolver_delete_message,
        permission_classes=[security.IsAuthenticatedUser],
    )
