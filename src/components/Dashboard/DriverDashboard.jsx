import React, { useEffect, useState } from 'react';
import { getAuthToken } from '../../services/api.js';
import axios from 'axios';

const DriverDashboard = () => {
  const [rideRequests, setRideRequests] = useState([]);
  const [assignedRides, setAssignedRides] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const token = getAuthToken();
        const rideRequestsResponse = await axios.get('/api/Driver/RideRequests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const assignedRidesResponse = await axios.get('/api/Driver/Rides', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRideRequests(rideRequestsResponse.data);
        setAssignedRides(assignedRidesResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching rides');
      }
    };

    fetchDriverData();
  }, []);

  const handleAcceptRide = async (rideId) => {
    setError('');
    setSuccess('');
    try {
      const token = getAuthToken();
      await axios.post(`/api/Driver/AcceptRide/${rideId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRideRequests((prev) => prev.filter((ride) => ride.rideId !== rideId));
      setAssignedRides((prev) => [...prev, { rideId, status: 'Accepted' }]);
      setSuccess('Ride accepted successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error accepting ride');
    }
  };

  const handleDeclineRide = async (rideId) => {
    setError('');
    setSuccess('');
    try {
      const token = getAuthToken();
      await axios.post(`/api/Driver/DeclineRide/${rideId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRideRequests((prev) => prev.filter((ride) => ride.rideId !== rideId));
      setSuccess('Ride declined successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error declining ride');
    }
  };

  return (
    <div>
      <h1>Driver Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <section>
        <h2>Ride Requests</h2>
        <ul>
          {rideRequests.map((ride) => (
            <li key={ride.rideId}>
              Ride #{ride.rideId} - {ride.pickupLocation} to {ride.dropoffLocation}
              <button onClick={() => handleAcceptRide(ride.rideId)}>Accept</button>
              <button onClick={() => handleDeclineRide(ride.rideId)}>Decline</button>
            </li>
          ))}
        </ul>
      </section>

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
