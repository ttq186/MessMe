from datetime import datetime
from enum import Enum
from uuid import UUID

import strawberry
from pydantic import BaseModel


@strawberry.enum
class FileTypeEnum(Enum):
    IMAGE = "IMAGE"
    AUDIO = "AUDIO"
    VIDEO = "VIDEO"
    COMPRESS = "COMPRESS"


class AttachmentBase(BaseModel):
    id: int
    user_id: UUID | None
    file_type: FileTypeEnum | None
    created_at: datetime | None


@strawberry.experimental.pydantic.type(model=AttachmentBase, all_fields=True)
class Attachment:
    pass
