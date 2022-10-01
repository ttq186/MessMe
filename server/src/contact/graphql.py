import asyncio
from datetime import datetime
from typing import AsyncIterator

import strawberry
from bson import json_util
from redis.client import PubSub
from strawberry.types import Info

from src import deps, exceptions, utils
from src.auth.crud import user_crud
from src.contact import exceptions as contact_exceptions
from src.contact import utils as contact_utils
from src.contact.crud import contact_crud
from src.contact.schemas import (Contact, ContactCreate, ContactDeleteSuccess,
                                 ContactUpdate)
from src.database import redis
from src.message import utils as message_utils
from src.message.crud import message_crud


async def resolver_get_contact_request(info: Info) -> list[Contact]:
    current_user = info.context["current_user"]
    contacts = await contact_crud.get_multi_by_accepter_id(
        info.context["pg_session"], accepter_id=current_user.id, is_established=False
    )
    return [
        Contact(
            **contact.to_dict(exclude=["requester", "accepter"]),
            friend=contact.requester,
        )
        for contact in contacts
    ]


async def resolver_get_contacts(
    info: Info, is_established: bool | None = None
) -> list[Contact]:
    current_user = info.context["current_user"]
    contacts = await contact_crud.get_multi_by_requester_or_accepter_id(
        info.context["pg_session"],
        user_id=current_user.id,
        is_established=is_established,
    )
    return [
        Contact(
            **contact.to_dict(exclude=["requester", "accepter"]),
            last_message=await message_crud.get_most_recent_by_channel_id(
                info.context["mongo_db"],
                channel_id=message_utils.generate_message_channel_by_users_id(
                    contact.requester_id, contact.accepter_id
                ),
            ),
            friend=contact.accepter
            if contact.requester_id == current_user.id
            else contact.requester,
        )
        for contact in contacts
    ]


async def resolver_get_contact(
    info: Info, id: strawberry.ID | None = None, partner_id: str | None = None
) -> Contact | None:
    current_user = info.context.get("current_user")
    pg_session = info.context["pg_session"]
    if id is not None:
        contact = await contact_crud.get(pg_session, id=id)
    else:
        contact = await contact_crud.get_by_requester_and_accepter_id(
            pg_session, current_user.id, partner_id
        )

    if contact is None:
        raise exceptions.ResourceNotFound(resource_type="Contact", id=id)
    if current_user.id not in [contact.requester_id, contact.accepter_id]:
        raise exceptions.NotAuthorized()
    return Contact(
        **contact.to_dict(exclude=["requester", "accepter"]),
        last_message=await message_crud.get_most_recent_by_channel_id(
            info.context["mongo_db"],
            channel_id=message_utils.generate_message_channel_by_users_id(
                contact.requester_id, contact.accepter_id
            ),
        ),
        friend=contact.accepter
        if contact.requester_id == current_user.id
        else contact.requester,
    )


async def resolver_create_contact(
    info: Info, partner_id: str | None, contact_in: ContactCreate | None
) -> Contact:
    current_user = info.context.get("current_user")
    pg_session = info.context["pg_session"]

    if current_user.id == partner_id:
        raise Exception("You can not create a new contact with yourself!")
    accepter = await user_crud.get(pg_session, partner_id)
    if accepter is None:
        raise exceptions.EmailDoesNotExist()

    contact = await contact_crud.get_by_requester_and_accepter_id(
        pg_session, requester_id=current_user.id, accepter_id=accepter.id
    )
    if contact is not None:
        if contact.is_established:
            raise contact_exceptions.ContactAlreadyExist()
        else:
            raise contact_exceptions.ContactWaitForAccepting()

    contact_in.created_at = datetime.now()
    contact_in.requester_id = current_user.id
    contact_in.accepter_id = accepter.id
    contact = await contact_crud.create(pg_session, contact_in)

    pushed_message = contact.to_dict(exclude=["requester", "accepter"])
    await redis.publish(
        channel=contact_utils.generate_contact_requests_channel(partner_id),
        message=json_util.dumps(pushed_message),
    )
    return Contact(
        **contact.to_dict(exclude=["requester", "accepter"]), friend=accepter
    )


async def resolver_update_contact(
    info: Info, id: strawberry.ID, contact_in: ContactUpdate
) -> Contact:
    pg_session = info.context["pg_session"]
    id = int(id)
    contact = await contact_crud.get(pg_session, id)
    if contact is None:
        raise exceptions.ResourceNotFound(resource_type="Contact", id=id)

    current_user = info.context.get("current_user")
    if current_user.id not in [contact.requester_id, contact.accepter_id]:
        raise exceptions.NotAuthorized()
    contact = await contact_crud.update(pg_session, db_obj=contact, obj_in=contact_in)
    return Contact(
        **contact.to_dict(exclude=["requester", "accepter"]), friend=contact.requester
    )


async def resolver_delete_contact(
    info: Info, id: strawberry.ID
) -> ContactDeleteSuccess:
    pg_session = info.context["pg_session"]
    id = int(id)
    contact = await contact_crud.get(pg_session, id)
    if contact is None:
        raise exceptions.ResourceNotFound(resource_type="Contact", id=id)

    current_user = info.context.get("current_user")
    if current_user.id not in [contact.requester_id, contact.accepter_id]:
        raise exceptions.NotAuthorized()
    await contact_crud.delete(pg_session, id=id)
    return ContactDeleteSuccess(message="Deleted Successfully!")


@strawberry.type
class ContactQuery:
    contacts: list[Contact] = strawberry.field(
        resolver=resolver_get_contacts,
        permission_classes=[utils.IsAuthenticatedUser],
    )
    contact_requests: list[Contact] = strawberry.field(
        resolver=resolver_get_contact_request,
        permission_classes=[utils.IsAuthenticatedUser],
    )
    contact: Contact = strawberry.field(
        resolver=resolver_get_contact,
        permission_classes=[utils.IsAuthenticatedUser],
    )
    online_contact_ids: Contact


@strawberry.type
class ContactMutation:
    create_contact: Contact = strawberry.field(
        resolver=resolver_create_contact,
        permission_classes=[utils.IsAuthenticatedUser],
    )
    update_contact: Contact = strawberry.field(
        resolver=resolver_update_contact,
        permission_classes=[utils.IsAuthenticatedUser],
    )
    delete_contact: ContactDeleteSuccess = strawberry.field(
        resolver=resolver_delete_contact,
        permission_classes=[utils.IsAuthenticatedUser],
    )


@strawberry.type
class ContactSubscription:
    @strawberry.subscription
    async def contact_requests(self, info: Info) -> AsyncIterator[Contact]:
        current_user = await deps.get_current_user(info)
        channel_id = contact_utils.generate_contact_requests_channel(current_user.id)
        pubsub: PubSub
        async with redis.pubsub() as pubsub:
            await pubsub.subscribe(channel_id)
            while True:
                try:
                    message = await pubsub.get_message(ignore_subscribe_messages=True)
                    if message is not None:
                        data = json_util.loads(message["data"])
                        yield Contact(**data)
                    await asyncio.sleep(0.01)
                except asyncio.TimeoutError:
                    pass
