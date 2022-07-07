from datetime import datetime

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


async def resolver_get_contacts(info: Info) -> list[Contact]:
    current_user = info.context["current_user"]
    contacts = await crud.contact.get_multi_by_user_or_friend_id(
        info.context["pg_session"], user_id=current_user.id
    )
    return contacts


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
    contact_in.last_interaction_at = datetime.now()
    contact_in.friend_id = user.id
    contact_in.user_id = current_user.id
    contact = await crud.contact.create(pg_session, contact_in)
    return Contact(**contact.to_dict(), friend=user)


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
