import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import logoApp from '../../assets/login/logo_app.jpg';
import { register } from '../../services/authSevice';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(2);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      role_id: role,
      photo_url: photo ? URL.createObjectURL(photo) : '',
      date_of_birth: dateOfBirth,
    };

    try {
      await register(newUser);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111111] to-[#333842] flex flex-col justify-center items-center p-3">
      <div className="text-center mb-4">
        <div className="flex justify-center items-center">
          <img src={logoApp} alt="Logo" className="w-20 h-20 object-cover rounded-full border-2 border-gray-300" />
          <h1 className="ml-4 text-6xl font-extrabold text-white">Soundstream Register</h1>
        </div>
      </div>

      <div className=" bg-[#2b2e37] w-full max-w-6xl bg-opacity-90 backdrop-blur-md p-6 rounded-lg shadow-2xl flex">
        <div className="w-1/2 pr-4">
          <FormInput
            label="First Name"
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FormInput
            label="Last Name"
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <FormInput
            label="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="mb-6">
            <label htmlFor="role" className="text-gray-400 text-sm mb-1 block">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(Number(e.target.value))}
              className="block w-full px-4 py-4 bg-inputBg border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 ease-in-out"
              style={{ backgroundColor: 'rgba(34, 40, 49, 1)' }}
            >
              <option value={1}>Admin</option>
              <option value={2}>User</option>
            </select>
          </div>
        </div>
        <div className="w-1/2 pl-4">
          <FormInput
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormInput
            label="Date of Birth"
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <div className="mb-6">
          <label htmlFor="photo" className="text-gray-400 text-sm mb-1 block">Profile Picture</label>
            <input
              type="file"
              id="photo"
              onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
              className="block py-2 w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
        </div>
      </div>

      <div className="w-1/3 max-w-6xl mt-6">
        <Button text="Register" type="submit" className="w-full" />
      </div>
      <div className="mt-4 text-center">
        <p className="text-gray-400">Already have an account? <button
          onClick={() => navigate('/')}
          className="text-accent hover:underline"
        >
          Login Now
        </button></p>
      </div>
    </div>
  );
};

export default Register;
