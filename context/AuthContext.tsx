import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthResponse, RoleId, User } from '../types';
import { getProfile } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUserId = localStorage.getItem('userId');
      
      if (storedToken && storedUserId) {
        try {
          // Fetch full profile to get role
          const userProfile = await getProfile(storedUserId);
          setUser(userProfile);
          setToken(storedToken);
        } catch (error) {
          console.error("Session expired or invalid", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (data: AuthResponse) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.id);
    setToken(data.token);
    
    // Fetch profile immediately to set user state with Role
    try {
      const userProfile = await getProfile(data.id);
      setUser(userProfile);
    } catch (e) {
      console.error("Failed to fetch user profile after login");
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
    setToken(null);
  };

  const isAdmin = user?.role?.roleName === RoleId.ADMIN;

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isLoading, 
      login, 
      logout, 
      isAuthenticated: !!token,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};