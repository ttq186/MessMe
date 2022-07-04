from datetime import datetime
from bson.objectid import ObjectId

from motor.motor_asyncio import AsyncIOMotorDatabase

from schemas import MessageOut, MessageCreate, MessageUpdate, ObjectIdType


class CRUDMessage:
    async def get_multi(self, mongo_db: AsyncIOMotorDatabase) -> list[MessageOut]:
        messages = await mongo_db["messages"].find().to_list(None)
        return [MessageOut(**message) for message in messages]

    async def get_multi_by_owner(
        self, mongo_db: AsyncIOMotorDatabase, user_id: str
    ) -> list[MessageOut]:
        messages = await mongo_db["messages"].find({"user_id": user_id}).to_list(None)
        return [MessageOut(**message) for message in messages]

    async def get(self, mongo_db: AsyncIOMotorDatabase, id: ObjectId) -> dict:
        message = await mongo_db["messages"].find_one({"_id": id})
        return MessageOut(**message)

    async def create(
        self, mongo_db: AsyncIOMotorDatabase, message_in: MessageCreate
    ) -> MessageOut:
        message_in.created_at = datetime.utcnow()
        new_message = await mongo_db["messages"].insert_one(message_in.__dict__)
        created_message = await mongo_db["messages"].find_one(
            {"_id": ObjectId(new_message.inserted_id)}
        )
        return MessageOut(**created_message)

    async def update(
        self,
        mongo_db: AsyncIOMotorDatabase,
        message_in: MessageUpdate,
    ) -> MessageOut:
        await mongo_db["messages"].update_one(
            {"_id": message_in._id}, {"$set": message_in.__dict__}
        )
        message = await mongo_db["messages"].find_one({"_id": message_in._id})
        return message

    async def delete(self, mongo_db: AsyncIOMotorDatabase, id: ObjectIdType) -> bool:
        deleted_message = await mongo_db["messages"].delete_one({"_id": id})
        return deleted_message.deleted_count == 1


message = CRUDMessage()
