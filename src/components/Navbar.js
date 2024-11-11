
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './common.css';

function Navbar() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        // Retrieve the username from local storage
        const storedUsername = localStorage.getItem('name') || 'Admin';
        setUsername(storedUsername);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username'); // Clear the username from local storage
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="navbar">
            <span>Logo</span>
            <Link to="/">Home</Link>
            <Link to="/employees">Employee List</Link>
            <Link to="/create">Create Employee</Link>
            <span>{username} - <button onClick={handleLogout} className="logout-button">Logout</button></span>
        </div>
    );
}

export default Navbar;
