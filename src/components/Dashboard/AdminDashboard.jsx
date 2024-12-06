import React, { useEffect, useState } from 'react';
import { getAuthToken } from '../../services/auth.js';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [rides, setRides] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = getAuthToken();
        const usersResponse = await axios.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ridesResponse = await axios.get('/api/admin/rides', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);
        setRides(ridesResponse.data);
      } catch (err) {
        setError('Error fetching data');
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <section>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.userId}>{user.name} - {user.email}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Rides</h2>
        <ul>
          {rides.map((ride) => (
            <li key={ride.rideId}>Ride #{ride.rideId} - {ride.status}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
