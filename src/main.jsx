// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from "@azure/msal-browser";
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { authConfig } from './authConfig';

const msalInstance = new PublicClientApplication(authConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <App />
      </Provider>
    </MsalProvider>
  </React.StrictMode>,
  //document.getElementById('root')
);
