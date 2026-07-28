const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const mongoose = require('mongoose');
const User = mongoose.model('User');


router.get('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('❌ Get Profile Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

router.put('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const { name, email, currentPassword, newPassword } = req.body;

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (name) user.name = name;
        if (email) user.email = email;

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: 'Current password is incorrect'
                });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        await user.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('❌ Update Profile Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.get('/students', async (req, res) => {
    try {
        const students = await User.find({ role: 'student' }).select('-password');
        res.json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        console.error('❌ Get Students Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch students',
            error: error.message 
        });
    }
});


router.post('/students', async (req, res) => {
    try {
        console.log('📝 Add student request:', req.body);
        
        const { name, email, password, department, cgpa, phone, year, role } = req.body;
        
        
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Student already exists with this email'
            });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password || 'Student@123', salt);

        
        const student = new User({
            name,
            email,
            password: hashedPassword,
            department: department || 'CSE',
            cgpa: cgpa || 0,
            phone: phone || '',
            year: year || 1,
            role: role || 'student'
        });

        await student.save();

        console.log('✅ Student added:', student.email);

        res.status(201).json({
            success: true,
            message: 'Student added successfully',
            data: {
                id: student._id,
                name: student.name,
                email: student.email,
                department: student.department,
                cgpa: student.cgpa,
                role: student.role
            }
        });
    } catch (error) {
        console.error('❌ Add Student Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add student',
            error: error.message
        });
    }
});


router.get('/students/:id', async (req, res) => {
    try {
        const student = await User.findById(req.params.id).select('-password');
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        res.json({ 
            success: true, 
            data: student 
        });
    } catch (error) {
        console.error('❌ Get Student Error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});


router.put('/students/:id', async (req, res) => {
    try {
        const student = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Student updated successfully',
            data: student
        });
    } catch (error) {
        console.error('❌ Update Student Error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});


router.delete('/students/:id', async (req, res) => {
    try {
        const student = await User.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        res.json({
            success: true,
            message: 'Student deleted successfully'
        });
    } catch (error) {
        console.error('❌ Delete Student Error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});


router.get('/dashboard', async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalCompanies = 0;
        const totalJobs = 0;
        const totalApplications = 0;
        const totalTests = 0;

        res.json({
            success: true,
            data: {
                stats: {
                    totalStudents,
                    totalCompanies,
                    totalJobs,
                    totalApplications,
                    totalTests
                }
            }
        });
    } catch (error) {
        console.error('❌ Dashboard Stats Error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

module.exports = router;