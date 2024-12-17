import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from '../api/axiosConfig';

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  // Fetch addresses when the component mounts
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axiosConfig.get('/api/Rider/riderAddresses');
        setAddresses(response.data);
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axiosConfig.delete('/api/Rider/removeAddress', {
        data: { addressId }, // Include the address ID to be removed
      });

      if (response.status === 200) {
        setAddresses((prevAddresses) =>
          prevAddresses.filter((address) => address.id !== addressId)
        );
        console.log('Address deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete address:', error);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosConfig.post('/api/Rider/addAddress', newAddress);
      if (response.status === 201) {
        setAddresses([...addresses, response.data]);
        setNewAddress({ street: '', city: '', state: '', zipCode: '', country: '' });
        console.log('Address added successfully');
      }
    } catch (error) {
      console.error('Failed to add address:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>My Addresses</h2>
      <ul>
        {addresses.map((address) => (
          <li key={address.id}>
            {address.addressInfo.street}, {address.addressInfo.city}, {address.addressInfo.state}, {address.addressInfo.zipCode} {address.addressInfo.country}
            <button onClick={() => handleDeleteAddress(address.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add New Address</h2>
      <form onSubmit={handleAddAddress}>
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={newAddress.street}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={newAddress.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={newAddress.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={newAddress.zipCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={newAddress.country}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Address</button>
      </form>
    </div>
  );
};

export default AddressPage;
