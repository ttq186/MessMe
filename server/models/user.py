from sqlalchemy import Column, Date, String, DateTime, Boolean, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from db.base_class import Base
import utils


class User(Base):
    __tablename__ = "user"

    id = Column(String, primary_key=True, default=utils.generate_uuid())
    username = Column(String(length=20))
    email = Column(String, index=True, nullable=False, unique=True)
    password = Column(String)
    cover_img_url = Column(String)
    description = Column(Text)
    is_female = Column(Boolean, default=False)
    date_of_birth = Column(Date)
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    has_confirmed_email = Column(Boolean, default=False)
    is_admin = Column(Boolean, default=False)

    conversations = relationship("Conversation", back_populates="user", lazy="selectin")
    messages = relationship("Message", back_populates="user", lazy="selectin")
    attachments = relationship("Attachment", back_populates="user", lazy="selectin")
