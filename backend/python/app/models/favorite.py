from sqlalchemy import Column, ForeignKey, BigInteger
from app.db.base import Base

class Favorite(Base):
    __tablename__ = "favorites"
    
    user_id = Column(BigInteger, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True, nullable=False)
    song_id = Column(BigInteger, ForeignKey("songs.id", ondelete="CASCADE"), primary_key=True, nullable=False)