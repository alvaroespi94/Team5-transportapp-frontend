import React, { useEffect, useState } from 'react';
import { getAuthToken } from '../../services/api.js';
import axios from 'axios';

const RiderDashboard = () => {
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [newRide, setNewRide] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupTime: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchRiderRides = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get('/api/Rider/Rides', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUpcomingRides(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching rides');
      }
    };

    fetchRiderRides();
  }, []);

  const handleRequestRide = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = getAuthToken();
      const response = await axios.post('/api/Rider/RequestRide', newRide, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUpcomingRides((prev) => [...prev, response.data]);
      setNewRide({ pickupLocation: '', dropoffLocation: '', pickupTime: '' });
      setSuccess('Ride request created successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating ride request');
    }
  };

  return (
    <div>
      <h1>Rider Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <section>
        <h2>Request a Ride</h2>
        <form onSubmit={handleRequestRide}>
          <input
            type="text"
            placeholder="Pickup Location"
            value={newRide.pickupLocation}
            onChange={(e) =>
              setNewRide({ ...newRide, pickupLocation: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Dropoff Location"
            value={newRide.dropoffLocation}
            onChange={(e) =>
              setNewRide({ ...newRide, dropoffLocation: e.target.value })
            }
            required
          />
          <input
            type="datetime-local"
            placeholder="Pickup Time"
            value={newRide.pickupTime}
            onChange={(e) =>
              setNewRide({ ...newRide, pickupTime: e.target.value })
            }
            required
          />
          <button type="submit">Request Ride</button>
        </form>
      </section>

      <section>
        <h2>Upcoming Rides</h2>
        <ul>
          {upcomingRides.map((ride) => (
            <li key={ride.rideId}>
              Ride #{ride.rideId} - {ride.pickupTime} from {ride.pickupLocation}{' '}
              to {ride.dropoffLocation}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RiderDashboard;
