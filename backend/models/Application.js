const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Student is required']
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'Job is required']
    },
    status: {
        type: String,
        enum: ['Pending', 'Shortlisted', 'Selected', 'Rejected', 'Withdrawn'],
        default: 'Pending'
    },
    notes: {
        type: String,
        default: ''
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


ApplicationSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Application', ApplicationSchema);