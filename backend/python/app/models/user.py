from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, BigInteger, Date
from sqlalchemy.orm import relationship
from app.db.base import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(BigInteger, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_on = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_on = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    role_id = Column(BigInteger, ForeignKey("roles.id", ondelete="SET NULL"))
    photo_url = Column(String)
    date_of_birth = Column(Date)  # Aquí usamos 'Date' de SQLAlchemy, no 'datetime.date'

    sessions = relationship("UserSession", back_populates="user")
    role = relationship("Role", back_populates="users")

class Role(Base):
    __tablename__ = 'roles'

    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String)

    users = relationship("User", back_populates="role")

    