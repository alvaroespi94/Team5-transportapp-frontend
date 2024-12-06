import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authRider = async () => {
  try {
    const response = await api.get('/api/Authentication/auth_rider');
    return response;
  } catch (error) {
    console.error('Error authenticating rider:', error);
    throw error;
  }
};

export const authDriver = async () => {
  try {
    const response = await api.get('api/Authentication/auth_driver');
    return response;
  } catch (error) {
    console.error('Error authenticating driver:', error);
    throw error;
  }
};

export const authUser = async () => {
  try {
    const response = await api.get('api/Authentication/auth_user');
    return response;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.get('api/Authentication/log_out');
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const otpVerification = async (otpCode) => {
  try {
    const response = await api.get(`api/Authentication/otp_verification`, {
      params: { otp: otpCode },
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const registerRider = async (riderData) => {
  try {
    const response = await api.post('/api/Authentication/rider_sign_up', riderData);
    return response.data;
  } catch (error) {
    console.error('Error registering rider:', error);
    throw error;
  }
};

export const registerAdmin = async (adminData) => {
  try {
    const response = await api.post('api/Authentication/admin_sign_up', adminData);
    return response.data;
  } catch (error) {
    console.error('Error registering admin:', error);
    throw error;
  }
};

export const registerDriver = async (driverData) => {
  try {
    const response = await api.post('/api/Authentication/driver_sign_up', driverData);
    return response.data;
  } catch (error) {
    console.error('Error registering driver:', error);
    throw error;
  }
};

// Profile API call
export const getProfileInfo = async () => {
  try {
    const response = await api.get('api/Authentication/get_profile_info');
    return response.data;
  } catch (error) {
    console.error('Error fetching profile information:', error);
    throw error;
  }
};

export default api;
