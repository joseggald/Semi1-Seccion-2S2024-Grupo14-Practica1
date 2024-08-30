import NavItem from '../Header/NavItem';
import libraryIcon from '../../assets/header/library.svg';
import favoritesIcon from '../../assets/sidebar/favs.svg';
import playlistIcon from '../../assets/sidebar/playlist.svg';
import profileIcon from '../../assets/sidebar/profile.svg';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const roleId = localStorage.getItem('roleId') ? parseInt(localStorage.getItem('roleId')!) : null;

  return (
    <aside className="w-64 h-screen bg-[#111111] shadow-lg p-6 flex flex-col justify-between">
  <div className="space-y-16">
    <div className="flex items-center space-x-3 mb-6">
      <img src={libraryIcon} alt="Library Icon" className="w-6 h-6" />
      <h2 className="text-2xl font-bold text-white">My Library</h2>
    </div>

    {roleId === 1 && (
      <>
        <Link to="/favourites">
          <NavItem
            iconSrc={favoritesIcon}
            iconAlt="Favorites Icon"
            text="My Favorites"
            textColor={`text-[var(--fg-primary,#E0E0E0)] ${location.pathname === '/favourites' ? 'bg-[#2b2e37]' : ''}`}
            isActive={location.pathname === '/favourites'}
          />
        </Link>

        <Link to="/playlists">
          <NavItem
            iconSrc={playlistIcon}
            iconAlt="Playlist Icon"
            text="My Playlist"
            textColor={`text-[var(--fg-secondary,#898989)] ${location.pathname === '/playlists' ? 'bg-[#2b2e37]' : ''}`}
            isActive={location.pathname === '/playlists'}
          />
        </Link>

        <Link to="/administrator">
          <NavItem
            iconSrc={playlistIcon}
            iconAlt="Administrator Icon"
            text="Songs"
            textColor={`text-[var(--fg-primary,#E0E0E0)] ${location.pathname === '/administrator' ? 'bg-[#2b2e37]' : ''}`}
            isActive={location.pathname === '/administrator'}
          />
        </Link>
      </>
    )}

    {roleId === 2 && (
      <>
        <Link to="/favourites">
          <NavItem
            iconSrc={favoritesIcon}
            iconAlt="Favorites Icon"
            text="My Favorites"
            textColor={`text-[var(--fg-primary,#E0E0E0)] ${location.pathname === '/favourites' ? 'bg-[#2b2e37]' : ''}`}
            isActive={location.pathname === '/favourites'}
          />
        </Link>

        <Link to="/playlists">
          <NavItem
            iconSrc={playlistIcon}
            iconAlt="Playlist Icon"
            text="My Playlist"
            textColor={`text-[var(--fg-secondary,#898989)] ${location.pathname === '/playlists' ? 'bg-[#2b2e37]' : ''}`}
            isActive={location.pathname === '/playlists'}
          />
        </Link>
      </>
    )}
  </div>

  <div>
    <Link to="/profile">
      <NavItem
        iconSrc={profileIcon}
        iconAlt="Profile Icon"
        text="My Profile"
        textColor={`text-[var(--fg-secondary,#898989)] ${location.pathname === '/profile' ? 'bg-[#2b2e37]' : ''}`}
        isActive={location.pathname === '/profile'}
      />
    </Link>
  </div>
</aside>
  );
};

export default Sidebar;
