import React from 'react';
import ReactDOM from 'react-dom/client';  // Adjust for React 18
// import './index.css'; // Assuming you have some global styles defined
import App from './App'; // The root component of your React application
import { AuthProvider } from '../contexts/AuthContext';  // Import the AuthProvider
import { BrowserRouter as Router } from 'react-router-dom';
import '../../campus-finder-frontend/src/axiosConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);*/
