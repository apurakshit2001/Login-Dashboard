import React, { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { AuthContext } from '../CreateContext/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { setLoggedin } = useContext(AuthContext);
    const [userData, setUserData] = useState({ email: '', password: '' });
    const [anchorEl, setAnchorEl] = useState(null);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setLoggedin(false);
        sessionStorage.setItem('loggedin', false);  
        handleMenuClose();
    };

    useEffect(() => {
        const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        if (storedUserData) {
            setUserData(storedUserData);
        }
    }, []);

    const menuId = 'profile-account-menu';

    return (
        <div className='dashboard' style={{ textAlign: 'center', color: 'white' }}>
            <Box sx={{ flexGrow: 1 }} onClick={handleProfileMenuOpen}>
                <i className="fa-solid fa-user" style={{ cursor: 'pointer', color: 'white', fontSize: '30px', padding: '15px', border: '2px solid white', borderRadius: '50%'}}></i>
            </Box>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id={menuId}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleLogout}><span className='link'>Log Out</span></MenuItem>
            </Menu>

            <div className="content">
            <h1>User Email: {userData.email}</h1>
            <h1>Password: {userData.password}</h1>
            </div>
        </div>
    );
};

export default Dashboard;
