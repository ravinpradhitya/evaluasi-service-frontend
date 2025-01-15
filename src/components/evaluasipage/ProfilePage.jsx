import React, { useState, useEffect } from "react";
import EvaluasiService from "../service/EvaluasiService";

function ProfilePage({ userId }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await EvaluasiService.getUserProfile(userId);
      setProfile(response);
      setLoading(false);
    } catch (err) {
      setError("Failed to load profile data.");
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
      <p>Class: </p>
    </div>
  );
}

export default ProfilePage;
