from app.db.instances.songs import create_song, update_song, get_song_by_id,delete_song, get_songs
from fastapi import HTTPException, status
from app.schemas.generalSchemas import SongRead



class SongService:
    def create_song(self,song_data,db):
        created_song = create_song(db,song_data)
        return {"message":"Song created successfully"}

    def update_song(self,id,song_data,db):
        db_song = get_song_by_id(db, id=id)
        if not db_song:
            raise HTTPException(status_code=400, detail="Song not found")
        update_song(db,id,song_data)
        return {"message":"Song updated successfully"}
    
    def delete_song(self,id,db):
        db_song = get_song_by_id(db, id=id)
        if not db_song:
            raise HTTPException(status_code=400, detail="Song not found")
        delete_song(db,id)
        return {"message":"Song deleted successfully"}
    
    def get_song_by_id(self,id,db) -> SongRead:
        db_song = get_song_by_id(db, id=id)
        if not db_song:
            raise HTTPException(status_code=400, detail="Song not found")
        
        song_dict = {
        "id": db_song.id,
        "name": db_song.name,
        "photo": db_song.photo,
        "duration": str(db_song.duration),  # Convert timedelta to string
        "artist_name": db_song.artist_name,
        "mp3_file": db_song.mp3_file
        }
        return SongRead(**song_dict)
    
    def get_songs(self,db) -> SongRead:
        db_songs = get_songs(db)
        if not db_songs:
            raise HTTPException(status_code=404, detail="No songs found")
       
        songs_list = []
        for db_song in db_songs:
            song_dict = {
                "id": db_song.id,
                "name": db_song.name,
                "photo": db_song.photo,
                "duration": str(db_song.duration),
                "artist_name": db_song.artist_name,
                "mp3_file": db_song.mp3_file
            }
            songs_list.append(SongRead(**song_dict))
        return songs_list
