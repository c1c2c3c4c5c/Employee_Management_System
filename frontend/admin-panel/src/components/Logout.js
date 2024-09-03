import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Function to handle logout by calling the backend API
const logoutUser = async () => {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensure cookies or other credentials are sent
    });

    if (!response.ok) {
      throw new Error('Failed to log out');
    }

    // Additional actions or state updates on successful logout, if needed
    return await response.json();
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false };
  }
};

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      // Call the logout API
      const result = await logoutUser();

      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');

      // Check if logout was successful
      if (result.success) {
        // Redirect to login page
        navigate('/login');
      } else {
        // Handle logout failure (e.g., show error message or retry)
        console.error('Logout failed');
        navigate('/error'); // Optional: navigate to an error page or show a message
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="logout">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
