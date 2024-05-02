
// React page for user login

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Authentication.css';
import LOC8Image from '../LOC8.png';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #2e6a89;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

function Login() {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, [e.target.name]: e.target.value}); // Update the user data
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', userData); // Send a POST request to the server
            localStorage.setItem('userToken', response.data.token)
            navigate('/home')
        } catch (error) {
            alert('Invalid credentials!');
        }
    }

    return (
        <>
        <GlobalStyle />
        <Container>
            <div className="image-container">
                <img src={LOC8Image.toString()} alt="Logo" className="form-image" />
            </div>
            <div className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required />
                    <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
                <div className="form-footer">
                    Not a user yet? <a href="/register">Register!</a>
                </div>
            </div>
        </Container>
        </>
    );
}

export default Login;
