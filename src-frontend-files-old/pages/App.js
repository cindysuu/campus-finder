import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home.tsx';
import Login from './login.tsx';
import Register from './register.tsx';
// import { AuthProvider } from './contexts/AuthContext';  // Import the AuthProvider

function App() {
  return (
    // <>
    //   <h1>Vite + React</h1>
    // </>
    <Router>
      <Routes>
      {/* Redirect to Register for now */}
        {/* <Route exact path="/">
          <Redirect to="/register" /> 
        </Route> */}
        
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        {/* <Route path="/" exact component={Home} /> */}
        {/* <Route path="/login" component={Login} />
        <Route path="/register" component={Register} /> */}
        
      </Routes>
    </Router>
  );
}

export default App;
