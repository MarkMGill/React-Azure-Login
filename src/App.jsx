// src/App.jsx
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useMsal, MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from './redux/authSlice';
//import { authConfig } from './authConfig';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { userHasRole } from './utils/auth';

const App = () => {
  const { instance, accounts, inProgress } = useMsal();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  console.log(accounts)
  console.log(inProgress)
  console.log(InteractionStatus)
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
      //const accessToken = await instance.acquireTokenSilent({
      //  scopes: ['user.read'], // Add scopes for the API resources you want to access
      //});
      // Use the access token to call APIs or validate user roles
      // You can also fetch user information from Azure AD using Microsoft Graph API
      // For simplicity, let's just set the user in Redux state
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

  return (
    <Router>
      <div>
        {inProgress === InteractionStatus.None ? (
          user ? (
            <div>
              <h2>Welcome, {user.name}!</h2>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )
        ) : (
          <div>Loading...</div>
        )}

        {/* Use MsalAuthenticationTemplate to handle redirect and token acquisition */}
        <MsalAuthenticationTemplate
          interactionStatus={inProgress}
          //loadingComponent={<div>Loading...</div>}
          errorComponent={<div>Error</div>}
        >
          <Routes>
            <Route exact path="/" component={Home} />
            {user && userHasRole(user, 'Admin') ? (
              <Route path="/dashboard" component={Dashboard} />
            ) : null}
          </Routes>
        </MsalAuthenticationTemplate>
      </div>
    </Router>
  );
};

/*const AppWithMsal = () => {
  return (
    <MsalProvider instance={authConfig.msalInstance}>
      <App />
    </MsalProvider>
  );
};*/

export default App;
