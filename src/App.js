
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee'; // Import EditEmployee
import Login from './components/Login';

function App() {
    const isAuthenticated = !!localStorage.getItem('username'); // Check if user is logged in

    return (
        <Router>
            <Routes>
                {/* Public Route for Login */}
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route 
                    path="/" 
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} 
                />
                <Route 
                    path="/employees" 
                    element={isAuthenticated ? <EmployeeList /> : <Navigate to="/login" replace />} 
                />
                <Route 
                    path="/create" 
                    element={isAuthenticated ? <CreateEmployee /> : <Navigate to="/login" replace />} 
                />
                <Route 
                    path="/edit/:id" // Route for editing an employee
                    element={isAuthenticated ? <EditEmployee /> : <Navigate to="/login" replace />} 
                />

                {/* Catch-all for undefined routes, redirect to login if unauthenticated, or dashboard if authenticated */}
                <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
            </Routes>
        </Router>
    );
}

export default App;
