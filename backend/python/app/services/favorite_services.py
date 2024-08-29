from app.db.instances.favorite import Favorite
from app.db.session import get_db
from app.schemas.favoriteSchemas import FavoriteRead
from sqlalchemy.orm import Session
from fastapi import HTTPException

class FavoriteService:
    def create_favorite(self, favorite_data, db: Session):
        db_favorite = Favorite(
            user_id=favorite_data.user_id,
            song_id=favorite_data.song_id
        )
        db.add(db_favorite)
        db.commit()
        db.refresh(db_favorite)
        return {"message": "Favorite created successfully", "favorite": db_favorite}

    def delete_favorite(self, user_id: int, song_id: int, db: Session):
        db_favorite = db.query(Favorite).filter(Favorite.user_id == user_id, Favorite.song_id == song_id).first()
        if not db_favorite:
            raise HTTPException(status_code=400, detail="Favorite not found")
        db.delete(db_favorite)
        db.commit()
        return {"message": "Favorite deleted successfully"}

    def get_favorites_by_user(self, user_id: int, db: Session):
        db_favorites = db.query(Favorite).filter(Favorite.user_id == user_id).all()
        if not db_favorites:
            raise HTTPException(status_code=404, detail="No favorites found for this user")
        
        favorites_list = []
        for db_favorite in db_favorites:
            favorite_dict = {
                "user_id": db_favorite.user_id,
                "song_id": db_favorite.song_id
            }
            favorites_list.append(FavoriteRead(**favorite_dict))
        
        return favorites_list