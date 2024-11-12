// AuthContext.jsx
import React, { createContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
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

    const handleSignupSubmit = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const userData = { email, password };
        sessionStorage.setItem('userData', JSON.stringify(userData));
        alert('Signup successful! Please log in.');
        setIsLogin(true);
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

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
            emailRef,
            passwordRef,
            confirmPasswordRef,
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
