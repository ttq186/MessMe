from typing import Generic, TypeVar, Dict, Any

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.expression import select

from db.base import Base

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: ModelType):
        """
        CRUD object with default Create, Read, Update, Delete methods.


        **Parameter**
        * `model`: SQLAlchemy model class
        * `schema`: Pydantic model class
        """
        self._model = model

    async def get(self, session: AsyncSession, id: str | int) -> ModelType | None:
        result = await session.execute(select(self._model).where(self._model.id == id))
        return result.scalar_one_or_none()

    async def get_multi(
        self, session: AsyncSession, skip: int = 0, limit: str | None = None
    ) -> list[ModelType]:
        stmt = select(self._model).offset(skip).limit(limit)
        result = await session.execute(stmt)
        return result.scalars().all()

    async def get_multi_by_owner(
        self,
        session: AsyncSession,
        owner_id: str,
        skip: int = 0,
        limit: str | None = None,
    ) -> list[ModelType]:
        pass

    async def create(
        self, session: AsyncSession, obj_in: CreateSchemaType
    ) -> ModelType:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self._model(**obj_in_data)
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj

    async def update(
        self,
        session: AsyncSession,
        db_obj: ModelType,
        obj_in: UpdateSchemaType | Dict[str, Any],
    ) -> ModelType:
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            if update_data.get(field):
                setattr(db_obj, field, update_data[field])
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj

    async def remove(self, session: AsyncSession, id: str | int) -> ModelType:
        db_obj = await self.get(session, id)
        await session.delete(db_obj)
        await session.commit()
        return db_obj
