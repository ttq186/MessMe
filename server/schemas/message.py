from datetime import datetime
from bson.objectid import ObjectId

import strawberry
from pydantic import BaseModel, Field


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validata

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class MessageBase(BaseModel):
    _id: PyObjectId = Field(default_factory=PyObjectId)
    user_id: str | None
    conversation_id: int | None
    content: str | None
    created_at: datetime | None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class MessageUpdateBase(MessageBase):
    pass


class MessageCreateBase(MessageBase):
    pass


class MessageOutBase(MessageBase):
    class Config:
        orm_mode = True


@strawberry.experimental.pydantic.type(model=MessageBase, all_fields=True)
class Message:
    pass


@strawberry.experimental.pydantic.type(model=MessageOutBase, all_fields=True)
class MessageOut:
    pass


@strawberry.experimental.pydantic.input(model=MessageUpdateBase, all_fields=True)
class MessageUpdate:
    pass


@strawberry.experimental.pydantic.input(model=MessageCreateBase, all_fields=True)
class MessageCreate:
    pass
