from app.db.instances.favorite import Favorite
from app.db.session import get_db
from app.schemas.favoriteSchema import FavoriteRead
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.core.security import decode_token  # Importa la función decode_token

class FavoriteService:
    def create_favorite(self, token: str, favorite_data, db: Session):
        user_id, email = decode_token(token)  # Decodifica el token para obtener el user_id
        db_favorite = Favorite(
            user_id=user_id,  # Utiliza el user_id decodificado
            song_id=favorite_data.song_id
        )
        db.add(db_favorite)
        db.commit()
        db.refresh(db_favorite)
        return {"message": "Favorito creado con éxito", "favorite": db_favorite}

    def delete_favorite(self, token: str, song_id: int, db: Session):
        user_id, email = decode_token(token)  # Decodifica el token para obtener el user_id
        db_favorite = db.query(Favorite).filter(Favorite.user_id == user_id, Favorite.song_id == song_id).first()
        if not db_favorite:
            raise HTTPException(status_code=400, detail="Favorite not found")
        db.delete(db_favorite)
        db.commit()
        return {"message": "Favorito eliminado exitosamente"}

    def get_favorites_by_user(self, token: str, db: Session):
        user_id, email = decode_token(token)  # Decodifica el token para obtener el user_id
        db_favorites = db.query(Favorite).filter(Favorite.user_id == user_id).all()
        if not db_favorites:
            raise HTTPException(status_code=404, detail="No hay favoritos encontrados en este usuario")
        
        favorites_list = []
        for db_favorite in db_favorites:
            favorite_dict = {
                "user_id": db_favorite.user_id,
                "song_id": db_favorite.song_id
            }
            favorites_list.append(FavoriteRead(**favorite_dict))
        
        return favorites_list
