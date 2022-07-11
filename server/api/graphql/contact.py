import json
from datetime import datetime
from typing import AsyncIterator

import strawberry
from strawberry.types import Info

import crud
import exceptions
from core import security
from schemas import (
    Contact,
    ContactCreate,
    ContactDeleteSuccess,
)
from utils import generate_channel_by_users_id
from db.config import broadcast


async def resolver_get_contacts(info: Info) -> list[Contact]:
    current_user = info.context["current_user"]
    contacts = await crud.contact.get_multi_by_requester_or_accepter_id(
        info.context["pg_session"], user_id=current_user.id
    )
    return [
        Contact(
            **contact.to_dict(exclude=["requester", "accepter"]),
            last_message=await crud.message.get_most_recent_by_channel_id(
                info.context["mongo_db"],
                channel_id=generate_channel_by_users_id(
                    contact.requester_id, contact.accepter_id, channel_type="message"
                ),
            ),
            friend=contact.accepter
            if contact.requester_id == current_user.id
            else contact.requester
        )
        for contact in contacts
    ]


async def resolver_get_contact(info: Info, id: str) -> Contact | None:
    current_user = info.context.get("current_user")
    contact = await crud.contact.get(session=info.context["pg_session"], id=id)
    if contact is None:
        raise exceptions.ResourceNotFound(resource_type="Contact", id=id)
    if current_user.id not in [contact.user_id, contact.friend_id]:
        raise exceptions.NotAuthorized()
    return contact


async def resolver_create_contact(
    info: Info, email: str, contact_in: ContactCreate | None
) -> Contact:
    current_user = info.context.get("current_user")
    pg_session = info.context["pg_session"]

    if current_user.email == email:
        raise Exception("You can not create a new contact with yourself!")
    user = await crud.user.get_by_email(pg_session, email=email)
    if user is None:
        raise exceptions.EmailDoesNotExist()
    contact_in.created_at = datetime.now()
    contact_in.requester_id = current_user.id
    contact_in.accepter_id = user.id
    contact = await crud.contact.create(pg_session, contact_in)
    channel_id = generate_channel_by_users_id(
        contact_in.requester_id, contact_in.accepter_id, channel_type="contact"
    )
    await broadcast.publish(channel=channel_id, message=json.dumps(contact.__dict__))
    return Contact(**contact.to_dict(exclude=["requester", "accepter"]), friend=user)


async def resolver_delete_contact(info: Info, id: str) -> ContactDeleteSuccess:
    pg_session = info.context["pg_session"]
    contact = await crud.contact.get(pg_session, id)
    if contact is None:
        raise exceptions.ResourceNotFound(resource_type="Contact", id=id)

    current_user = info.context.get("current_user")
    if current_user not in [contact.user_id, contact.friend_id]:
        raise exceptions.NotAuthorized()
    await crud.contact.delete(pg_session, id=id)
    return ContactDeleteSuccess(message="Deleted Successfully!")


@strawberry.type
class ContactQuery:
    contacts: list[Contact] = strawberry.field(
        resolver=resolver_get_contacts,
        permission_classes=[security.IsAuthenticatedUser],
    )
    contact: Contact = strawberry.field(
        resolver=resolver_get_contact, permission_classes=[security.IsAuthenticatedUser]
    )


@strawberry.type
class ContactMutation:
    create_contact: Contact = strawberry.field(
        resolver=resolver_create_contact,
        permission_classes=[security.IsAuthenticatedUser],
    )
    delete_contact: ContactDeleteSuccess = strawberry.field(
        resolver=resolver_delete_contact,
        permission_classes=[security.IsAuthenticatedAdmin],
    )


@strawberry.type
class ContactSubscription:
    @strawberry.subscription
    async def contact(self, info: Info, friend_email: str) -> AsyncIterator[Contact]:
        friend = await crud.user.get_by_email(info.context["pg_session"])
        if friend is None:
            raise exceptions.ResourceNotFound(resource_type="User", email=friend_email)

        current_user = info.context.get("current_user")
        channel_id = generate_channel_by_users_id(
            current_user.id, friend.id, channel_type="contact"
        )
        async with broadcast.subscribe(channel=channel_id) as subcriber:
            async for event in subcriber:
                data = json.loads(event)
                yield Contact(**data)
