import React, { useState, useEffect } from 'react';
import './PersonalInformation.css';

// Function to fetch personal information from the backend
const fetchPersonalInfo = async () => {
  try {
    const response = await fetch('/api/personal-info');
    if (!response.ok) throw new Error('Failed to fetch personal information');
    return await response.json();
  } catch (error) {
    console.error('Error fetching personal information:', error);
    return null;
  }
};

const PersonalInfo = () => {
  const [personalData, setPersonalData] = useState(null);

  useEffect(() => {
    const getPersonalInfo = async () => {
      const data = await fetchPersonalInfo();
      if (data) {
        setPersonalData(data);
      }
    };
    getPersonalInfo();
  }, []);

  if (!personalData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="personal-info">
      <h2>Personal Information</h2>
      <p>Name: {personalData.name}</p>
      <p>Birthday: {personalData.birthday}</p>
      <p>Contact: {personalData.contact}</p>
    </div>
  );
};

export default PersonalInfo;
