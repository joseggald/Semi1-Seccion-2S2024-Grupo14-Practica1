from fastapi import FastAPI
from app.api import users, s3,songs,playlists
from app.db import base, session
from app.core.config import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI( title = settings.PROJECT_NAME)
origins = [
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(s3.router, prefix="/s3", tags=["Songs"])
app.include_router(songs.router, prefix="/songs", tags={"Songs"})
app.include_router(playlists.router, prefix="/playlists", tags={"Playlists"})

@app.on_event("startup")
def on_startup():
    base.Base.metadata.create_all(bind=session.engine)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
