from sqlalchemy.orm import Session
from app.models.song import Song
from app.schemas.generalSchemas import SongCreate, SongUpdate


def get_song_by_id(db: Session, id: int):
    return db.query(Song).filter(Song.id == id).first()

def get_songs(db: Session):
    return db.query(Song).all()

def create_song(db:Session, song:SongCreate):
    db_song = Song(
        name=song.name,
        photo=song.photo,
        duration=song.duration,
        artist_name=song.artist_name,
        mp3_file=song.mp3_file
    )
    db.add(db_song)
    db.commit()
    db.refresh(db_song)
    return db_song

def update_song(db:Session,id:int, song:SongCreate):
    db_song = db.query(Song).filter(Song.id == id).first()
    
    if not db_song:
        return None
    
    db_song.name = song.name
    db_song.photo = song.photo
    db_song.duration = song.duration
    db_song.artist_name = song.artist_name
    db_song.mp3_file = song.mp3_file

    db.commit()
    db.refresh(db_song)

    return db_song

def delete_song(db:Session, id:int):
    db_song = db.query(Song).filter(Song.id == id).first()
    
    if not db_song:
        return None
    
    db.delete(db_song)
    db.commit()
    return db_song