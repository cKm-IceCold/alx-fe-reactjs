import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authTokens) {
            try {
                const decodedUser = jwtDecode(authTokens.access);
                setUser(decodedUser);
            } catch (error) {
                console.error("Invalid token:", error);
                logout();
            }
        }
        setLoading(false);
    }, [authTokens]);

    const loginUser = async (username, password) => {
        try {
            const response = await api.post('token/', { username, password });
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access));
            localStorage.setItem('authTokens', JSON.stringify(response.data));
            api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access;
            return true;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        delete api.defaults.headers.common['Authorization'];
    };

    const registerUser = async (userData) => {
        try {
            await api.post('users/', userData);
            return true;
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

    const contextData = {
        user,
        authTokens,
        loginUser,
        logout,
        registerUser,
        loading
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
