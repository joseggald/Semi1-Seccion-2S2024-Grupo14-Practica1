from fastapi import FastAPI
from app.api import users
from app.db import base, session
from app.core.config import settings

app = FastAPI( title = settings.PROJECT_NAME)

app.include_router(users.router, prefix="/users", tags=["Users"])

@app.on_event("startup")
def on_startup():
    base.Base.metadata.create_all(bind=session.engine)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
