import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header>
      <h1 className="AppTitle">RideApp</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/ride-request">Ride Request</Link></li>
          <li><Link to="/addresses">Addresses</Link></li>
          
          {!isAuthenticated ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <li><button onClick={logout}>Logout</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;