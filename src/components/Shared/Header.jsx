import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/rides">Rides</Link>
                <Link to="/profile">Profile</Link>
            </nav>
        </header>
    );
}
