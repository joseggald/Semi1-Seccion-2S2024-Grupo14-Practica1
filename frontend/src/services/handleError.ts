import { useNavigate } from 'react-router-dom';
export const handleError = (error: any) => {
  const navigate = useNavigate();

  if (error.response) {
    const statusCode = error.response.status;

    if (statusCode === 401) {
      navigate('/login');
    } else if (statusCode === 500) {
      console.error('Internal server error');
    }
  } else {
    console.error('An unexpected error occurred:', error);
  }

  throw error; 
};
export const handleErrorSongs = (error: any) => {
  if (error.response) {
    const statusCode = error.response.status;

    if (statusCode === 500) {
      console.error('Internal server error');
    }
  } else {
    console.error('An unexpected error occurred:', error);
  }

  throw error;
};