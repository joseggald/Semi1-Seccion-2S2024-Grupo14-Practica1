import React, { createContext, useContext, useState, useEffect } from 'react';
import { verifySession } from '../services/authService';

interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  loginUser: () => void; // Nueva función para actualizar el estado cuando el usuario inicie sesión
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const loginUser = () => {
    setIsAuthenticated(true);
  };

  const checkSession = async () => {
    setLoading(true);
    try {
      await verifySession();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
