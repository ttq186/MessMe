from sqlalchemy import Column, ForeignKey, String, Integer
from sqlalchemy.orm import relationship

from db.base_class import Base


class Conversation(Base):
    __tablename__ = "conversation"

    id = Column(Integer, primary_key=True)
    user_id = Column(String, ForeignKey("user.id", ondelete="CASCADE"), index=True)

    user = relationship("User", back_populates="conversations")
