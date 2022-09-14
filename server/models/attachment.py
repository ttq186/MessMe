import enum

from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String
from sqlalchemy.sql import func

from db.base_class import Base

# from sqlalchemy.orm import relationship



class FileTypeEnum(enum.Enum):
    IMAGE = "IMAGE"
    AUDIO = "AUDIO"
    VIDEO = "VIDEO"
    COMPRESS = "COMPRESS"


class Attachment(Base):
    __tablename__ = "attachment"

    id = Column(Integer, primary_key=True)
    user_id = Column(String, ForeignKey("user.id", ondelete="CASCADE"), index=True)
    file_type = Column(
        Enum(FileTypeEnum), nullable=False, default=FileTypeEnum.COMPRESS
    )
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )

    # user = relationship("User", back_populates="attachments")
