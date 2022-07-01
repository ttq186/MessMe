from datetime import datetime
from bson.objectid import ObjectId

import strawberry
from strawberry.schema_directive import Location


ObjectIdType = strawberry.scalar(ObjectId, serialize=str)


@strawberry.schema_directive(locations=[Location.OBJECT])
@strawberry.type
class MessageBase:
    _id: ObjectIdType = strawberry.field(name="_id")
    sender_id: str
    receiver_id: str
    content: str
    created_at: datetime


@strawberry.input
class MessageCreate:
    sender_id: str
    receiver_id: str
    content: str
    created_at: datetime


@strawberry.schema_directive(locations=[Location.OBJECT])
@strawberry.input
class MessageUpdate:
    _id: ObjectIdType = strawberry.field(name="_id")
    content: str


class MessageOut(MessageBase):
    pass


@strawberry.type
class MessageDeleteSuccess:
    message: str
