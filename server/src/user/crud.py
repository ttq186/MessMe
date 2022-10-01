from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.crud import BaseCRUD
from src.user.models import User as UserModel
from src.user.schemas import User as UserSchema


class UserCRUD(BaseCRUD[UserModel, UserSchema]):
    async def get_by_email(self, session: AsyncSession, email: str) -> UserModel | None:
        user = await session.execute(select(UserModel).where(UserModel.email == email))
        return user.scalars().first()

    async def get_multi(
        self,
        session: AsyncSession,
        skip: int = 0,
        limit: str | None = None,
        search: str | None = None,
    ) -> list[UserModel]:
        if search:
            stmt = select(UserModel).where(
                (UserModel.email.ilike(f"%{search}%"))
                | (UserModel.username.ilike(f"%{search}%"))
            )
        stmt = stmt.offset(skip).limit(limit)
        result = await session.execute(stmt)
        return result.scalars().all()


user_crud = UserCRUD(UserModel)
