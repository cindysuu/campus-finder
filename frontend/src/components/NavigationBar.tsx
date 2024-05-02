import React, { useState } from 'react';
import '../styles/NavigationBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }
`;

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <GlobalStyle />
    <nav className="navbar">
      <div className="navbar-header">
        <div className="logo">LOC8</div>

        <button className="toggle-button" onClick={toggleNav}>
          {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
        </button>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <a href="/home">Home</a>
          <a href="/profile">Profile</a>
          <a href="/friends">Friends</a>
          {/* <a href="/faq">FAQ</a> */}
        </div>
      </div>
    </nav>
    </>
  );
};

export default NavigationBar;
