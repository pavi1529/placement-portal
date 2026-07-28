const User = require('../models/User');
const Company = require('../models/Company');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Test = require('../models/Test');
const Question = require('../models/Question');
const Notification = require('../models/Notification');


exports.getDashboardStats = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalCompanies = await Company.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();
        const totalTests = await Test.countDocuments();
        const totalQuestions = await Question.countDocuments();

       
        const recentStudents = await User.find({ role: 'student' })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name email department cgpa createdAt');

        
        const recentJobs = await Job.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('company', 'name');

        res.status(200).json({
            success: true,
            data: {
                stats: {
                    totalStudents,
                    totalCompanies,
                    totalJobs,
                    totalApplications,
                    totalTests,
                    totalQuestions
                },
                recentStudents,
                recentJobs
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' })
            .sort({ createdAt: -1 })
            .select('-password');
        
        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await User.findById(req.params.id)
            .select('-password');
        
        if (!student || student.role !== 'student') {
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
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const { name, email, department, cgpa, phone, year } = req.body;
        
        const student = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, department, cgpa, phone, year },
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!student) {
            return res.status(404).json({ 
                success: false, 
                message: 'Student not found' 
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Student updated successfully',
            data: student
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const student = await User.findByIdAndDelete(req.params.id);
        
        if (!student) {
            return res.status(404).json({ 
                success: false, 
                message: 'Student not found' 
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Student deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: companies.length,
            data: companies
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        
        if (!company) {
            return res.status(404).json({ 
                success: false, 
                message: 'Company not found' 
            });
        }
        
        res.status(200).json({
            success: true,
            data: company
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!company) {
            return res.status(404).json({ 
                success: false, 
                message: 'Company not found' 
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Company updated successfully',
            data: company
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        
        if (!company) {
            return res.status(404).json({ 
                success: false, 
                message: 'Company not found' 
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Company deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate('company', 'name email')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('company', 'name email');
        
        if (!job) {
            return res.status(404).json({ 
                success: false, 
                message: 'Job not found' 
            });
        }
        
        res.status(200).json({
            success: true,
            data: job
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('company', 'name');
        
        if (!job) {
            return res.status(404).json({ 
                success: false, 
                message: 'Job not found' 
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Job updated successfully',
            data: job
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        
        if (!job) {
            return res.status(404).json({ 
                success: false, 
                message: 'Job not found' 
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Job deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('student', 'name email department cgpa')
            .populate('job', 'title company')
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    select: 'name'
                }
            })
            .sort({ appliedDate: -1 });
        
        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        if (!application) {
            return res.status(404).json({ 
                success: false, 
                message: 'Application not found' 
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Application status updated',
            data: application
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: questions.length,
            data: questions
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.createQuestion = async (req, res) => {
    try {
        const { question, options, correctAnswer, category, difficulty } = req.body;
        
        const newQuestion = new Question({
            question,
            options,
            correctAnswer,
            category,
            difficulty
        });
        
        await newQuestion.save();
        
        res.status(201).json({
            success: true,
            message: 'Question created successfully',
            data: newQuestion
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!question) {
            return res.status(404).json({ 
                success: false, 
                message: 'Question not found' 
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Question updated successfully',
            data: question
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        
        if (!question) {
            return res.status(404).json({ 
                success: false, 
                message: 'Question not found' 
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Question deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find()
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.createNotification = async (req, res) => {
    try {
        const { title, message, type, target } = req.body;
        
        const notification = new Notification({
            title,
            message,
            type,
            target: target || 'all'
        });
        
        await notification.save();
        
        res.status(201).json({
            success: true,
            message: 'Notification created successfully',
            data: notification
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        
        if (!notification) {
            return res.status(404).json({ 
                success: false, 
                message: 'Notification not found' 
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Notification deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};