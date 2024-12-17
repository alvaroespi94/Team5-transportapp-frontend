import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosConfig from '../api/axiosConfig';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosConfig.get('/api/Authentication/get_profile_info');
        setProfile(response.data);

        // Initialize formData with profile data
        setFormData({
          fullName: response.data.fullName,
          phoneNumber: response.data.phoneNumber,
          emailAddress: response.data.emailAddress,
          address: response.data.address || {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
          },
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update address fields separately
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosConfig.post('/api/Rider/updateRiderProfile', formData);
      setProfile(response.data.rider); // Update the profile state with the updated data
      setIsEditing(false); // Exit editing mode
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error.response?.data || error.message);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div>
      {profile ? (
        <div>
          <h2>Profile</h2>
          {!isEditing ? (
            <div>
              <p>Name: {profile.fullName}</p>
              <p>Phone: {profile.phoneNumber}</p>
              <p>Email: {profile.emailAddress}</p>
              <p>Address:</p>
              <ul>
                <li>Street: {profile.address?.street}</li>
                <li>City: {profile.address?.city}</li>
                <li>State: {profile.address?.state}</li>
                <li>Zip Code: {profile.address?.zipCode}</li>
                <li>Country: {profile.address?.country}</li>
              </ul>
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <label>
                Name:
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Phone:
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Email:
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                />
              </label>
              <br />
              <h3>Address</h3>
              <label>
                Street:
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                City:
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                State:
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Zip Code:
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Country:
                <input
                  type="text"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleChange}
                />
              </label>
              <br />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
