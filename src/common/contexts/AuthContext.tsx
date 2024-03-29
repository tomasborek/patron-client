'use client';
import { useContext, useState, useEffect, createContext, FC } from 'react';
import type { CurrentUser } from '../interfaces/client';
import jwt from 'jsonwebtoken';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
type AuthContextType = {
  currentUser: CurrentUser | undefined | null; // undefined = not loaded, null = not logged in
  logout: () => void;
  login: (token: string) => void;
  token: string | undefined;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: undefined,
  logout: () => {},
  login: () => {},
  token: '',
});

export const useAuth = () => {
  if (!AuthContext) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return useContext(AuthContext);
};

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<
    CurrentUser | undefined | null
  >(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const authStateChange = () => {
    const token = getCookie('auth-token');
    if (!token) {
      setCurrentUser(null);
      return;
    }
    const payload = jwt.decode(token) as { id: string };
    if (!payload) {
      setCurrentUser(null);
      setToken(undefined);
      return;
    }
    setCurrentUser({ id: payload.id, token });
    setToken(token);
  };

  const login = (token: string) => {
    setCookie('auth-token', token);
    authStateChange();
  };

  const logout = () => {
    removeCookie('auth-token');
    authStateChange();
  };
  useEffect(() => {
    authStateChange();
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
