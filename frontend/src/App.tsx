import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './views/MainView/Login';
import Register from './views/MainView/Register';
import Dashboard from './views/MusicDashboard/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout'; // Importar un Layout común

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && location.pathname === '/login') {
        // Si el usuario está autenticado y en la página de login, redirigir al dashboard
        navigate('/dashboard');
      } else if (!isAuthenticated && location.pathname === '/dashboard') {
        // Si el usuario no está autenticado e intenta acceder al dashboard, redirigir al login
        navigate('/login');
      }
    }
  }, [isAuthenticated, loading, location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p> {/* Puedes personalizar el spinner aquí */}
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={isAuthenticated ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />} />
      {/* Agrega más rutas protegidas aquí */}
    </Routes>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
