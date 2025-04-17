import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: number | null;
  name: string;
  email: string;
  role: 'company' | 'transporter' | 'admin';
  avatar: string;
}

export interface UserInfo {
  id: number | null;
  name: string;
  email: string;
  role: 'company' | 'transporter' | 'admin';
  avatar: string;
  token: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userInfo: UserInfo;
  user: User | null;
  login: (userData: UserInfo) => void;
  logout: () => void;
  updateUserInfo: (userData: Partial<UserInfo>) => void;
}

const defaultUserInfo: UserInfo = {
  id: null,
  name: '',
  email: '',
  role: 'company',
  avatar: '',
  token: ''
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserInfo = localStorage.getItem('userInfo');
    
    if (token && storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        const fullUserInfo = {
          ...parsedUserInfo,
          token
        };
        setUserInfo(fullUserInfo);
        setUser(parsedUserInfo);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Failed to parse user info:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
      }
    }
  }, []);

  const login = (userData: UserInfo) => {
    // Save token and user info to localStorage
    localStorage.setItem('token', userData.token);
    
    const userForStorage: User = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      avatar: userData.avatar
    };
    
    localStorage.setItem('userInfo', JSON.stringify(userForStorage));
    
    setUserInfo(userData);
    setUser(userForStorage);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Remove token and user info from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    
    setUserInfo(defaultUserInfo);
    setUser(null);
    setIsLoggedIn(false);
  };

  const updateUserInfo = (userData: Partial<UserInfo>) => {
    const updatedUserInfo = { ...userInfo, ...userData };
    setUserInfo(updatedUserInfo);
    
    const userForStorage: User = {
      id: updatedUserInfo.id,
      name: updatedUserInfo.name,
      email: updatedUserInfo.email,
      role: updatedUserInfo.role,
      avatar: updatedUserInfo.avatar
    };
    
    setUser(userForStorage);
    
    // Update localStorage
    localStorage.setItem('userInfo', JSON.stringify(userForStorage));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, user, login, logout, updateUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 