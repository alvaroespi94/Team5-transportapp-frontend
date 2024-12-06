import React, { useEffect, useState } from 'react';
import { getAuthToken } from '../../services/auth.js';
import axios from 'axios';

const RiderDashboard = () => {
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRiderRides = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get('/api/rider/rides', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUpcomingRides(response.data);
      } catch (err) {
        setError('Error fetching rides');
      }
    };

    fetchRiderRides();
  }, []);

  return (
    <div>
      <h1>Rider Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <section>
        <h2>Upcoming Rides</h2>
        <ul>
          {upcomingRides.map((ride) => (
            <li key={ride.rideId}>
              Ride #{ride.rideId} - {ride.pickupTime} from {ride.pickupLocation} to {ride.dropoffLocation}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RiderDashboard;
