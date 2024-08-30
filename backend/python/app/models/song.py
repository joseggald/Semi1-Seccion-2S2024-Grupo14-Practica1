from sqlalchemy import Column, String, ForeignKey, BigInteger, Interval,Table
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
    playlists = relationship("Playlist", secondary="playlist_songs", back_populates="songs")

class Playlist(Base):
    __tablename__ = "playlists"
    id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(BigInteger, index=True)
    name = Column(String, nullable=False)
    photo = Column(String)
    description = Column(String)    
    songs = relationship("Song", secondary="playlist_songs", back_populates="playlists")


playlist_songs = Table(
    'playlist_songs', Base.metadata,
    Column('playlist_id', BigInteger, ForeignKey('playlists.id', ondelete="CASCADE"), primary_key=True),
    Column('song_id', BigInteger, ForeignKey('songs.id', ondelete="CASCADE"), primary_key=True)
)