from sqlalchemy import Column, String, Integer, ForeignKey

from db.base_class import Base


class Contact(Base):
    __tablename__ = "contact"

    id = Column(Integer, primary_key=True)
    user_id = Column(
        String, ForeignKey("user.id", ondelete="CASCADE"), index=True, nullable=False
    )
    friend_id = Column(
        String, ForeignKey("user.id", ondelete="CASCADE"), index=True, nullable=False
    )
