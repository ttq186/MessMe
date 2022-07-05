from datetime import datetime
from bson.objectid import ObjectId

import strawberry
from strawberry.schema_directive import Location


ObjectIdType = strawberry.scalar(ObjectId, serialize=str)


@strawberry.schema_directive(locations=[Location.OBJECT])
@strawberry.type
class Message:
    _id: ObjectIdType = strawberry.field(name="_id")
    sender_id: str
    channel_id: str
    content: str
    created_at: datetime


@strawberry.input
class MessageCreate:
    sender_id: str
    content: str
    created_at: datetime
    channel_id: str | None


@strawberry.schema_directive(locations=[Location.OBJECT])
@strawberry.input
class MessageUpdate:
    _id: ObjectIdType = strawberry.field(name="_id")
    content: str


@strawberry.type
class MessageDeleteSuccess:
    message: str
