// src/components/Home.js (Example usage in a component)
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../redux/authSlice';

const Home = () => {
  const user = useSelector((state) => state.auth.user);



  return (
    <div>
        <h2>Welcome, {user.name}! Hommmeee</h2>
    </div>
  );
};

export default Home;
