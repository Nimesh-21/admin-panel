import React, { useState } from 'react';
import axios from 'axios';

function EmployeeForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/employees/create', formData);
            alert('Employee created successfully');
            setFormData({
                name: '',
                email: '',
                mobileNo: '',
                designation: '',
                gender: '',
                course: '',
            });
        } catch (error) {
            alert('Error creating employee');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="Mobile No" required />
            <select name="designation" value={formData.designation} onChange={handleChange}>
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>
            <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
            <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
            <input type="checkbox" name="course" value="MCA" onChange={handleChange} /> MCA
            <input type="checkbox" name="course" value="BCA" onChange={handleChange} /> BCA
            <input type="checkbox" name="course" value="BSC" onChange={handleChange} /> BSC
            <button type="submit">Submit</button>
        </form>
    );
}

export default EmployeeForm;
