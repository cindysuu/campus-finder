// React page for user registration

import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, [e.target.name]: e.target.value}); // Update the user data
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', userData); // Send a POST request to the server
            console.log('User registered:', response.data);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
        // <div>
        //     <h1>Register</h1>
        //     <form>
        //         {/* Form fields for registration */}
        //     </form>
        // </div>
    );
}

export default Register;
