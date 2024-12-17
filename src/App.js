import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import RideRequest from './components/RideRequest';
import AddressPage from './components/AddressPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/ride-request" element={<ProtectedRoute><RideRequest /></ProtectedRoute>} />
          <Route path="/addresses" element={<ProtectedRoute><AddressPage /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
