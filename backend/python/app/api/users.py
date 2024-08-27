from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.userSchema import UserCreate, UserLogin,UserGet
from app.schemas.generalSchemas import MessageResponse
from app.schemas.usersessionSchema import SessionData
from app.db.session import get_db
from app.services.user_services import UserService
from fastapi import Cookie
from fastapi.responses import JSONResponse
router = APIRouter()

@router.post("/login", response_model=MessageResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    user_service = UserService()
    login_response = user_service.login(user, db)
    response = JSONResponse(content={"message": "Logged in successfully"})
    response.set_cookie(key="session_token", value=login_response["token"], httponly=True, secure=True, samesite="Strict")
    return response

@router.post("/register", response_model=MessageResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    user_service = UserService()
    return user_service.create_user(user,db)

@router.post("/verify_session", response_model=MessageResponse)
def verify_session(session_token: str = Cookie(None), db: Session = Depends(get_db)):
    user_service = UserService()
    return user_service.verify_session(session_token, db)

@router.post("/logout", response_model=MessageResponse)
def logout(session_token: str = Cookie(None), db: Session = Depends(get_db)):
    user_service = UserService()
    response = user_service.logout(session_token, db)
    
    response = JSONResponse(content={"message": "Logged out successfully"})
    response.delete_cookie("session_token")

    return response

@router.get("/get_user_byId/", response_model=UserGet)
def get_user_byId(session_token: str = Cookie(None), db: Session = Depends(get_db)):
    user_service = UserService()
    return user_service.get_user_byId(session_token, db)

