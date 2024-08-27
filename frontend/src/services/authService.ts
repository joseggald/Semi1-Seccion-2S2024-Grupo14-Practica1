import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    }, {
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const register = async (newUser: any) => {
  try {
    
    const response = await axios.post(`${API_URL}/users/register`, {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      role_id: newUser.role_id,
      password: newUser.password,
      photo_url: newUser.photo_url,
      date_of_birth: newUser.date_of_birth,
    },{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const verifySession = async () => {
  try {
    const response = await axios.post(`${API_URL}/users/verify_session`, {}, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/users/logout`, {}, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para manejar errores
const handleError = (error: any) => {
  const navigate = useNavigate();

  if (error.response) {
    const statusCode = error.response.status;

    if (statusCode === 401) {
      // Redirigir al login si no está autenticado
      navigate('/login');
    } else if (statusCode === 500) {
      // Manejar el error 500 (puedes mostrar un mensaje de error al usuario)
      console.error('Internal server error');
      // Aquí podrías mostrar una alerta o redirigir a una página de error
    }
  } else {
    console.error('An unexpected error occurred:', error);
  }

  throw error; // Puedes lanzar el error nuevamente si deseas que sea manejado más arriba
};
