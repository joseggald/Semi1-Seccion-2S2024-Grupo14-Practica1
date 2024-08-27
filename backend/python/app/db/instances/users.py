from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.userSchema import UserCreate

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate, password: str):
    db_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        role_id=user.role_id,
        hashed_password=password,
        photo_url=user.photo_url,
        date_of_birth=user.date_of_birth,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_id(db: Session, id: int):
    return db.query(User).filter(User.id == id).first()