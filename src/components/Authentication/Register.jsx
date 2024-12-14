import React, { useState } from "react";
import { registerRider, registerDriver, registerAdmin } from "../../services/api.js";

export default function Register() {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Rider");
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (role === "Rider") {
                await registerRider({ email, address });
            } else if (role === "Driver") {
                await registerDriver({ email });
            } else if (role === "Admin") {
                await registerAdmin({ email });
            }
            setSuccess(true);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {role === "Rider" && (
                    <>
                        <input
                            type="text"
                            placeholder="Street Address"
                            value={address.street}
                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="City"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="State"
                            value={address.state}
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Zip Code"
                            value={address.zipCode}
                            onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                            required
                        />
                    </>
                )}
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Rider">Rider</option>
                    <option value="Driver">Driver</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit">Register</button>
            </form>
            {success && <p>Registration successful! Check your email for further instructions.</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
