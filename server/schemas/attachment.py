from datetime import datetime
from enum import Enum

from .base import CamelModel


class FileTypeEnum(Enum):
    IMAGE = "IMAGE"
    AUDIO = "AUDIO"
    VIDEO = "VIDEO"
    COMPRESS = "COMPRESS"


class AttachmentBase(CamelModel):
    user_id: str | None = None
    message_id: int | None = None
    file_type: FileTypeEnum | None = None
    created_at: datetime | None = None


class AttachmentCreate(AttachmentBase):
    file_type: FileTypeEnum


class AttachmentUpdate(AttachmentBase):
    pass


class AttachmentOut(AttachmentBase):
    id: int

    class Config:
        orm_mode = True
