from passlib.context import CryptContext
from hashlib import sha256
from datetime import datetime, timedelta
import jwt as pyjwt
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def generate_token(user_id: int, email: str) -> str:
    expiration = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = pyjwt.encode({"sub": f"{user_id}|{email}", "exp": expiration}, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return token

def decode_token(token: str):
    try:
        payload = pyjwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        
        sub = payload.get("sub")
        expiration = payload.get("exp")
        
        if sub and expiration:
            user_id, email = sub.split("|")
            user_id = int(user_id)
            
            current_time = datetime.utcnow()
            expiration_time = datetime.utcfromtimestamp(expiration)
            
            if current_time > expiration_time:
                raise ValueError("Token has expired")
            
            return user_id, email 
        else:
            raise ValueError("Invalid token: 'sub' or 'exp' field missing")
    except pyjwt.ExpiredSignatureError:
        raise ValueError("Token has expired")
    except pyjwt.InvalidTokenError:
        raise ValueError("Invalid token")