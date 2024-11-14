// AuthContext.jsx
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [loggedin, setLoggedin] = useState(
        JSON.parse(sessionStorage.getItem('loggedin')) || false
    );
    const navigate = useNavigate();

    const handleLoginClick = () => {
        setIsLogin(true);
    };

    const handleSignupClick = () => {
        setIsLogin(false);
    };

    const handleSignupSubmit = (values) => {
        const { email, password, confirmPassword } = values;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const userData = { email, password };
        sessionStorage.setItem('userData', JSON.stringify(userData));
        alert('Signup successful! Please log in.');
        setIsLogin(true);
    };

    const handleLoginSubmit = (values) => {
        const { email, password } = values;

        const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        if (storedUserData?.email === email && storedUserData?.password === password) {
            alert('Login successful');
            setLoggedin(true);
            sessionStorage.setItem('loggedin', true);
            navigate('/dashboard');
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <AuthContext.Provider value={{
            isLogin,
            loggedin,
            setLoggedin,
            handleLoginClick,
            handleSignupClick,
            handleLoginSubmit,
            handleSignupSubmit,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
