from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, BigInteger, Date, Float, Interval
from sqlalchemy.orm import relationship
from app.db.base import Base
from datetime import datetime, timedelta


class Song(Base):
    __tablename__ = "songs"
    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String, nullable=False)
    photo = Column(String)
    duration = Column(Interval, nullable=False)    
    artist_name = Column(String, nullable=False)
    mp3_file = Column(String, nullable=False)
