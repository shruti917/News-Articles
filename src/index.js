import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ThemeProvider } from "@material-tailwind/react";
import './index.css'
import { Auth0Provider } from "@auth0/auth0-react";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   
    <ThemeProvider>
      <Auth0Provider
    domain="dev-qxglau2zfezvqyvl.us.auth0.com"
    clientId="aUFaOgFosi9Iq9TPKk0bnDY2UCao8AEw"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
    </ThemeProvider>
 
);


