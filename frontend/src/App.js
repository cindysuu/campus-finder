import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.tsx';
import Login from './pages/login.tsx';
import Register from './pages/register.tsx';
import Profile from './pages/profile.tsx';
import Test from './pages/test.tsx';
import Friends from './pages/friends.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/test" element={<Test />} />
        <Route exact path="/friends" element={<Friends />} />
      </Routes>
    </Router>
  );
}

export default App;
