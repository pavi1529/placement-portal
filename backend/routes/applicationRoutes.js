const express = require('express');
const router = express.Router();
const Application = require('../models/Application');


router.get('/', async (req, res) => {
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

        res.json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        console.error('❌ Get Applications Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.get('/:id', async (req, res) => {
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

        res.json({
            success: true,
            data: application
        });
    } catch (error) {
        console.error('❌ Get Application Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.post('/', async (req, res) => {
    try {
        const { student, job, status, notes } = req.body;

        
        const existingApplication = await Application.findOne({ student, job });
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: 'Already applied for this job'
            });
        }

        const application = new Application({
            student,
            job,
            status: status || 'Pending',
            notes: notes || '',
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
        console.error('❌ Create Application Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['Pending', 'Shortlisted', 'Selected', 'Rejected', 'Withdrawn'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status, updatedAt: new Date() },
            { new: true }
        )
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

        res.json({
            success: true,
            message: 'Application status updated successfully',
            data: application
        });
    } catch (error) {
        console.error('❌ Update Application Status Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
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

        res.json({
            success: true,
            message: 'Application updated successfully',
            data: application
        });
    } catch (error) {
        console.error('❌ Update Application Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.json({
            success: true,
            message: 'Application deleted successfully'
        });
    } catch (error) {
        console.error('❌ Delete Application Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

router.get('/student/:studentId', async (req, res) => {
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

        res.json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        console.error('❌ Get Student Applications Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.get('/job/:jobId', async (req, res) => {
    try {
        const applications = await Application.find({ job: req.params.jobId })
            .populate('student', 'name email department cgpa')
            .sort({ appliedDate: -1 });

        res.json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        console.error('❌ Get Job Applications Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.get('/status/:status', async (req, res) => {
    try {
        const status = req.params.status;
        const validStatuses = ['Pending', 'Shortlisted', 'Selected', 'Rejected', 'Withdrawn'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const applications = await Application.find({ status })
            .populate('student', 'name email department cgpa')
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    select: 'name email'
                }
            })
            .sort({ appliedDate: -1 });

        res.json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        console.error('❌ Get Applications By Status Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

module.exports = router;