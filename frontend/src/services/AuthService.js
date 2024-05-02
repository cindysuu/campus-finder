// src/services/AuthService.js
import axios from 'axios';

// const API_URL = 'http://localhost:3000/login';
const API_URL = 'http://localhost:3000/';

const register = (name, email, password) => {
  return axios.post(API_URL + 'register', { name, email, password });
};

const login = async (email, password) => {
  const response = await axios.post(API_URL + 'login', { email, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout
};

export default authService;


/*export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_URL, { email, password });
    console.log('Logged in:', response.data);
    return response.data; // returning the response might be useful for further processing
  } catch (error) {
    console.error('Login error:', error.response);
    throw error; // re-throw the error if you want to handle it in the component
  }
};*/
