// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-dom/client';

const Dashboard = () => {
  // Access the user data from the Redux state
  const user = useSelector((state) => state.auth.user);

  // If the user is not logged in or doesn't have the "Admin" role, redirect to the home page

  if (!user || user.role !== 'Admin') {
    return <Redirect to="/" />;
  }
 
  return (
    <div>
      <h2>Welcome to the Dashboard, {user.name}!</h2>
      <Link to="/"><button>Home</button></Link>
      {/* Add your dashboard content here */}
    </div>
  );
};

export default Dashboard;
