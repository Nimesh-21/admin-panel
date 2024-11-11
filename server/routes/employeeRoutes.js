const express = require('express');
const multer = require('multer');
const router = express.Router();
const Employee = require('../models/Employee');
const { log } = require('console');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Store images in "public/images"
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// File filter to accept only jpg and png
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Only .jpg and .png files are allowed'), false); // Reject file with custom error
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Create Employee with image upload
router.post('/create', (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            // If Multer error due to invalid file type
            return res.status(400).json({ success: false, message: err.message });
        }
        
        try {
            const { name, email, mobileNo, designation, gender, course, password } = req.body;
            const image = req.file ? req.file.filename : null;

            const employee = new Employee({
                name,
                email,
                mobileNo,
                designation,
                gender,
                course,
                password,
                image, // Save image filename in the database
            });

            await employee.save();
            res.status(201).send({ success: true, employee });
        } catch (error) {
            console.error('Error creating employee:', error);
            res.status(400).send({ success: false, error: error.message });
        }
    });
});

// Get All Employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find().skip(1);
        res.send(employees);
        // console.log(employees);
        
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send();
        }
        res.send(employee);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update Employee
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, mobileNo, designation, gender, course } = req.body;
        const image = req.file ? req.file.filename : null;

        // Build update object dynamically
        const updateData = {
            name,
            email,
            mobileNo,
            designation,
            gender,
            course: course ? course.split(',') : [], // Split course back into an array
        };
        if (image) updateData.image = image; // Only add `image` if a new file was uploaded

        // Find the employee by ID and update
        const employee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.json({ success: true, employee });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(400).json({ success: false, error: error.message });
    }
});

// Delete Employee
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).send();
        }
        res.send(employee);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
