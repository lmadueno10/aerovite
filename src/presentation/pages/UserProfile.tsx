import React, { useState } from "react";
import { useUser } from "@/presentation/hooks/useUser";

export const UserProfile: React.FC = () => {
    const [userId, setUserId] = useState(1);
    const { user, loading, error } = useUser(userId);

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Clean Architecture Demo</h1>

            <div style={{ marginBottom: "1rem" }}>
                <label>
                    User ID:{" "}
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(Number(e.target.value))}
                        min="1"
                        max="10"
                    />
                </label>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            {user && (
                <div style={{
                    border: "1px solid #ccc",
                    padding: "1rem",
                    borderRadius: "8px",
                    maxWidth: "400px"
                }}>
                    <h2>{user.name}</h2>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Website:</strong> {user.website}</p>
                </div>
            )}
        </div>
    );
};
