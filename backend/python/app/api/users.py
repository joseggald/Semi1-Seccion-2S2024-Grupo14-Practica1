from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.schemas.userSchema import UserCreate, UserLogin,UserGet, UpdatePhotoRequest
from app.schemas.generalSchemas import MessageResponse
from app.schemas.usersessionSchema import SessionData
from app.db.session import get_db
from app.services.user_services import UserService
from fastapi import Cookie, HTTPException, status
from fastapi.responses import JSONResponse

router = APIRouter()

class TokenRequest(BaseModel):
    token: str

@router.post("/login", response_model=MessageResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    user_service = UserService()
    
    try:
        print("usuario: ",user)
        login_response = user_service.login(user, db)
        response = JSONResponse(content={"message": "Logged in successfully", "token": login_response["token"]})
        response.set_cookie(key="session_token", value=login_response["token"], httponly=True, secure=True, samesite="Strict")
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        print(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")

@router.post("/register", response_model=MessageResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    user_service = UserService()
    return user_service.create_user(user,db)

@router.post("/verify_session", response_model=MessageResponse)
def verify_session(request: TokenRequest, db: Session = Depends(get_db)):
    user_service = UserService()
    
    if not request.token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")

    try:
        return user_service.verify_session(request.token, db)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")

@router.post("/logout", response_model=MessageResponse)
def logout(request: TokenRequest, db: Session = Depends(get_db)):
    user_service = UserService()
    
    if not request.token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    
    try:
        user_service.logout(request.token, db)
        response = JSONResponse(content={"message": "Logged out successfully"})
        response.delete_cookie("session_token")
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")


@router.post("/get_user_byId", response_model=UserGet)
def get_user_byId(request: TokenRequest, db: Session = Depends(get_db)):
    user_service = UserService()  
    if not request.token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    
    try:
        return user_service.get_user_byId(request.token, db)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log the exception here if needed
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")

@router.put("/update_photo", response_model=MessageResponse)
def update_photo(request: UpdatePhotoRequest, requestToken: TokenRequest, db: Session = Depends(get_db)):
    user_service = UserService()
    if not requestToken.token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not provided")
    try:
        return user_service.update_photo(requestToken.token, request.photo_url, db)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")