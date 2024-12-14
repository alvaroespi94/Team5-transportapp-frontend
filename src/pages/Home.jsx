import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RiderDashboard from '../components/Dashboard/RiderDashboard.jsx';
import DriverDashboard from '../components/Dashboard/DriverDashboard.jsx';
import AdminDashboard from '../components/Dashboard/AdminDashboard.jsx';
import { getAuthToken, getProfileInfo } from '../services/api.js';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = getAuthToken();
      if (!token) return; // User is not logged in, show login/signup buttons

      try {
        const profile = await getProfileInfo(); // Fetch user profile info
        setUser(profile); // Set user state with profile data
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // Conditionally render the dashboard based on the user's role
  if (user) {
    switch (user.role) {
      case 'Rider':
        return <RiderDashboard />;
      case 'Driver':
        return <DriverDashboard />;
      case 'Admin':
        return <AdminDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  }

  // Render the login/signup buttons if the user is not logged in
  return (
    <div>
      <h1>Welcome!</h1>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
