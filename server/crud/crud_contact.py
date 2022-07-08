from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .base import CRUDBase
from models import Contact as ContactModal
from schemas import Contact as ContactSchema


class CRUDContact(CRUDBase[ContactModal, ContactSchema]):
    async def get_multi_by_requester_or_accepter_id(
        self, session: AsyncSession, user_id: str
    ) -> list[ContactModal]:
        result = await session.execute(
            select(ContactModal).where(
                (ContactModal.requester_id == user_id)
                | (ContactModal.accepter_id == user_id)
            )
        )
        return result.scalars().all()

    async def get_by_user_and_friend_id(
        self, session: AsyncSession, user_id: str, friend_id: str
    ) -> ContactModal | None:
        result = await session.execute(
            select(ContactModal).where(
                ContactModal.user_id.in_([user_id, friend_id]),
                ContactModal.friend_id.in_([user_id, friend_id]),
            )
        )
        return result.scalars().first()


contact = CRUDContact(ContactModal)
