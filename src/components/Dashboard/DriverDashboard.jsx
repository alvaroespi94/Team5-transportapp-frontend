import React, { useEffect, useState } from 'react';
import { getAuthToken } from '../../services/auth.js';
import axios from 'axios';

const DriverDashboard = () => {
  const [assignedRides, setAssignedRides] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDriverRides = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get('/api/driver/rides', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssignedRides(response.data);
      } catch (err) {
        setError('Error fetching rides');
      }
    };

    fetchDriverRides();
  }, []);

  return (
    <div>
      <h1>Driver Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <section>
        <h2>Assigned Rides</h2>
        <ul>
          {assignedRides.map((ride) => (
            <li key={ride.rideId}>
              Ride #{ride.rideId} - {ride.pickupLocation} to {ride.dropoffLocation}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DriverDashboard;
