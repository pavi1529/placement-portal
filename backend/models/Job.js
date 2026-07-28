const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required']
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: [true, 'Company is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    requirements: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    salary: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contract'],
        default: 'full-time'
    },
    category: {
        type: String,
        default: ''
    },
    experience: {
        type: String,
        default: ''
    },
    deadline: {
        type: Date,
        default: null
    },
    positions: {
        type: Number,
        default: 1
    },
    status: {
        type: String,
        enum: ['Active', 'Closed', 'Pending'],
        default: 'Active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

JobSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Job', JobSchema);