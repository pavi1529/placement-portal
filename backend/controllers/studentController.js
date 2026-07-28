const Student = require('../models/Student');
const User = require('../models/User');
const bcrypt = require('bcryptjs');


exports.addStudent = async (req, res) => {
  try {
    console.log('📝 Add Student Request:', req.body);
    
    const { name, email, password, department, cgpa, phone, year } = req.body;

   
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });
    }

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'student',
      department: department || 'CSE',
      cgpa: cgpa || 0,
      phone: phone || '',
      year: year || 1,
      isActive: true
    });

    await user.save();

   
    const student = new Student({
      userId: user._id,
      name,
      email,
      department: department || 'CSE',
      cgpa: cgpa || 0,
      phone: phone || '',
      year: year || 1
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        cgpa: user.cgpa
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
};


exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
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
};


exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('❌ Get Student Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student',
      error: error.message
    });
  }
};


exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

   
    await User.findOneAndUpdate(
      { email: student.email },
      { 
        name: req.body.name || student.name,
        department: req.body.department || student.department,
        cgpa: req.body.cgpa || student.cgpa,
        phone: req.body.phone || student.phone,
        year: req.body.year || student.year
      }
    );

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent
    });
  } catch (error) {
    console.error('❌ Update Student Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update student',
      error: error.message
    });
  }
};


exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

   
    student.isActive = false;
    await student.save();

   
    await User.findOneAndUpdate(
      { email: student.email },
      { isActive: false }
    );

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete Student Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete student',
      error: error.message
    });
  }
};