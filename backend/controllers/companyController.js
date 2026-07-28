const Company = require('../models/Company');
const Job = require('../models/Job');


exports.addCompany = async (req, res) => {
    try {
        const newCompany = new Company(req.body);
        await newCompany.save();
        res.status(201).json({ message: "Company profile created!", newCompany });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.addJob = async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).json({ message: "Placement job published successfully!", newJob });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('company').sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};