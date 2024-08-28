from pydantic import BaseModel
from datetime import timedelta
import re
class MessageResponse(BaseModel):
    message: str

class SongCreate(BaseModel):
    name: str
    photo: str
    duration: str
    artist_name: str
    mp3_file: str

    # @root_validator(pre=True)
    # def parse_duration(cls, values):
    #     duration = values.get('duration')
    #     if isinstance(duration, str):
    #         # Parse duration from string format '1 day, 2:00:00'
    #         match = re.match(r'(?:(\d+) day[s]?, )?(\d+):(\d+):(\d+)', duration)
    #         if match:
    #             days = int(match.group(1) or 0)
    #             hours = int(match.group(2))
    #             minutes = int(match.group(3))
    #             seconds = int(match.group(4))
    #             values['duration'] = timedelta(days=days, hours=hours, minutes=minutes, seconds=seconds)
    #         else:
    #             raise ValueError(f'Invalid timedelta string format: {duration}')
    #     return values

class SongUpdate(BaseModel):
    id: int
    name: str
    photo: str
    duration: timedelta
    artist_name: str
    mp3_file: str

class SongRead(SongCreate):
    id: int

    class Config:
        orm_mode = True
        json_encoders = {
            timedelta: lambda v: str(v)  # Convert timedelta to string
        }