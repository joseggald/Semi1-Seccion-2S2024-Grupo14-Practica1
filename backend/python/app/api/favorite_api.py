from fastapi import APIRouter, Depends, HTTPException, status, Cookie
from sqlalchemy.orm import Session
from app.schemas.favoriteSchemas import FavoriteCreate, FavoriteRead
from app.db.session import get_db
from app.services.favorite_services import FavoriteService
from fastapi.responses import JSONResponse
from typing import List

router = APIRouter()

@router.post("/create", response_model=FavoriteRead)
def create_favorite(favorite: FavoriteCreate, session_token: str = Cookie(None), db: Session = Depends(get_db)):
    favorite_service = FavoriteService()
    
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token no proporcionado")
    
    try:
        create_favorite_response = favorite_service.create_favorite(session_token, favorite, db)
        response = JSONResponse(content=create_favorite_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.delete("/delete/{song_id}", response_model=FavoriteRead)
def delete_favorite(song_id: int, session_token: str = Cookie(None), db: Session = Depends(get_db)):
    favorite_service = FavoriteService()
    
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token no proporcionado")
    
    try:
        delete_favorite_response = favorite_service.delete_favorite(session_token, song_id, db)
        response = JSONResponse(content=delete_favorite_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")

@router.get("/get_by_user", response_model=List[FavoriteRead])
def get_favorites_by_user(session_token: str = Cookie(None), db: Session = Depends(get_db)):
    favorite_service = FavoriteService()
    
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token no proporcionado")
    
    try:
        get_favorites_response = favorite_service.get_favorites_by_user(session_token, db)
        return get_favorites_response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
