import { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for a logged-in user when the app first loads
    useEffect(() => {
        const userId = localStorage.getItem("current_logged_in_user");
        const db = JSON.parse(localStorage.getItem("hrims_users_db") || "{}");
        
        if (userId && db[userId]) {
            setCurrentUser(db[userId]);
        }
        setLoading(false); // Finished checking
    }, []);

    // Global Login Function
    const login = (userId) => {
        const db = JSON.parse(localStorage.getItem("hrims_users_db") || "{}");
        if (db[userId]) {
            localStorage.setItem("current_logged_in_user", userId);
            setCurrentUser(db[userId]); // Update global state
            return db[userId]; // Return the user so the form can route them
        }
        return null;
    };

    // Global Logout Function
    const logout = () => {
        localStorage.removeItem("current_logged_in_user");
        setCurrentUser(null); // Clear global state
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// 3. Create a custom hook to make it super easy to use anywhere
export const useAuth = () => useContext(AuthContext);