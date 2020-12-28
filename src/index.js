import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ScoreProvider } from './contexts/ScoreContext';

ReactDOM.render(
  <React.StrictMode>
    <ScoreProvider>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={process.env.REACT_APP_BASE_URL}
      >
        <App />
      </Auth0Provider>
    </ScoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
