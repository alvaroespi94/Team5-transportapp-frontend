import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home.jsx";
import Login from "./components/Authentication/Login.jsx";
import Register from "./components/Authentication/Register.jsx";
import AdminDashboard from "./components/Dashboard/AdminDashboard.jsx";
import DriverDashboard from "./components/Dashboard/DriverDashboard.jsx";
import RiderDashboard from "./components/Dashboard/RiderDashboard.jsx";
import Profile from "./pages/Profile.jsx";
import Rides from "./pages/Rides.jsx";
import NotFound from "./pages/NotFound";
import Header from "./components/Shared/Header.jsx";
import Footer from "./components/Shared/Footer.jsx";
import ProtectedRoute from "./components/Shared/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/driver-dashboard"
              element={
                <ProtectedRoute>
                  <DriverDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rider-dashboard"
              element={
                <ProtectedRoute>
                  <RiderDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rides"
              element={
                <ProtectedRoute>
                  <Rides />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
