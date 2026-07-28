const Job = require('../models/Job');
const Application = require('../models/Application');
const Company = require('../models/Company');




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
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.getJobById = async (req, res) => { 
    try {
        const job = await Job.findById(req.params.id)
            .populate('company', 'name email phone address');

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
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.createJob = async (req, res) => { 
    try {
        const {
            title,
            company,
            description,
            requirements,
            location,
            salary,
            type,
            category,
            experience,
            deadline,
            positions
        } = req.body;

        
        const companyExists = await Company.findById(company);
        if (!companyExists) {
            return res.status(404).json({
                success: false,
                message: 'Company not found'
            });
        }

        const job = new Job({
            title,
            company,
            description,
            requirements,
            location,
            salary,
            type,
            category,
            experience,
            deadline,
            positions: positions || 1,
            postedBy: req.user.id
        });

        await job.save();

        res.status(201).json({
            success: true,
            message: 'Job created successfully',
            data: job
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
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
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
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
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.getJobsByCompany = async (req, res) => {
    try {
        const jobs = await Job.find({ company: req.params.companyId })
            .populate('company', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.applyForJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const studentId = req.user.id;

       
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
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

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
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