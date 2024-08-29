from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.favoriteSchemas import FavoriteCreate, FavoriteRead
from app.db.session import get_db
from app.services.favorite_services import FavoriteService
from fastapi.responses import JSONResponse
from typing import List

router = APIRouter()

@router.post("/create", response_model=FavoriteRead)
def create_favorite(favorite: FavoriteCreate, db: Session = Depends(get_db)):
    favorite_service = FavoriteService()
    
    try:
        create_favorite_response = favorite_service.create_favorite(favorite, db)
        response = JSONResponse(content=create_favorite_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.delete("/delete/{user_id}/{song_id}", response_model=FavoriteRead)
def delete_favorite(user_id: int, song_id: int, db: Session = Depends(get_db)):
    favorite_service = FavoriteService()
    
    try:
        delete_favorite_response = favorite_service.delete_favorite(user_id, song_id, db)
        response = JSONResponse(content=delete_favorite_response)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")

@router.get("/get_by_user/{user_id}", response_model=List[FavoriteRead])
def get_favorites_by_user(user_id: int, db: Session = Depends(get_db)):
    favorite_service = FavoriteService()
    
    try:
        get_favorites_response = favorite_service.get_favorites_by_user(user_id, db)
        return get_favorites_response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")