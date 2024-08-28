import axios from 'axios';
import { handleError } from './handleError';

const API_URL = 'http://localhost:8000';

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/get_user_byId`, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
