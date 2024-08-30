import axios from 'axios';
import { handleError, handleErrorSongs } from './handleError';

const API_URL = 'http://18.208.115.67:8000';

export const getAllSongs = async () => {
  try {
    const response = await axios.get(`${API_URL}/songs/get_all_admin`, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleErrorSongs(error);
    throw error;
  }
};


export const createSong = async (songData: any) => {
  try {
    const response = await axios.post(`${API_URL}/songs/create`, songData, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleErrorSongs(error);
    throw error;
  }
};

export const deleteSong = async (songId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/songs/delete/${songId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleErrorSongs(error);
    throw error;
  }
};

export const updateSong = async (songId: string, updatedData: any) => {
  try {
    const response = await axios.put(`${API_URL}/songs/update/${songId}`, updatedData, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleErrorSongs(error);
    throw error;
  }
};

export const getMyFavorites = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/songs/get_all_user`,{token:token},{ withCredentials: true });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const addFavorite = async (songId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/songs/add_to_favorites`, { song_id: songId, token:token }, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const removeFavorite = async (songId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/songs/remove_from_favorites`, { data: { song_id: songId, token:token }, withCredentials: true });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};