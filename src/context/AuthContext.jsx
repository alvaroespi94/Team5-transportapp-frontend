import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [authData, setAuthDataState] = useState(null); // Store auth data (token, etc.)

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setAuthDataState(null); // Clear auth data on logout
  };

  const setAuthData = (data) => {
    setAuthDataState(data);
    login(data.token); // Call `login` with the token
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, setAuthData, authData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
