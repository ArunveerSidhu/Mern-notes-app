import React, { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

// Export the context
export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token)
        const decoded = jwtDecode(token)
        console.log('Decoded token:', decoded);
        setUser(decoded)
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    const value = {
        user,
        login,
        logout
    };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}