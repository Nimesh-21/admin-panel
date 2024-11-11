const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const Employee = require('./models/Employee'); 
const authRoutes = require('./routes/authRoutes'); // Import authRoutes
const employeeRoutes = require('./routes/employeeRoutes'); // Import employeeRoutes
const path = require('path');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000' // Allow only requests from this origin
}));

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Connect to MongoDB
mongoose.connect('mongodb+srv://nimeshnike2106:4HQhF7XirjDkpkT7@cluster0.q4bfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    createDefaultAdmin(); // Ensure default admin exists
}).catch((error) => console.error('Failed to connect to MongoDB', error));

// Function to create default admin
async function createDefaultAdmin() {
    try {
        const adminExists = await Employee.findOne({ email: 'admin@example.com', isAdmin: true });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            const admin = new Employee({
                name: 'Admin',
                email: 'admin@example.com',
                mobileNo: '0000000000',
                designation: 'Admin',
                isAdmin: true,
                password: hashedPassword,
            });
            await admin.save();
            console.log('Default admin created with email: admin@example.com and password: admin123');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error creating default admin:', error);
    }
}

// Register auth routes
app.use('/api/employees', employeeRoutes);
app.use('/api', authRoutes); // Registering the route for authRoutes



app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
