from typing import Any, Dict, Generic, TypeVar

from fastapi.encoders import jsonable_encoder
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from strawberry.type import StrawberryType

from db.base import Base

ModelType = TypeVar("ModelType", bound=Base)
SchemaType = TypeVar("SchemaType", bound=StrawberryType)


class CRUDBase(Generic[ModelType, SchemaType]):
    def __init__(self, model: ModelType):
        """
        CRUD object with default Create, Read, Update, Delete methods.

        **Parameters**
        * `model`: SQLAlchemy model class
        * `schema`: Strawberry schema class
        """
        self._model = model

    async def get(self, session: AsyncSession, id: str | int) -> ModelType | None:
        result = await session.execute(select(self._model).where(self._model.id == id))
        return result.scalars().first()

    async def get_multi(
        self, session: AsyncSession, skip: int = 0, limit: str | None = None
    ) -> list[ModelType]:
        stmt = select(self._model).offset(skip).limit(limit)
        result = await session.execute(stmt)
        return result.scalars().all()

    async def create(self, session: AsyncSession, obj_in: SchemaType) -> ModelType:
        db_obj = self._model(**obj_in.__dict__)
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj

    async def update(
        self,
        session: AsyncSession,
        db_obj: ModelType,
        obj_in: SchemaType | Dict[str, Any],
    ) -> ModelType:
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.__dict__
        for field in obj_data:
            if update_data.get(field) is not None:
                setattr(db_obj, field, update_data[field])
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj

    async def delete(self, session: AsyncSession, id: str | int) -> ModelType:
        db_obj = await self.get(session, id)
        await session.delete(db_obj)
        await session.commit()
        return db_obj
