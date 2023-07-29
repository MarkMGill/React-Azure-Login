// src/components/Home.js (Example usage in a component)
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../redux/authSlice';

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Simulate login action and set user in Redux state
    const loggedInUser = {
      name: 'John Doe',
      role: 'Admin',
      // Additional user information from Azure AD or other sources
    };
    dispatch(setUser(loggedInUser));
  };

  const handleLogout = () => {
    // Simulate logout action and clear user from Redux state
    dispatch(clearUser());
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default Home;
