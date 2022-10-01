from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.contact.models import Contact as ContactModal
from src.contact.schemas import Contact as ContactSchema
from src.crud import BaseCRUD


class ContactCRUD(BaseCRUD[ContactModal, ContactSchema]):
    async def get_multi_by_requester_or_accepter_id(
        self, session: AsyncSession, user_id: str, is_established: bool | None = None
    ) -> list[ContactModal]:
        stmt = select(ContactModal).where(
            (ContactModal.requester_id == user_id)
            | (ContactModal.accepter_id == user_id)
        )
        if is_established is not None:
            stmt = stmt.where(ContactModal.is_established == is_established)
        result = await session.execute(stmt)
        return result.scalars().all()

    async def get_by_requester_and_accepter_id(
        self, session: AsyncSession, requester_id: str, accepter_id: str
    ) -> ContactModal | None:
        stmt = select(ContactModal).where(
            ContactModal.requester_id.in_([requester_id, accepter_id]),
            ContactModal.accepter_id.in_([requester_id, accepter_id]),
        )
        result = await session.execute(stmt)
        return result.scalars().first()

    async def get_multi_by_accepter_id(
        self,
        session: AsyncSession,
        accepter_id: str,
        is_established: bool | None = None,
    ) -> list[ContactModal]:
        stmt = select(ContactModal).where((ContactModal.accepter_id == accepter_id))
        if is_established is not None:
            stmt = stmt.where(ContactModal.is_established == is_established)
        result = await session.execute(stmt)
        return result.scalars().all()


contact_crud = ContactCRUD(ContactModal)
