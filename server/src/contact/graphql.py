from datetime import datetime
from typing import AsyncIterator

import strawberry
from bson import json_util
from strawberry.types import Info

import crud
from src.message import crud as message_crud
import exceptions
from src.database import broadcast
from schemas import Contact, ContactCreate, ContactDeleteSuccess, ContactUpdate
import utils as contact_utils
from src import utils, deps
from src.message import utils as message_utils


async def resolver_get_contact_request(info: Info) -> list[Contact]:
    current_user = info.context["current_user"]
    contacts = await crud.contact.get_multi_by_accepter_id(
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
    contacts = await crud.contact.get_multi_by_requester_or_accepter_id(
        info.context["pg_session"],
        user_id=current_user.id,
        is_established=is_established,
    )
    return [
        Contact(
            **contact.to_dict(exclude=["requester", "accepter"]),
            last_message=await message_crud.message.get_most_recent_by_channel_id(
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
        contact = await crud.contact.get(pg_session, id=id)
    else:
        contact = await crud.contact.get_by_requester_and_accepter_id(
            pg_session, current_user.id, partner_id
        )
    if contact is None:
        raise exceptions.ResourceNotFound(resource_type="Contact", id=id)
    if current_user.id not in [contact.requester_id, contact.accepter_id]:
        raise exceptions.NotAuthorized()
    return Contact(
        **contact.to_dict(exclude=["requester", "accepter"]),
        last_message=await crud.message.get_most_recent_by_channel_id(
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
    accepter = await crud.user.get(pg_session, partner_id)
    if accepter is None:
        raise exceptions.EmailDoesNotExist()

    contact = await crud.contact.get_by_requester_and_accepter_id(
        pg_session, requester_id=current_user.id, accepter_id=accepter.id
    )
    if contact is not None:
        if contact.is_established:
            raise exceptions.ContactAlreadyExist()
        else:
            raise exceptions.ContactWaitForAccepting()

    contact_in.created_at = datetime.now()
    contact_in.requester_id = current_user.id
    contact_in.accepter_id = accepter.id
    contact = await crud.contact.create(pg_session, contact_in)

    channel_id = contact_utils.generate_contact_requests_channel(partner_id)
    pushed_message = {
        **contact.to_dict(exclude=["requester", "accepter"]),
        # "friend": accepter.to_dict(),
    }
    await broadcast.publish(
        channel=channel_id,
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
    contact = await crud.contact.get(pg_session, id)
    if contact is None:
        raise exceptions.ResourceNotFound(resource_type="Contact", id=id)

    current_user = info.context.get("current_user")
    if current_user.id not in [contact.requester_id, contact.accepter_id]:
        raise exceptions.NotAuthorized()
    contact = await crud.contact.update(pg_session, db_obj=contact, obj_in=contact_in)
    return Contact(
        **contact.to_dict(exclude=["requester", "accepter"]), friend=contact.requester
    )


async def resolver_delete_contact(
    info: Info, id: strawberry.ID
) -> ContactDeleteSuccess:
    pg_session = info.context["pg_session"]
    id = int(id)
    contact = await crud.contact.get(pg_session, id)
    if contact is None:
        raise exceptions.ResourceNotFound(resource_type="Contact", id=id)

    current_user = info.context.get("current_user")
    if current_user.id not in [contact.requester_id, contact.accepter_id]:
        raise exceptions.NotAuthorized()
    await crud.contact.delete(pg_session, id=id)
    return ContactDeleteSuccess(message="Deleted Successfully!")


@strawberry.type
class ContactQuery:
    contacts: list[Contact] = strawberry.field(
        resolver=resolver_get_contacts,
        permission_classes=[utils.IsAuthenticatedUser],
    )
    contactRequests: list[Contact] = strawberry.field(
        resolver=resolver_get_contact_request,
        permission_classes=[utils.IsAuthenticatedUser],
    )
    contact: Contact = strawberry.field(
        resolver=resolver_get_contact,
        permission_classes=[utils.IsAuthenticatedUser],
    )


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
        async with broadcast.subscribe(channel=channel_id) as subcriber:
            async for event in subcriber:
                data = json_util.loads(event.message)
                yield Contact(**data)
