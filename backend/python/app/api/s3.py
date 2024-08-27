from fastapi import FastAPI, File, UploadFile, HTTPException, APIRouter
from app.services.s3_service import S3Service
from app.core.config import settings

router = APIRouter()

# Instancia del servicio S3
s3_service = S3Service(
    aws_access_key_id= settings.aws_access_key_id,
    aws_secret_access_key= settings.aws_secret_access_key,
    bucket_name= settings.s3_bucket_name
)


@router.post("/upload-song")
async def upload_song(file: UploadFile = File(...)):
    try:
        song_url = s3_service.upload_file(file.file, file.filename, 'canciones')
        
        if song_url is None:
            raise HTTPException(status_code=500, detail="Error al subir el archivo")
        
        return {"url": song_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al subir el archivo: {str(e)}")
    
@router.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    try:
        image_url = s3_service.upload_file(file.file, file.filename, 'fotos')
        
        if image_url is None:
            raise HTTPException(status_code=500, detail="Error al subir el archivo")
        
        return {"url": image_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al subir el archivo: {str(e)}")