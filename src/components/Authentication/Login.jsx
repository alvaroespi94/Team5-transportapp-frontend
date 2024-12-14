import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
//import { mockAuthUser, mockOtpVerification } from "../../services/api.js";
import { authUser, otpVerification } from "../../services/api.js";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRequired, setOtpRequired] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authUser({ email });
      if (response.status === 204) {
        setOtpRequired(true);
        setMessage("OTP sent to your email. Please enter it to continue.");
        setError("");
      } else {
        setAuth(response.data);
        setError("");
        setMessage("Login successful!");
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Please try again.");
      setMessage("");
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      const user = await otpVerification({ otp });
      setAuth(user);
      setError("");
      setMessage("Login successful!");
    } catch (err) {
      setError(err.message || "OTP verification failed. Please try again.");
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
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
