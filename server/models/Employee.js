
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    image: String,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobileNo: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/,
    },
    designation: {
        type: String,
        enum: ['HR', 'Manager', 'Sales', 'Admin'], // Add 'Admin' if relevant for designation
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
    },
    course: {
        type: [String], // Change to an array of strings
        enum: ['MCA', 'BCA', 'BSC'], // Accepted values
        default: [], // Default to an empty array
    },
    isAdmin: {
        type: Boolean,
        default: false, // Set this to true for admin users
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
