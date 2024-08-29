import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Cambia esto al endpoint correcto si es necesario

export const uploadImageToS3 = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_URL}/s3/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Asegúrate de que devuelves toda la respuesta para que puedas acceder al 'url' correctamente
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw error;
  }
};
export const uploadSongToS3 = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_URL}/s3/upload-song`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw error;
  }
};
