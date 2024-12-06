// api.js
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authUser = async (loginData) => {
  try {
    const response = await api.post("/api/Authentication/log_in", loginData);
    const { data } = response;
    if (data.token) localStorage.setItem("authToken", data.token);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const Register = async (registerData) => {
  try {
    const response = await api.post("/api/Authentication/register", registerData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const otpVerification = async (otpData) => {
  try {
    const response = await api.post("/api/Authentication/otp_verification", otpData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "OTP verification failed");
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

export const logout = async () => {
  try {
    const response = await api.post("/api/Authentication/log_out");
    localStorage.removeItem("authToken");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const getProfileInfo = async () => {
  try {
    const response = await api.get("/api/Authentication/get_profile_info");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile info");
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export default api;
