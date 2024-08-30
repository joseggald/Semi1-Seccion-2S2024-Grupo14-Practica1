import axios from 'axios';
import { handleError } from './handleError';

const API_URL = 'http://18.208.115.67:8000';

export const getUser = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log(token);
    const response = await axios.post(`${API_URL}/users/get_user_byId`,{ token: token }, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updatePhoto = async (photoUrl: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/users/update_photo`, { photo_url: photoUrl,token:token }, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};



