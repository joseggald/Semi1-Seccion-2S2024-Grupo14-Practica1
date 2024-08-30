from fastapi import FastAPI, File, UploadFile, HTTPException, APIRouter, Depends
from app.schemas.generalSchemas import MessageResponse, SongCreate, SongRead
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.song_services import SongService
from fastapi.responses import JSONResponse
from fastapi import HTTPException, status
from typing import List


router = APIRouter()

@router.post("/create", response_model=MessageResponse)
def create_song(song: SongCreate, db: Session = Depends(get_db)):
    song_service = SongService()
    
    try:
        create_song_response = song_service.create_song(song, db)
        response = JSONResponse(content=create_song_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
    
@router.put("/update/{id}", response_model=MessageResponse)
def update_song(id:int, song: SongCreate, db: Session = Depends(get_db)):
    song_service = SongService()
    
    try:
        update_song_response = song_service.update_song(id, song, db)
        response = JSONResponse(content=update_song_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.delete("/delete/{id}", response_model=MessageResponse)
def update_song(id:int, db: Session = Depends(get_db)):
    song_service = SongService()
    
    try:
        delete_song_response = song_service.delete_song(id, db)
        response = JSONResponse(content=delete_song_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.get("/get_by_Id/{id}", response_model=SongRead)
def get_song_by_id(id:int, db: Session = Depends(get_db)):
    song_service = SongService()
    
    try:
        get_song_response = song_service.get_song_by_id(id, db)
        return get_song_response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.get("/get_all_admin", response_model=List[SongRead])
def get_songs(db: Session = Depends(get_db)):
    song_service = SongService()
    
    try:
        get_songs_response = song_service.get_songs(db)
        return get_songs_response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")