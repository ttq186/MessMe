from models import Attachment as AttachmentModel
from schemas.attachment import Attachment as AttachmentSchema

from .base import CRUDBase


class CRUDAttachment(CRUDBase[AttachmentModel, AttachmentSchema]):
    pass


attachment = CRUDAttachment(AttachmentModel)
