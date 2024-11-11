
import React from 'react';
import Navbar from './Navbar';
import './common.css';

function Dashboard() {
    return (
        <div>
            <Navbar />
            <div className="content">
                <h2>Welcome to the Admin Dashboard</h2>
            </div>
        </div>
    );
}

export default Dashboard;
