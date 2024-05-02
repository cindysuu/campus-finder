import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Store token and isAuthenticated state in context
export const AuthProvider = ({ children }) => {
    
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token'), // Initialize state from localStorage
        isAuthenticated: !!localStorage.getItem('token')
    });

    const setAuthInfo = ({ token }) => {
        localStorage.setItem('token', token); // Save token to localStorage
        setAuthState({
            token,
            isAuthenticated: true
        });
    };

    const logout = () => {
        localStorage.removeItem('token'); // Clear token from localStorage
        setAuthState({
            token: null,
            isAuthenticated: false
        });
    };

    console.log("AuthState:", authState);   // Debugging purposes

    return (
        <AuthContext.Provider value={{ ...authState, setAuthInfo, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);