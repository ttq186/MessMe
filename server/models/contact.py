from sqlalchemy import Column, String, Integer, ForeignKey, Text, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from db.base_class import Base


class Contact(Base):
    __tablename__ = "contact"

    id = Column(Integer, primary_key=True)
    user_id = Column(String, ForeignKey("user.id", ondelete="CASCADE"), index=True)
    friend_id = Column(String, ForeignKey("user.id", ondelete="CASCADE"), index=True)
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    invitation_message = Column(Text)
    last_interaction_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )

    friend = relationship("User", lazy="selectin", foreign_keys=[friend_id])
