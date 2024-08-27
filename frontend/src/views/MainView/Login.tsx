import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import ImageCarousel from '../../components/ImageCarousel';
import svg1 from '../../assets/login/forms1.svg';
import logoApp from '../../assets/login/logo_app.jpg';
import { login } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      loginUser();
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-gradient-to-r from-[#111111] via-[#22222b] to-[#333842] relative overflow-hidden">
      <div className="w-1/2 flex flex-col justify-center items-center z-10 bg-opacity-80 backdrop-blur-lg p-10">
        <img src={svg1} alt="" className="fixed px-10 w-auto opacity-30" />

        <div className="flex items-center mb-4">
          <div className="flex items-center justify-center bg-opacity-70 backdrop-blur-md p-5 rounded-full shadow-2xl mr-4">
            <img
              src={logoApp}
              alt="Logo"
              className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
            />
          </div>
          <div className="flex items-center">
            <h1 className="text-6xl font-extrabold text-white animate-bounce">
              Soundstream
            </h1>
          </div>
        </div>

        <div className="bg-[#2b2e37] bg-opacity-90 backdrop-blur-md p-10 rounded-lg shadow-2xl max-w-md w-full flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            Login
          </h2>
          {error && (
            <div className="mb-6 text-red-500 text-center animate-pulse">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <FormInput
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
            <Button text="Sign In" type="submit" className="mt-4" />
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400">Don't have an account?</p>
            <button
              onClick={() => navigate('/register')} // Navegar al registro
              className="text-accent hover:underline mt-2"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>

      <ImageCarousel />
    </div>
  );
};

export default Login;
