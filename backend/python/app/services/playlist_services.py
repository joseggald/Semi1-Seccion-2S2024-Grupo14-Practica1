from app.db.instances.playlists import *
from fastapi import HTTPException, status
from app.core.security import decode_token



class PlaylistService:
    def create_playlist(self,token,playlist_data,db):
        user_id, email = decode_token(token)
        created_playlist = create_playlist(db,playlist_data,user_id)
        return {"message":"Playlist created successfully"}
    
    def update_playlist(self,id,playlist_data,db):
        updated_playlist = update_playlist(db,id,playlist_data)
        if not updated_playlist:
            raise HTTPException(status_code=400, detail="Playlist not found")
        return {"message":"Playlist updated successfully"}
    
    def delete_playlist(self,id,db):
        deleted_playlist = delete_playlist(db,id)
        if not deleted_playlist:
            raise HTTPException(status_code=400, detail="Playlist not found")
        return {"message":"Playlist deleted successfully"}
    
    def playlist_add_song(self,playlist_id,song_id,db):
        modified_playlist = playlist_add_song(db,playlist_id,song_id)
        if not modified_playlist:
            raise HTTPException(status_code=400, detail="Playlist or song not found")
        return {"message":"Song added to playlist"}
    
    def playlist_delete_song(self,playlist_id,song_id,db):
        modified_playlist = playlist_delete_song(db,playlist_id,song_id)
        if not modified_playlist:
            raise HTTPException(status_code=400, detail="Playlist or song not found")
        return {"message":"Song removed from playlist"}
    
    def get_playlists(self,db):
        db_playlists = get_playlists(db)
        if not db_playlists:
            raise HTTPException(status_code=400, detail="Something went wrong")
        return db_playlists

    def get_playlist_by_id(self,id,db):
        db_playlist = get_playlist_by_id(db,id)
        if not db_playlist:
            raise HTTPException(status_code=400, detail="Playlist not found")
        return db_playlist
    
    def get_playlist_by_user(self,token,db):
        user_id, email = decode_token(token)
        db_playlists = get_playlist_by_user(db,user_id)
        if not db_playlists:
            raise HTTPException(status_code=400, detail="Something went wrong")
        return db_playlists
        