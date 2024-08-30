from fastapi import FastAPI, File, UploadFile, HTTPException, APIRouter, Depends
from app.schemas.generalSchemas import MessageResponse, PlaylistCreate, Add_Delete_Song,PlaylistGet,PlaylistId,SongRead
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.playlist_services import PlaylistService
from fastapi.responses import JSONResponse
from fastapi import HTTPException, status, Cookie
from typing import List

router = APIRouter()

@router.post("/create", response_model=MessageResponse)
def create_playlist(playlist: PlaylistCreate, session_token: str = Cookie(None), db: Session = Depends(get_db)):
    playlist_service = PlaylistService()
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    try:
        create_playlist_response = playlist_service.create_playlist(session_token,playlist, db)
        response = JSONResponse(content=create_playlist_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.put("/update", response_model=MessageResponse)
def update_playlist(playlist: PlaylistGet, session_token: str = Cookie(None), db: Session = Depends(get_db)):
    playlist_service = PlaylistService()
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    try:
        update_playlist_response = playlist_service.update_playlist(PlaylistGet.id,playlist, db)
        response = JSONResponse(content=update_playlist_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.delete("/playlist", response_model=MessageResponse)
def delete_playlist(playlist:PlaylistGet, session_token: str = Cookie(None), db: Session = Depends(get_db)):
    playlist_service = PlaylistService()
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    try:
        update_playlist_response = playlist_service.delete_playlist(playlist.id, db)
        response = JSONResponse(content=update_playlist_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.post("/add-song", response_model=MessageResponse)
def add_song_playlist(data:Add_Delete_Song, session_token: str = Cookie(None), db: Session = Depends(get_db)):
    playlist_service = PlaylistService()
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    try:
        update_playlist_response = playlist_service.playlist_add_song(data.playlist_id,data.song_id, db)
        response = JSONResponse(content=update_playlist_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")

@router.delete("/delete-song", response_model=MessageResponse)
def delete_song_playlist(data:Add_Delete_Song, session_token: str = Cookie(None), db: Session = Depends(get_db)):
    playlist_service = PlaylistService()
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    try:
        update_playlist_response = playlist_service.playlist_delete_song(data.playlist_id,data.song_id, db)
        response = JSONResponse(content=update_playlist_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.get("/get-all-admin", response_model=List[PlaylistGet])
def get_playlists(session_token: str = Cookie(None), db: Session = Depends(get_db)):
    playlist_service = PlaylistService()
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    try:
        playlists = playlist_service.get_playlists(db)  # Assuming this returns a list of Playlist instances
        return playlists
        return JSONResponse(content=response_data)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
#trabajar en esta
@router.get("/get-songs", response_model=List[SongRead])
def get_playlists_by_id(playlist:PlaylistId,session_token: str = Cookie(None), db: Session = Depends(get_db)):
    playlist_service = PlaylistService()
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    try:
        return playlist_service.get_playlist_by_id(playlist.playlist_id,db).songs
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.get("/get-all-user", response_model=List[PlaylistGet])
def get_playlists_user(session_token: str = Cookie(None), db: Session = Depends(get_db)):
    playlist_service = PlaylistService()
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    try:
        update_playlist_response = playlist_service.get_playlist_by_user(session_token,db)
        response = JSONResponse(content=update_playlist_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")