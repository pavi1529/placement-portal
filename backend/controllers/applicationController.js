const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');




exports.getAllApplications = async (req, res) => {  
    try {
        const applications = await Application.find()
            .populate('student', 'name email department cgpa')
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    select: 'name email'
                }
            })
            .sort({ appliedDate: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.createApplication = async (req, res) => { 
    try {
        const { jobId, studentId } = req.body;

        
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        
        const student = await User.findById(studentId);
        if (!student || student.role !== 'student') {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        
        const existingApplication = await Application.findOne({
            job: jobId,
            student: studentId
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: 'You have already applied for this job'
            });
        }

        
        const application = new Application({
            job: jobId,
            student: studentId,
            status: 'pending',
            appliedDate: new Date()
        });

        await application.save();

       
        const populatedApplication = await Application.findById(application._id)
            .populate('student', 'name email department cgpa')
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    select: 'name email'
                }
            });

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            data: populatedApplication
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

exports.getApplicationById = async (req, res) => {  // ✅ This function must exist
    try {
        const application = await Application.findById(req.params.id)
            .populate('student', 'name email department cgpa')
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    select: 'name email'
                }
            });

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.updateApplicationStatus = async (req, res) => {  // ✅ This function must exist
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'reviewed', 'shortlisted', 'accepted', 'rejected'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
        .populate('student', 'name email')
        .populate({
            path: 'job',
            populate: {
                path: 'company',
                select: 'name'
            }
        });

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Application status updated successfully',
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.updateApplication = async (req, res) => {  // ✅ This function must exist
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        .populate('student', 'name email')
        .populate({
            path: 'job',
            populate: {
                path: 'company',
                select: 'name'
            }
        });

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Application updated successfully',
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.deleteApplication = async (req, res) => {  // ✅ This function must exist
    try {
        const application = await Application.findByIdAndDelete(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Application deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.getApplicationsByStudent = async (req, res) => {
    try {
        const applications = await Application.find({ student: req.params.studentId })
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    select: 'name email'
                }
            })
            .sort({ appliedDate: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.getApplicationsByJob = async (req, res) => {
    try {
        const applications = await Application.find({ job: req.params.jobId })
            .populate('student', 'name email department cgpa')
            .sort({ appliedDate: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.withdrawApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status: 'withdrawn' },
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
            message: 'Application withdrawn successfully',
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};