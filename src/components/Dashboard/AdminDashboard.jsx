import React, { useEffect, useState } from 'react';
import { getAuthToken } from '../../services/api.js';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [rides, setRides] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = getAuthToken();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const usersResponse = await axios.get('/api/Admin/Users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ridesResponse = await axios.get('/api/Admin/Rides', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);
        setRides(ridesResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching data');
      }
    };

    fetchDashboardData();
  }, [token]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/Admin/Users', newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setNewUser({ name: '', email: '' });
      setSuccess('User added successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding user');
    }
  };

  const handleDeleteUser = async (userId) => {
    setError('');
    setSuccess('');

    try {
      await axios.delete(`/api/Admin/Users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
      setSuccess('User deleted successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting user');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      
      {/* User Management Section */}
      <section>
        <h2>Users</h2>
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <button type="submit">Add User</button>
        </form>
        <ul>
          {users.map((user) => (
            <li key={user.userId}>
              {user.name} - {user.email}
              <button
                onClick={() => handleDeleteUser(user.userId)}
                style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
      
      {/* Rides Section */}
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
