import React, { createContext, useState, useContext, useEffect } from "react";
import { getAuthToken, logout } from "../services/auth.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  // Load the stored token on initialization
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setAuth({ token }); // Initialize auth with the token if it exists
    }
  }, []);

  const handleLogout = () => {
    logout();
    setAuth(null); // Clear the auth state on logout
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
