import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  }, {
    withCredentials: true, 
  });

  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`, {}, {
    withCredentials: true,
  });
  return response.data;
};

export const verifySession = async () => {
  const response = await axios.post(`${API_URL}/verify_session`, {}, {
    withCredentials: true,
  });
  return response.data;
};
