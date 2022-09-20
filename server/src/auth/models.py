import uuid

from sqlalchemy import Boolean, Column, Date, DateTime, String, Text
from sqlalchemy.sql import func
from src.models import BaseModel

# from sqlalchemy.orm import relationship


class User(BaseModel):
    __tablename__ = "user"

    id = Column(String, primary_key=True, default=uuid.uuid4)
    username = Column(String(20))
    email = Column(String, index=True, nullable=False, unique=True)
    password = Column(String)
    avatar_url = Column(String)
    description = Column(Text)
    phone_number = Column(String(15))
    is_female = Column(Boolean)
    date_of_birth = Column(Date)
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    has_confirmed_email = Column(Boolean, default=False)
    is_admin = Column(Boolean, default=False)

    # attachments = relationship("Attachment", back_populates="user", lazy="selectin")
