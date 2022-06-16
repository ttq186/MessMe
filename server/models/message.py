from sqlalchemy import Column, ForeignKey, Integer, Text, DateTime, String
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from db.base_class import Base


class Message(Base):
    __tablename__ = "message"

    id = Column(Integer, primary_key=True)
    user_id = Column(String, ForeignKey("user.id", ondelete="CASCADE"), index=True)
    conversation_id = Column(
        Integer, ForeignKey("conversation.id", ondelete="CASCADE"), index=True
    )
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="messages")
    attachments = relationship("Attachment", back_populates="message", lazy="selectin")
