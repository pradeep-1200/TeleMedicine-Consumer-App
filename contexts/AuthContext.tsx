import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { storage, StorageKeys } from '@/utils/storage';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  login: (userData: any) => void;
  logout: () => void;
  updateUser: (userData: any) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await storage.getItem(StorageKeys.USER_DATA);
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    await storage.setItem(StorageKeys.USER_DATA, userData);
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await storage.removeItem(StorageKeys.USER_DATA);
  };

  const updateUser = async (userData: any) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    await storage.setItem(StorageKeys.USER_DATA, updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};