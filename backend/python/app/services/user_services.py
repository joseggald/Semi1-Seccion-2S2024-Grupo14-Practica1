from fastapi import HTTPException, status
from app.core.security import verify_password, get_password_hash, generate_token, decode_token
from app.db.instances.users import get_user_by_email, create_user, get_user_by_id
from app.db.instances.users_session import set_access_token, get_active_session, delete_user_session

class UserService:
    def create_user(self, user_data, db):
        db_user = get_user_by_email(db, email=user_data.email)
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        hashed_password = get_password_hash(user_data.password)
        
        create_user(db, user_data, hashed_password)
        
        return {"message": "Created user successfully"}
  
    def login(self, user_data, db):
        db_user = get_user_by_email(db, email=user_data.email)
        if not db_user:
            raise HTTPException(status_code=400, detail="No user found with this email")
        if not verify_password(user_data.password, db_user.hashed_password):
            raise HTTPException(status_code=400, detail="Incorrect password")
        
        token = generate_token(db_user.id, db_user.email)
        set_access_token(db, db_user.id, token)
        return {"token": token} 

    def verify_session(self, token, db):
        session = get_active_session(db, token)
        if not session:
            raise HTTPException(status_code=400, detail="Invalid session")
        return {"message": "Session is valid"}
    
    def logout(self, token, db):
        session = get_active_session(db, token)
        if not session:
            raise HTTPException(status_code=400, detail="Invalid session")
        delete_user_session(db, token)
        return {"message": "Logged out successfully"}
    
    def get_user_byId(self, token, db):
        user_id, email = decode_token(token)    
        db_user = get_user_by_id(db, user_id)
        if not db_user:
            raise HTTPException(status_code=400, detail="No user found with this id")
        return {"first_name": db_user.first_name, "last_name": db_user.last_name, "email": db_user.email, "role_id": db_user.role_id, "photo_url": db_user.photo_url, "date_of_birth": db_user.date_of_birth}