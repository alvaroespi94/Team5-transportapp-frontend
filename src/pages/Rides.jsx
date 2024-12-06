import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../services/auth.js';

const Rides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      const token = getAuthToken();

      if (!token) {
        console.error('No token available');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/rides', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRides(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rides:', error);
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  if (loading) return <div>Loading rides...</div>;

  return (
    <div>
      <h1>Your Rides</h1>
      {rides.length === 0 ? (
        <p>No rides available.</p>
      ) : (
        <ul>
          {rides.map((ride) => (
            <li key={ride.id}>
              <p><strong>Ride ID:</strong> {ride.id}</p>
              <p><strong>Driver:</strong> {ride.driverName}</p>
              <p><strong>Status:</strong> {ride.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Rides;
