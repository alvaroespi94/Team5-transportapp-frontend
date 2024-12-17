import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axiosConfig.post('/api/Authentication/otp_verification', { emailAddress: email });
      setOtpSent(true);
      console.log('OTP sent successfully');
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosConfig.post('/api/Authentication/auth_rider', { emailAddress: email, otp });
      setAuthData(response.data);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {!otpSent ? (
        <form onSubmit={handleSendOtp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;