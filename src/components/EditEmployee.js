
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditEmployee.css';
import './common.css';

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: [],
        image: null,
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/employees/${id}`);
                const data = await response.json();
                setEmployee({
                    ...data,
                    course: Array.isArray(data.course) ? data.course : [data.course],
                });
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, files, checked } = e.target;
        if (type === "file") {
            setEmployee({ ...employee, image: files[0] });
        } else if (type === "checkbox") {
            setEmployee((prevEmployee) => ({
                ...prevEmployee,
                course: checked
                    ? [...prevEmployee.course, value]
                    : prevEmployee.course.filter((c) => c !== value),
            }));
        } else if (type === "radio") {
            setEmployee({ ...employee, [name]: value });
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
        formData.append('course', employee.course.join(','));
        if (employee.image) formData.append('image', employee.image);

        try {
            const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                alert('Employee updated successfully');
                navigate('/employees');
            } else {
                alert('Failed to update employee');
            }
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div className="edit-employee-container">
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={employee.name} onChange={handleChange} required />

                <label>Email</label>
                <input type="email" name="email" value={employee.email} onChange={handleChange} required />

                <label>Mobile No</label>
                <input type="text" name="mobileNo" value={employee.mobileNo} onChange={handleChange} required />

                <label>Designation</label>
                <select name="designation" value={employee.designation} onChange={handleChange} required>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                </select>

                <label>Gender</label>
                <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={employee.gender === 'Male'}
                    onChange={handleChange}
                /> Male
                <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={employee.gender === 'Female'}
                    onChange={handleChange}
                /> Female

                <label>Course</label>
                <input
                    type="checkbox"
                    name="course"
                    value="MCA"
                    checked={employee.course.includes('MCA')}
                    onChange={handleChange}
                /> MCA
                <input
                    type="checkbox"
                    name="course"
                    value="BCA"
                    checked={employee.course.includes('BCA')}
                    onChange={handleChange}
                /> BCA
                <input
                    type="checkbox"
                    name="course"
                    value="BSC"
                    checked={employee.course.includes('BSC')}
                    onChange={handleChange}
                /> BSC

                <label>Upload New Image</label>
                <input type="file" name="image" onChange={handleChange} />

                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
}

export default EditEmployee;
