import axios from 'axios';

// Base URL for the mock API server
const axiosConfig = axios.create({
  baseURL: 'http://localhost:5000',  // Local backend mock API
  //baseURL: 'https://csci-team5.igeeksng.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// If you have a token or need to add authorization headers dynamically
// You could do something like:
axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage (or wherever you store it)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Set the token header for each request
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;
