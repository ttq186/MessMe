from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .base import CRUDBase
from models import User as UserModel
from schemas import User as UserSchema


class CRUDUser(CRUDBase[UserModel, UserSchema]):
    async def get_by_email(self, session: AsyncSession, email: str) -> UserModel | None:
        user = await session.execute(select(UserModel).where(UserModel.email == email))
        return user.scalars().first()


user = CRUDUser(UserModel)
