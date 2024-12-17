import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../api/axiosConfig';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const requestData = {
      fullName,
      phoneNumber,
      emailAddress,
      address,
    };

    try {
      await axiosConfig.post('/api/Authentication/rider_sign_up', requestData);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Street"
        name="street"
        value={address.street}
        onChange={handleAddressChange}
        required
      />
      <input
        type="text"
        placeholder="City"
        name="city"
        value={address.city}
        onChange={handleAddressChange}
        required
      />
      <input
        type="text"
        placeholder="State"
        name="state"
        value={address.state}
        onChange={handleAddressChange}
        required
      />
      <input
        type="text"
        placeholder="Zip Code"
        name="zipCode"
        value={address.zipCode}
        onChange={handleAddressChange}
        required
      />
      <input
        type="text"
        placeholder="Country"
        name="country"
        value={address.country}
        onChange={handleAddressChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
