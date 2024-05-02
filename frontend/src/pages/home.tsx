import React from 'react';
import MapView from '../components/MapView.tsx';  
import NavigationBar from '../components/NavigationBar.tsx';
import '../styles/Home.css';
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
    background-color: #2e6a89;
  }
`;

function Home() {
    return (
      <>
      <GlobalStyle />
        <NavigationBar />
        <h1 className="home-title">Find your friends!</h1>
        <MapView />
      </>
    );
  
  }
  
  export default Home;