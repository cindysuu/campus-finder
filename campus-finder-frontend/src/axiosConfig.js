// In axiosConfig.js
// Set up Axios configurations
import axios from 'axios';

axios.interceptors.request.use(
    config => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);