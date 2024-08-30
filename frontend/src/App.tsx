import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/MainView/Login';
import Register from './views/MainView/Register';
import Dashboard from './views/Dashboard/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/Utility/ErrorBoundary';
import Home from './views/Dashboard/Home/Home';
import MyProfile from './views/Dashboard/Profile/MyProfile';
import MyFavourites from './views/Dashboard/Favourites/MyFavourites';
import MyPlaylists from './views/Dashboard/Playlists/MyPlaylists';
import Discover from './views/Dashboard/Discover/Discover';
import Search from './views/Dashboard/Search/Search';
import Administrator from './views/Dashboard/Administrator/Administrator';
import { PlayerProvider } from './context/PlayerContext'; // Asegúrate de tener la ruta correcta
import AudioPlayer from './components/Utility/AudioPlayer'; // Asegúrate de tener la ruta correcta
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }: { children: React.ReactNode, roleRequired?: number }) => {
  const { isAuthenticated, loading } = useAuth();
  const roleId = localStorage.getItem('roleId') ? parseInt(localStorage.getItem('roleId')!) : null;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && roleId !== roleRequired) {
    return <Navigate to={roleId === 1 ? "/administrator" : "/home"} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();
  const roleId = localStorage.getItem('roleId') ? parseInt(localStorage.getItem('roleId')!) : null;
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated && roleId !== null) {
      if (roleId === 1 && window.location.pathname !== '/administrator') {
        setRedirectPath('/administrator');
      } else if (roleId === 2 && window.location.pathname !== '/home') {
        setRedirectPath('/home');
      }
    }
  }, [loading, isAuthenticated, roleId]);

  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
      setRedirectPath(null);
    }
  }, [redirectPath, navigate]);

  if (loading || redirectPath) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="favourites" element={<MyFavourites />} />
        <Route path="playlists" element={<MyPlaylists />} />
        <Route path="discover" element={<Discover />} />
        <Route path="search" element={<Search />} />
        {roleId === 1 && <Route path="administrator" element={<Administrator />} />}
      </Route>

      <Route path="*" element={<Navigate to={isAuthenticated ? (roleId === 1 ? "/administrator" : "/home") : "/login"} />} />
    </Routes>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <PlayerProvider>
            <AppRoutes />
            <AudioPlayer />
          </PlayerProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
