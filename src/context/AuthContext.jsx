import { createContext, useContext, useState, useEffect } from 'react';

const USER_STORAGE_KEY = 'pitara_user';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  };

  const refreshUser = () => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    setUser(stored ? JSON.parse(stored) : null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.isAdmin || false;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, refreshUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
