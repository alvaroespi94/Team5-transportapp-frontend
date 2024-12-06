import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { authUser, otpVerification } from "../../services/api.js";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRequired, setOtpRequired] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authUser();
      if (response.status === 204) {
        setOtpRequired(true); // OTP is required
        setError("OTP required. Please check your email.");
      } else {
        setAuth(response.data); // Save authenticated user data in the context
        setError("");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      const user = await otpVerification(otp);
      setAuth(user); // Save the authenticated user data in the context
      setError("");
    } catch (err) {
      setError("OTP verification failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={otpRequired ? handleOtpVerification : handleLogin}>
        {!otpRequired && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        {otpRequired && (
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        )}
        <button type="submit">{otpRequired ? "Verify OTP" : "Login"}</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
