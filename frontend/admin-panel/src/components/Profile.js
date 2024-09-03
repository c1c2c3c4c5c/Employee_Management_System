import React, { useState, useEffect } from 'react';
import './Profile.css';

// Function to fetch user profile data from the backend
const fetchUserProfile = async () => {
  try {
    const response = await fetch('/api/user-profile');
    if (!response.ok) throw new Error('Failed to fetch user profile data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile data:', error);
    return null;
  }
};

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const data = await fetchUserProfile();
      if (data) {
        setUserData(data);
      }
    };
    getUserProfile();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
      </div>
      <div className="profile-info">
        <div className="upload-certificate">
          <button className="upload-btn">Upload Certificate</button>
        </div>
        <p><strong>First Name:</strong> {userData.firstName}</p>
        <p><strong>Last Name:</strong> {userData.lastName}</p>
        <p><strong>Birthdate:</strong> {userData.birthdate}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Contact No.:</strong> {userData.phoneNumber}</p>
        <p><strong>Gender:</strong> {userData.gender}</p>
        <p><strong>Role:</strong> {userData.role}</p>
        <p><strong>Department:</strong> {userData.departmentName}</p>
      </div>
    </div>
  );
};

export default Profile;
