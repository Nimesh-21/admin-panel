
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './common.css';
import './CreateEmployee.css';
import Navbar from './Navbar';

function CreateEmployee() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || 'Admin';
        setUsername(storedUsername);
    }, []);

    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: '',
        password: '',
        image: null, // File object for image
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setEmployee({ ...employee, image: files[0] }); // Store the selected file
        } else {
            setEmployee({ ...employee, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('mobileNo', employee.mobileNo);
        formData.append('designation', employee.designation);
        formData.append('gender', employee.gender);
        formData.append('course', employee.course);
        formData.append('password', employee.password);
        if (employee.image) formData.append('image', employee.image); // Append image if selected

        try {
            const response = await fetch('http://localhost:5000/api/employees/create', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Employee created successfully');
                setEmployee({ name: '', email: '', mobileNo: '', designation: '', gender: '', course: '', password: '', image: null });
                navigate('/employees');
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to create employee'); // Display the error message in an alert
            }
        } catch (error) {
            console.error('Error creating employee:', error);
            alert('An error occurred while creating the employee.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        window.location.href = '/login';
    };

    return (
        <div>
            <Navbar username={username} handleLogout={handleLogout} />
            <div className="sidebar">Create Employee</div>
            <div className="content">
                <form className="employee-form" onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleChange} required />

                    <label>Email</label>
                    <input type="email" name="email" onChange={handleChange} required />

                    <label>Mobile No</label>
                    <input type="text" name="mobileNo" onChange={handleChange} required />

                    <label>Designation</label>
                    <select name="designation" onChange={handleChange} required>
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>

                    <label>Password</label>
                    <input type="password" name="password" onChange={handleChange} required />

                    <label>Gender</label>
                    <input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male
                    <input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female

                    <label>Course</label>
                    <input type="checkbox" name="course" value="MCA" onChange={handleChange} /> MCA
                    <input type="checkbox" name="course" value="BCA" onChange={handleChange} /> BCA
                    <input type="checkbox" name="course" value="BSC" onChange={handleChange} /> BSC

                    <label>Upload Image</label>
                    <input type="file" name="image" onChange={handleChange} />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateEmployee;
