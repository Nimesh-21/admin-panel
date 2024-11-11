
const express = require('express');
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', username, password);

    try {
        // Find the user by email 
        const user = await Employee.findOne({ email: username });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        console.log('User found:', user);

        // Use bcrypt.compare to check the plain password against the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        res.json({ success: true, message: 'Login successful', name: user.name });
    } catch (error) {
        console.error('Error in login endpoint:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
