import axios from 'axios';
import { handleError } from './handleError';
import { getUser } from './userService';

const API_URL = 'http://18.208.115.67:8000';

export const login = async (email: string, password: string) => {
  try {
    const data=await axios.post(
      `${API_URL}/users/login`,
      { email, password },
      { withCredentials: true }
    );
    localStorage.setItem('token', data.data.token);
    const user_data = await getUser();
    return user_data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const register = async (newUser: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/register`,
      { ...newUser },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;  
  }
};

export const verifySession = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/users/verify_session`,
      { token: localStorage.getItem('token') },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;  
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/users/logout`, {token:token}, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error; 
  }
};
