import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authSevice';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-500 ease-in-out opacity-0 translate-y-10 animate-fade-in-up">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Login
        </h2>
        {error && <div className="mb-4 text-red-500 animate-pulse">{error}</div>}
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
          <Button text="Sign In" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
