import React from 'react';
import ReactDOM from 'react-dom/client';  // Adjust for React 18
import App from './App';
import 'leaflet/dist/leaflet.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);