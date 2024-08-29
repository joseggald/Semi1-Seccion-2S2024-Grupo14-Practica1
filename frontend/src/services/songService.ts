import axios from 'axios';
import { handleError } from './handleError';

const API_URL = 'http://localhost:8000';

export const getAllSongs = async () => {
  try {
    const response = await axios.get(`${API_URL}/songs/get_all`, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const createSong = async (songData: any) => {
  try {
    const response = await axios.post(`${API_URL}/songs/create`, songData, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteSong = async (songId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/songs/delete/${songId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateSong = async (songId: string, updatedData: any) => {
  try {
    const response = await axios.put(`${API_URL}/songs/update/${songId}`, updatedData, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
