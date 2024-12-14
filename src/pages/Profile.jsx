import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken, getProfileInfo, setProfileInfo } from "../services/api.js";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState({
        street: "",
        city: "",
        zip: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = getAuthToken();
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const profileData = await getProfileInfo();
                setUser(profileData);
                setAddress(profileData.address || { street: "", city: "", zip: "" });
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleSave = async () => {
        try {
            await setProfileInfo({ address });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>Your Profile</h1>
            <p><strong>Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Account Created:</strong>{new Date(user.createdAt).toLocaleDateString()}</p>
            {isEditing ? (
                <div>
                    <h3>Edit Address</h3>
                    <input
                        type="text"
                        placeholder="Street Address"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Zip Code"
                        value={address.zip}
                        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                    />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    <p><strong>Address:</strong> {`${address.street}, ${address.city}, ${address.zip}`}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Address</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
