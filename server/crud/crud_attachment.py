from .base import CRUDBase
from models import Attachment as AttachmentModel
from schemas.attachment import Attachment as AttachmentSchema


class CRUDAttachment(CRUDBase[AttachmentModel, AttachmentSchema]):
    pass


attachment = CRUDAttachment(AttachmentModel)
