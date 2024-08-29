from sqlalchemy.orm import Session
from app.models.favorite import Favorite
from app.schemas.favoriteSchemas import FavoriteCreate

def get_favorite_by_user_and_song(db: Session, user_id: int, song_id: int):
    return db.query(Favorite).filter(Favorite.user_id == user_id, Favorite.song_id == song_id).first()

def get_favorites_by_user(db: Session, user_id: int):
    return db.query(Favorite).filter(Favorite.user_id == user_id).all()

def create_favorite(db: Session, favorite: FavoriteCreate):
    db_favorite = Favorite(
        user_id=favorite.user_id,
        song_id=favorite.song_id
    )
    db.add(db_favorite)
    db.commit()
    db.refresh(db_favorite)
    return db_favorite

def delete_favorite(db: Session, user_id: int, song_id: int):
    db_favorite = db.query(Favorite).filter(Favorite.user_id == user_id, Favorite.song_id == song_id).first()
    
    if not db_favorite:
        return None
    
    db.delete(db_favorite)
    db.commit()
    return db_favorite