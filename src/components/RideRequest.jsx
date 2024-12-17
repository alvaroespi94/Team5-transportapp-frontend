import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from '../api/axiosConfig.js';

const RideRequest = () => {
  const [pickUpDateTime, setPickUpDateTime] = useState('');
  const [pickUpAddressID, setPickUpAddressID] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [rideHistory, setRideHistory] = useState([]);
  const [lastRequestedRide, setLastRequestedRide] = useState(null);

  // Fetch ride history on component mount
  useEffect(() => {
    const fetchRideHistory = async () => {
      try {
        const response = await axiosConfig.get('/api/Rider/riderHistory');
        setRideHistory(response.data);
      } catch (error) {
        console.error('Failed to fetch ride history:', error);
      }
    };
  
    // Load ride history
    fetchRideHistory();
  
    // Load last requested ride from localStorage
    const savedLastRequestedRide = localStorage.getItem('lastRequestedRide');
    if (savedLastRequestedRide) {
      setLastRequestedRide(JSON.parse(savedLastRequestedRide));
    }
  }, []);  

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosConfig.post('/api/Rider/requestForRider', {
        pickUpDateTime,
        pickUpAddressID,
        additionalInformation: additionalInformation,
      });
      const newRide = response.data;
      setLastRequestedRide(newRide);
      setRideHistory((prevRideHistory) => [newRide, ...prevRideHistory]); // Add the new ride to the top of the history
      localStorage.setItem('lastRequestedRide', JSON.stringify(newRide)); // Save to localStorage
      alert('Ride requested successfully');
    } catch (error) {
      console.error('Failed to request ride:', error);
      alert('Failed to request ride. Please try again.');
    }
  };
  
  const handleCancelRide = async () => {
    try {
      const response = await axiosConfig.get('/api/Rider/cancelRideRequest', {
        params: {
          requestID: lastRequestedRide.requestID,
        },
        headers: {
          Accept: 'text/plain',
        },
      });
  
      alert('Ride cancelled successfully');
      setLastRequestedRide(null);
      localStorage.removeItem('lastRequestedRide'); // Remove from localStorage
    } catch (error) {
      console.error('Failed to cancel ride:', error);
      alert('Failed to cancel ride. Please try again.');
    }
  };  
  
  return (
    <div>
      <form onSubmit={handleRequest}>
        <input
          type="datetime-local"
          value={pickUpDateTime}
          onChange={(e) => setPickUpDateTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Pick-up Address"
          value={pickUpAddressID}
          onChange={(e) => setPickUpAddressID(e.target.value)}
          required
        />
        <textarea
          placeholder="Additional Information"
          value={additionalInformation}
          onChange={(e) => setAdditionalInformation(e.target.value)}
        />
        <button type="submit">Request Ride</button>
      </form>

      {lastRequestedRide && (
        <div>
          <h2>Last Requested Ride</h2>
          <p>Pick-up Date & Time: {lastRequestedRide.pickUpDateTime}</p>
          <p>Pick-up Location: {lastRequestedRide.pickUpLocation}</p>
          <p>Status: {lastRequestedRide.status || 'Pending'}</p>
          <button onClick={handleCancelRide}>Cancel Ride</button>
        </div>
      )}

      <h2>Ride History</h2>
      <ul>
        {rideHistory.map((ride) => (
          <li key={ride.requestID}>
            <p>Pick-up Date & Time: {ride.pickUpDateTime}</p>
            <p>Pick-up Location: {ride.pickUpLocation}</p>
            <p>Additional Information: {ride.additionalInformation}</p>
            <p>Status: {ride.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RideRequest;
