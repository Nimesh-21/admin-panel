
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './common.css';
import './EmployeeList.css';
import Navbar from './Navbar';

function EmployeeList() {
    const [username, setUsername] = useState('');
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || 'Admin';
        setUsername(storedUsername);
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/employees');
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/employees/${id}`, {
                method: 'DELETE',
            });
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        window.location.href = '/login';
    };

    const filteredEmployees = employees.filter((employee) => 
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Navbar username={username} handleLogout={handleLogout} />
            <div className="sidebar">Employee List</div>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="employee-count">Total Employees: {filteredEmployees.length}</span>
            </div>

            <div className="employee-table">
                <table>
                    <thead>
                        <tr>
                            <th>Unique ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee._id}</td>
                                <td>
                                    <img
                                        src={employee.image ? `http://localhost:5000/images/${employee.image}` : 'http://localhost:5000/images/default.jpg'}
                                        alt="Profile"
                                        width="50"
                                        height="50"
                                    />
                                </td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.mobileNo}</td>
                                <td>{employee.designation}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.course}</td>
                                <td>{new Date(employee.createdAt).toLocaleDateString()}</td> {/* Format createdAt */}
                                <td>
                                    <Link to={`/edit/${employee._id}`}>Edit</Link> | 
                                    <button onClick={() => handleDelete(employee._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeeList;
