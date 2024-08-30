import React, { useState } from 'react';
import profilePlaceholder from '../../../assets/profile/profile-placeholder.jpg'; 
import profileBackground from '../../../assets/profile/cover.png'; 
import { useAuth } from '../../../context/AuthContext';
import { uploadImageToS3 } from '../../../services/s3Service';
import { updatePhoto } from '../../../services/userService';

const MyProfile: React.FC = () => {
  const { user, logoutUser } = useAuth();
  const [profileImage, setProfileImage] = useState(user?.photo_url || profilePlaceholder);
  const [error, setError] = useState('');

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const imageFile = e.target.files[0];
        const imageResponse = await uploadImageToS3(imageFile);

        if (imageResponse.url) {
          setProfileImage(imageResponse.url);

          await updatePhoto(imageResponse.url);


          const updatedUser = {
            ...user,
            photo_url: imageResponse.url,
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } else {
          setError('Failed to upload image');
        }
      } catch (err) {
        console.error('Failed to upload image:', err);
        setError('Failed to upload image.');
        console.log(error);
      }
    }
  };

  const userRole = user?.role_id === 1 ? 'Administrator' : 'User';

  return (
    <div className="flex flex-col items-start text-white relative" style={{ maxWidth: '1130px', padding: '20px' }}>
      {/* Fondo con efecto blur */}
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${profileBackground})`, filter: 'blur(20px)' }}></div>

      {/* Contenido del perfil */}
      <div className="relative z-10 p-6 bg-[#22222b]/80 backdrop-blur-lg rounded-xl w-full">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-sm text-gray-400">Manage your personal information and update your profile picture.</p>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-4 border-gray-600"
            />
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleProfileImageChange}
              title="Change Profile Picture"
            />
          </div>
          <div>
            <span className="block text-lg font-semibold">{`${user?.first_name} ${user?.last_name}`}</span>
            <span className="block text-sm text-gray-400">{user?.email}</span>
            <span className="block text-xs text-gray-400 font-medium mt-1">{userRole}</span>
          </div>
          <button
            onClick={logoutUser}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg py-1.5 px-3 transition-transform transform hover:scale-105 duration-150 text-sm"
          >
            Logout
          </button>
        </div>

        <div className="bg-[#333842]/80 p-4 rounded-lg shadow-lg space-y-3">
          <div className="grid grid-cols-2 gap-x-2 items-center">
            <span className="text-sm font-semibold text-gray-400">First Name</span>
            <span className="text-sm text-white">{user?.first_name}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 items-center">
            <span className="text-sm font-semibold text-gray-400">Last Name</span>
            <span className="text-sm text-white">{user?.last_name}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 items-center">
            <span className="text-sm font-semibold text-gray-400">Date of Birth</span>
            <span className="text-sm text-white">{user?.date_of_birth}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 items-center">
            <span className="text-sm font-semibold text-gray-400">Email</span>
            <span className="text-sm text-white">{user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
