from sqlalchemy.orm import Session
from app.models.song import Playlist, Song
from app.schemas.generalSchemas import PlaylistCreate

def get_playlist_by_id(db: Session, id: int):
    return db.query(Playlist).filter(Playlist.id == id).first()

def get_playlists(db: Session):
    return db.query(Playlist).all()

def get_playlist_by_user(db: Session, user_id:int):
    return db.query(Playlist).filter(Playlist.user_id == user_id).all()


def create_playlist(db:Session, playlist:PlaylistCreate,user_id:int):
    db_playlist = Playlist(
        user_id=user_id,
        name=playlist.name,
        photo=playlist.photo,
        description=playlist.description,
    )
    db.add(db_playlist)
    db.commit()
    db.refresh(db_playlist)
    return db_playlist


def update_playlist(db:Session,id:int, playlist:PlaylistCreate):
    db_playlist = db.query(Playlist).filter(Playlist.id == id).first()
    if not db_playlist:
        return None
    db_playlist.name = playlist.name
    db_playlist.description = playlist.description
    db_playlist.photo = playlist.photo
    db.commit()
    db.refresh(db_playlist)
    return db_playlist

def delete_playlist(db:Session,id:int):
    db_playlist = db.query(Playlist).filter(Playlist.id == id).first()
    if not db_playlist:
        return None
    db.delete(db_playlist)
    db.commit()
    return db_playlist

def playlist_add_song(db:Session,playlist_id:int, song_id:int):
    db_playlist = db.query(Playlist).filter(Playlist.id == playlist_id).first()
    if not db_playlist:
        return None
    db_song = db.query(Song).filter(Song.id == song_id).first()
    if not db_song:
        return None
    db_playlist.songs.append(song_id)
    db.commit()
    db.refresh(db_playlist)
    return db_playlist

def playlist_delete_song(db:Session,playlist_id:int, song_id:int):
    db_playlist = db.query(Playlist).filter(Playlist.id == playlist_id).first()
    if not db_playlist:
        return None
    db_song = db.query(Song).filter(Song.id == song_id).first()
    if not db_song:
        return None
    db_playlist.songs.remove(song_id)
    db.commit()
    db.refresh(db_playlist)
    return db_playlist