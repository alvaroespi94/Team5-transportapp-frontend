import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { logout } from "../../services/api.js";

export default function Header() {
    const {auth, setAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("authToken");
            setAuth(null);
            navigate("/login");
        } catch (err) {
            console.error("Error during logout:", err);
        }
    };

    return (
        <header>
            <h1>RiderApp</h1>
            <nav>
                <Link to="/">Home{' '}</Link>
                <Link to="/rides">Rides{' '}</Link>
                <Link to="/profile">Profile{' '}</Link>
                {auth && (
                    <button 
                        onClick={handleLogout}
                        style={{
                            marginLeft: "10px",
                            padding: "5px 10px",
                            cursor: "pointer",
                        }}>
                        Logout
                    </button>
                )}
            </nav>
        </header>
    );
}
