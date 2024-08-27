from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

# Cargar las variables del archivo .env
load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = os.getenv("PROJECT_NAME")
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    ALGORITHM: str = os.getenv("ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 129600 
    aws_access_key_id: str = os.getenv("AWS_ACCESS_KEY_ID")
    aws_secret_access_key: str = os.getenv("AWS_SECRET_ACCESS_KEY")
    s3_bucket_name: str = os.getenv("S3_BUCKET_NAME")

settings = Settings()
