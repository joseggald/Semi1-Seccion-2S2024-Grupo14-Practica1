from pydantic import BaseModel
from datetime import datetime

class UserSessionBase(BaseModel):
    user_id: int
    token: str
    created_at: datetime
    expires_at: datetime

    class Config:
        from_attributes = True
        
class SessionData(BaseModel):
    token: str