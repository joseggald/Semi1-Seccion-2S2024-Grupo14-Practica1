import axios from 'axios';
import { handleErrorSongs } from './handleError';
import { uploadImageToS3 } from './s3Service'; // Importa la función de subida a S3

const API_URL = 'http://18.208.115.67:8000';

export const createPlaylist = async (playlistData: any, imageFile: File | null) => {
  try {
    let imageUrl = '';
    const token = localStorage.getItem('token');
    if (imageFile) {
      const uploadResponse = await uploadImageToS3(imageFile);
      imageUrl = uploadResponse.url; 
    }

    const response = await axios.post(`${API_URL}/playlists/create`, {
      ...playlistData,
      photo: imageUrl,
      token: token 
    }, { withCredentials: true });

    return response.data;
  } catch (error) {
    handleErrorSongs(error);
    throw error;
  }
};

export const getAllPlaylists = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/playlists/get-all-user`,{token:token},{ withCredentials: true });
    return response.data;
  } catch (error) {
    handleErrorSongs(error);
    throw error;
  }
};

export const getSongsInPlaylist = async (playlistId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/playlists/get-songs`, { playlist_id: playlistId,token:token }, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleErrorSongs(error);
    throw error;
  }
};

export const deletePlaylist = async (playlistId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/playlists/delete`, { data: { playlist_id: playlistId,token:token }, withCredentials: true });
    return response.data;
  } catch (error) {
    handleErrorSongs(error);
    throw error;
  }
};

export const deleteSongFromPlaylist = async (playlistId: string, songId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/playlists/delete-song`, { data: { playlist_id: playlistId, song_id: songId,token:token }, withCredentials: true });
    return response.data;
  } catch (error) {
    handleErrorSongs(error);
    throw error;
  }
};

export const addToPlaylist = async (playlistId: string, songId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/playlists/add-song`, { playlist_id: playlistId, song_id: songId, token:token}, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleErrorSongs(error);
    throw error;
  }
};