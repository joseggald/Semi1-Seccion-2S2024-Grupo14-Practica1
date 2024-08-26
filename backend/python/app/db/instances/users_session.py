# db/instances/user_sessions.py
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.models.user_session import UserSession 
from app.core.security import decode_token

def set_access_token(db: Session, user_id: int, token: str, expiration_minutes: int = 30):
    expiration_time = datetime.utcnow() + timedelta(minutes=expiration_minutes)
    session = UserSession(user_id=user_id, token=token, expires_at=expiration_time)
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

def get_active_session(db: Session, token: str):
    user_id, email = decode_token(token)
    print(user_id, email)
    return db.query(UserSession).filter(UserSession.user_id == user_id, UserSession.token == token).first()
 
def delete_user_session(db: Session, token: str):
    user_id, email = decode_token(token)
    db.query(UserSession).filter(UserSession.user_id == user_id,UserSession.token== token).delete()
    db.commit()
