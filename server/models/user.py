from uuid import uuid4

from sqlalchemy import Column, Date, String, DateTime, Boolean, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from db.base_class import Base


class User(Base):
    __tablename__ = "user"

    id = Column(String, primary_key=True, default=uuid4)
    username = Column(String(20))
    email = Column(String, index=True, nullable=False, unique=True)
    password = Column(String)
    avatar_url = Column(String)
    description = Column(Text)
    phone_number = Column(String(15))
    is_female = Column(Boolean, default=False)
    date_of_birth = Column(Date)
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    has_confirmed_email = Column(Boolean, default=False)
    is_admin = Column(Boolean, default=False)

    conversations = relationship("Conversation", back_populates="user", lazy="selectin")
    attachments = relationship("Attachment", back_populates="user", lazy="selectin")
