import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check for a logged-in user when the app first loads
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('auth_token');
            if (token) {
                try {
                    const response = await authAPI.getCurrentUser();
                    setCurrentUser(response.data.user);
                } catch (err) {
                    console.error('Auth check failed:', err);
                    localStorage.removeItem('auth_token');
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    // Global Login Function
    const login = async (email, password) => {
        try {
            setError(null);
            const response = await authAPI.login(email, password);
            const { token, user } = response.data;
            
            localStorage.setItem('auth_token', token);
            setCurrentUser(user);
            return user;
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Login failed';
            setError(errorMsg);
            throw err;
        }
    };

    // Global Register Function
    const register = async (userData) => {
        try {
            setError(null);
            const response = await authAPI.register(userData);
            const { token, user } = response.data;
            
            localStorage.setItem('auth_token', token);
            setCurrentUser(user);
            return user;
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Registration failed';
            setError(errorMsg);
            throw err;
        }
    };

    // Global Logout Function
    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (err) {
            console.error('Logout error:', err);
        }
        localStorage.removeItem('auth_token');
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, register, logout, loading, error }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// 3. Create a custom hook to make it super easy to use anywhere
export const useAuth = () => useContext(AuthContext);