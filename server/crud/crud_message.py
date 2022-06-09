from .base import CRUDBase
from models import Message
from schemas import MessageCreate, MessageUpdate


class CRUDMessage(CRUDBase[Message, MessageCreate, MessageUpdate]):
    pass


message = CRUDMessage(Message)
