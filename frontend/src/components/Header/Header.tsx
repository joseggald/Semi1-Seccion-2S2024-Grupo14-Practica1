import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import NavItem from './NavItem';
import ProfileImage from './ProfileImage';
import home from '../../assets/header/home.svg';
import discover from '../../assets/header/discover.svg';
import search from '../../assets/header/search.svg';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const [photo, setPhoto] = useState('');
  const { roleId } = useAuth();
  const [username, setUsername] = useState('');
  
  const fetchUser = () => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.email) {
          setUsername(parsedUser.email);
          setPhoto(parsedUser.photo_url);
        }
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  };

  useEffect(() => {
    fetchUser();

    // Add event listener to listen to changes in localStorage
    const handleStorageChange = () => {
      fetchUser();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="flex justify-between items-center w-full px-6 py-6 bg-[#111111] shadow-lg">
      <div className="flex items-center space-x-4 ml-4">
      <Link to="/home">
              <NavItem
                iconSrc={home}
                iconAlt="Home Icon"
                iconWidth={20}
                iconHeight={20}
                text="Home"
                textColor={isActive('/home') ? "text-[#E0E0E0]" : "text-[var(--fg-primary,#E0E0E0)]"}
                isActive={isActive('/home')}
              />
            </Link>
            <Link to="/discover">
              <NavItem
                iconSrc={discover}
                iconAlt="Discover Icon"
                iconWidth={20}
                iconHeight={20}
                text="Discover"
                textColor={isActive('/discover') ? "text-[#E0E0E0]" : "text-[var(--fg-secondary,#898989)]"}
                isActive={isActive('/discover')}
              />
            </Link>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-3 py-1 bg-[#333842] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--fg-primary,#E0E0E0)] w-52 transition-width duration-300 ease-in-out"
          />
          <img
            src={search}
            alt="Search Icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#898989] pointer-events-none"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <span className="text-white">{username}</span>
        <ProfileImage
          src={photo}
          alt="Profile"
        />
      </div>
    </header>
  );
};

export default Header;
