import axios from "axios";

const API_BASE_URL = "http://localhost:5000";


export const authUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/Authentication/log_in`, loginData);
    const { data } = response;
    if (data.token) {
      localStorage.setItem("authToken", data.token); // Save token if login succeeds
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Authentication failed");
  }
};

export const otpVerification = async (otpData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/Authentication/otp_verification`, otpData);
    const { data } = response;
    if (data.token) {
      localStorage.setItem("authToken", data.token); // Save token after OTP verification
    }
    return data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || "OTP verification failed");
  }
};

export const registerUser = async (registerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/Authentication/register`, registerData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const logout = async () => {
  try {
    const token = getAuthToken();
    if (token) {
      await axios.post(`${API_BASE_URL}/api/Authentication/log_out`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("authToken");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};
