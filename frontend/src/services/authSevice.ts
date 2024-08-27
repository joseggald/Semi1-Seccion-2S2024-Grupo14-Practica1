import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/login`, {
    email,
    password,
  }, {
    withCredentials: true, 
  });

  return response.data;
};

export const register = async (newUser:any) => {
  console.log(newUser);
  const response = await axios.post(`${API_URL}/users/register`,{
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email: newUser.email,
    role_id: newUser.role_id,
    password: newUser.password,
    photo_url: newUser.photo_url,
    date_of_birth: newUser.date_of_birth,
  });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_URL}/users/logout`, {}, {
    withCredentials: true,
  });
  return response.data;
};

export const verifySession = async () => {
  const response = await axios.post(`${API_URL}/users/verify_session`, {}, {
    withCredentials: true,
  });
  return response.data;
};
