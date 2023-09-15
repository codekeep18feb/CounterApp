import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeScreen() {
  const navigate = useNavigate();

  const handleRedirectToLogin = () => {
    // Use the navigate function to redirect to the "/login" route
    navigate('/login');
  };

  return (
    <div>
      <div>HomeScreen</div>
      <button onClick={handleRedirectToLogin}>Go to Login</button>
    </div>
  );
}

export default HomeScreen;
