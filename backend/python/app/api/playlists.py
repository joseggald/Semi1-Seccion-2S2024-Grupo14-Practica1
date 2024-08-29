from fastapi import FastAPI, File, UploadFile, HTTPException, APIRouter, Depends
from app.schemas.generalSchemas import MessageResponse, PlaylistCreate, Add_Delete_Song
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.playlist_services import PlaylistService
from fastapi.responses import JSONResponse
from fastapi import HTTPException, status, Cookie
from typing import List

router = APIRouter()

@router.post("/playlist", response_model=MessageResponse)
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
    
@router.put("/playlist/{id}", response_model=MessageResponse)
def update_playlist(id:int, playlist: PlaylistCreate, session_token: str = Cookie(None), db: Session = Depends(get_db)):
    playlist_service = PlaylistService()
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    try:
        update_playlist_response = playlist_service.update_playlist(id,playlist, db)
        response = JSONResponse(content=update_playlist_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.delete("/playlist/{id}", response_model=MessageResponse)
def delete_playlist(id:int, session_token: str = Cookie(None), db: Session = Depends(get_db)):
    playlist_service = PlaylistService()
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    try:
        update_playlist_response = playlist_service.delete_playlist(id, db)
        response = JSONResponse(content=update_playlist_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.put("/playlist/song/{id}", response_model=MessageResponse)
def add_song_playlist(id:int,song:Add_Delete_Song, session_token: str = Cookie(None), db: Session = Depends(get_db)):
    playlist_service = PlaylistService()
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    try:
        update_playlist_response = playlist_service.playlist_add_song(id,song, db)
        response = JSONResponse(content=update_playlist_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")

@router.delete("/playlist/song/{id}", response_model=MessageResponse)
def delete_song_playlist(id:int,song:Add_Delete_Song, session_token: str = Cookie(None), db: Session = Depends(get_db)):
    playlist_service = PlaylistService()
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    try:
        update_playlist_response = playlist_service.playlist_delete_song(id,song, db)
        response = JSONResponse(content=update_playlist_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.get("/playlist", response_model=MessageResponse)
def get_playlists(session_token: str = Cookie(None), db: Session = Depends(get_db)):
    playlist_service = PlaylistService()
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    try:
        update_playlist_response = playlist_service.get_playlists(db)
        response = JSONResponse(content=update_playlist_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.get("/playlist/{id}", response_model=MessageResponse)
def get_playlists_by_id(id:int,session_token: str = Cookie(None), db: Session = Depends(get_db)):
    playlist_service = PlaylistService()
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    try:
        update_playlist_response = playlist_service.get_playlist_by_id(id,db)
        response = JSONResponse(content=update_playlist_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.get("/playlist/user", response_model=MessageResponse)
def get_playlists_user(id:int,session_token: str = Cookie(None), db: Session = Depends(get_db)):
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