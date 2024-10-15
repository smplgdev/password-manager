from sqlalchemy import Integer, Column, String
from sqlalchemy.orm import relationship

from app.db.base import Base
from app.models.mixins import TimeStampMixin


class User(Base, TimeStampMixin):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)

    passwords = relationship("Password", back_populates="user")
