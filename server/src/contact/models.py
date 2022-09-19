from sqlalchemy import (Boolean, Column, DateTime, ForeignKey, Integer, String,
                        Text)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from src.models import BaseModel


class Contact(BaseModel):
    __tablename__ = "contact"

    id = Column(Integer, primary_key=True)
    requester_id = Column(String, ForeignKey("user.id", ondelete="CASCADE"), index=True)
    accepter_id = Column(String, ForeignKey("user.id", ondelete="CASCADE"), index=True)
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    invitation_message = Column(Text)
    is_established = Column(Boolean, default=False)

    requester = relationship("User", lazy="selectin", foreign_keys=[requester_id])
    accepter = relationship("User", lazy="selectin", foreign_keys=[accepter_id])
