from motor.motor_asyncio import AsyncIOMotorDatabase
from schemas import MessageBase


class CRUDMessage:
    async def get_multi(self, mongo_db: AsyncIOMotorDatabase) -> list[MessageBase]:
        messages = await mongo_db["messages"].find().to_list(None)
        return messages

    async def get(self, mongo_db: AsyncIOMotorDatabase, id: int) -> MessageBase:
        message = await mongo_db["messages"].find_one({"_id": id})
        return message

    async def delete(self, mongo_db: AsyncIOMotorDatabase, id: int) -> bool:
        deleted_message = await mongo_db["messages"].delete_one({"_id": id})
        if deleted_message.deleted_count == 1:
            return True
        return False


message = CRUDMessage()
