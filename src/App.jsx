// src/App.jsx
import React, {useEffect} from 'react';
//import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useMsal, MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from './redux/authSlice';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Unauthorized from './components/Unauthorized';
import ProductsEdit from './views/ProductsEdit';
import { userHasRole } from './utils/auth';

/****** Note: check out https://blog.openreplay.com/role-based-access-in-react/ for RBAC roles */
/****** Note: Azure set up using MarkMGill@live.com */

const App = () => {
  const { instance, accounts, inProgress } = useMsal();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  console.log(accounts)

  console.log(user)
  // Function to handle login
  const handleLogin = async () => {
    if (accounts.length === 0) {
      try {
        await instance.loginPopup();
        console.log(accounts)
        if (accounts.length > 0) {
          const accessToken = await instance.acquireTokenSilent({
            scopes: ['user.read'], // Add scopes for the API resources you want to access
          });
          // Use the access token to call APIs or validate user roles
          // You can also fetch user information from Azure AD using Microsoft Graph API
          // For simplicity, let's just set the user in Redux state
          dispatch(setUser({ name: accounts[0].name, role: 'Admin' }));
        }
      } catch (error) {
        console.log('Login error:', error);
      }
    }
  };

  const updateUser = async () => {
    if (accounts.length > 0) {
      dispatch(setUser({ name: accounts[0].name, role: 'Admin' }));
    }
  }

  useEffect(() => {
    updateUser();
  }, [accounts])

  // Function to handle logout
  const handleLogout = () => {
    if (accounts.length > 0) {
      instance.logout();
      dispatch(clearUser());
    }
  };

  function LoadingComponent() {
    return <p>Authentication in progress...</p>;
  }


const Products = () => <h1>Products</h1>;
const AllProducts = () => <h1>AllProducts</h1>;

  return (
    <Router>
      <div>
        {inProgress === InteractionStatus.None ? (
          user ? (
            <div>
              <h2>Welcome, {user.name}!</h2>
              <button onClick={handleLogout}>Logout</button>
              <Link to='/dashboard' ><button>Dashboard</button></Link>
            </div>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )
        ) : (
          <div>Loading...</div>
        )}

    <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/products-edit">Products Edit</Link>
        </li>
        <li>
          <Link to="/all-products">All Products</Link>
        </li>
      </ul>

        {/* Use MsalAuthenticationTemplate to handle redirect and token acquisition */}
        <MsalAuthenticationTemplate
          interactionStatus={inProgress}
          loadingComponent={LoadingComponent}
          errorComponent={<div>Error</div>}
        >
          <Routes>
            <Route exact path="/" element={<Home />} />
            {user && userHasRole(user, 'Admin') ? (
              <Route path="/dashboard" element={<Dashboard />} />
            ) : null}
            {user && userHasRole(user, 'Admin') ? (
              <Route path="/products" exact element={<Products />} />
            ) : <Route path="/products" element={<Unauthorized />} />}
            {user && userHasRole(user, 'Admin') ? (
              <Route path="/products-edit" element={<ProductsEdit />} />
            ) : <Route path="/products-edit" element={<Unauthorized />} />}

            {/**** Valuable Redirect stuff, use this pattern!!!!!! But change Redirect to Navigate  ****
             * For reference, see https://www.copycat.dev/blog/react-router-redirect/#:~:text=The%20React%20is,when%20it%20has%20been%20rendered.
             * <Route exact path="/signup">
                {isLoggedIn ? <Redirect to="/" /> : <SignUp />}
              </Route>
             * 
             * 
             * 
            */}
          </Routes>


        

        </MsalAuthenticationTemplate>
      </div>
    </Router>
  );
};

export default App;
