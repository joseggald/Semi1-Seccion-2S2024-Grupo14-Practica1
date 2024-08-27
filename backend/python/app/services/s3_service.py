import boto3
from botocore.exceptions import NoCredentialsError

class S3Service:
    def __init__(self, aws_access_key_id, aws_secret_access_key, bucket_name, region_name='us-east-1'):
        self.s3 = boto3.client('s3', 
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key,
            region_name=region_name
        )
        self.bucket_name = bucket_name
        
    def upload_file(self, file_obj, file_name, folder):
        try:
            self.s3.upload_fileobj(file_obj, self.bucket_name, f"{folder}/{file_name}")
            return f"https://{self.bucket_name}.s3.amazonaws.com/{folder}/{file_name}"
        except NoCredentialsError:
            return None
        except Exception as e:
            print(f"Error al subir el archivo: {e}")
            return None