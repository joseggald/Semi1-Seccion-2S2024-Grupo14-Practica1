from pydantic import BaseModel

class FavoriteBase(BaseModel):
    user_id: int
    song_id: int

class FavoriteCreate(FavoriteBase):
    pass

class FavoriteRead(FavoriteBase):
    class Config:
        orm_mode = True
