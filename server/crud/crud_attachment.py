from .base import CRUDBase
from models import Attachment
from schemas import AttachmentCreate, AttachmentUpdate


class CRUDAttachment(CRUDBase[Attachment, AttachmentCreate, AttachmentUpdate]):
    pass


attachment = CRUDAttachment(Attachment)
