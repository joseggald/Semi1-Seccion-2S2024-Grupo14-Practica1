import React, { createContext, useContext, useState, useEffect } from 'react';
import { logout } from '../services/authService';
interface AuthContextProps {
  isAuthenticated: boolean;
  roleId: number | null;
  user: any | null;
  loading: boolean;
  loginUser: () => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [roleId, setRoleId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loginUser = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser && storedUser.role_id) {
      setUser(storedUser);
      setRoleId(storedUser.role_id);
      setIsAuthenticated(true);
    }
    setLoading(false);
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRoleId(null);
    localStorage.removeItem('user');
    logout();
  };

  useEffect(() => {
    loginUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        roleId,
        user,
        loading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
