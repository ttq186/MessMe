from datetime import datetime

from bson.objectid import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase

from .schemas import Message, MessageCreate, MessageUpdate, ObjectIdType


class MessageCRUD:
    async def get_multi(self, mongo_db: AsyncIOMotorDatabase) -> list[Message]:
        messages = await mongo_db["messages"].find().to_list(None)
        return [Message(**message) for message in messages]

    async def get_multi_by_channel_id(
        self, mongo_db: AsyncIOMotorDatabase, channel_id: str
    ) -> list[Message]:
        messages = (
            await mongo_db["messages"].find({"channel_id": channel_id}).to_list(None)
        )
        return [Message(**message) for message in messages]

    async def get_most_recent_by_channel_id(
        self, mongo_db: AsyncIOMotorDatabase, channel_id: str
    ) -> Message | None:
        message = (
            await mongo_db["messages"]
            .find({"channel_id": channel_id})
            .sort("created_at", -1)
            .limit(1)
            .to_list(1)
        )
        return Message(**message[0]) if message else None

    async def get(self, mongo_db: AsyncIOMotorDatabase, id: ObjectId) -> Message | None:
        message = await mongo_db["messages"].find_one({"_id": id})
        return Message(**message) if message is not None else None

    async def create(
        self, mongo_db: AsyncIOMotorDatabase, message_in: MessageCreate
    ) -> Message:
        message_in.created_at = datetime.utcnow()
        new_message = await mongo_db["messages"].insert_one(message_in.__dict__)
        created_message = await mongo_db["messages"].find_one(
            {"_id": ObjectId(new_message.inserted_id)}
        )
        return Message(**created_message)

    async def update(
        self,
        mongo_db: AsyncIOMotorDatabase,
        message_in: MessageUpdate,
    ) -> Message:
        await mongo_db["messages"].update_one(
            {"_id": message_in._id}, {"$set": message_in.__dict__}
        )
        message = await mongo_db["messages"].find_one({"_id": message_in._id})
        return Message(**message)

    async def delete(self, mongo_db: AsyncIOMotorDatabase, id: ObjectIdType) -> bool:
        deleted_message = await mongo_db["messages"].delete_one({"_id": id})
        return deleted_message.deleted_count == 1


message_crud = MessageCRUD()
