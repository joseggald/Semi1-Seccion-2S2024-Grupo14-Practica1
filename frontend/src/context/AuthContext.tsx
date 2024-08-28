import React, { createContext, useContext, useState, useEffect } from 'react';
import { verifySession } from '../services/authService';
import { getUser } from '../services/userService';

interface AuthContextProps {
  isAuthenticated: boolean;
  roleId: number | null;
  loading: boolean;
  loginUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [roleId, setRoleId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loginUser = () => {
    setIsAuthenticated(true);
    checkSession();  // Verificamos la sesión inmediatamente después del login
  };

  const checkSession = async () => {
    setLoading(true);
    try {
      await verifySession();
      const user = await getUser(); 
      setRoleId(user.role_id);
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
    <AuthContext.Provider value={{ isAuthenticated, roleId, loading, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
