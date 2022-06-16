from .base import CRUDBase
from models import Message as MessageModel
from schemas import Message as MessageSchema


class CRUDMessage(CRUDBase[MessageModel, MessageSchema]):
    pass


message = CRUDMessage(MessageModel)
