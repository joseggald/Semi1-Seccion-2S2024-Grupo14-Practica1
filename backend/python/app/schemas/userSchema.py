from pydantic import BaseModel, EmailStr
from datetime import date as Date

class UserLogin(BaseModel):
    email: EmailStr  
    password: str  

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    role_id: int
    password: str
    photo_url: str
    date_of_birth: Date

class UserGet(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    role_id: int
    photo_url: str
    date_of_birth: Date

class UpdatePhotoRequest(BaseModel):
    photo_url: str