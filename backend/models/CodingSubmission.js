const mongoose = require('mongoose');

const CodingSubmissionSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CodingChallenge',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        default: 'javascript'
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'failed', 'timeout', 'error', 'solved', 'wrong'],
        default: 'pending'
    },
    score: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    testResults: {
        type: [String],
        default: []
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

CodingSubmissionSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('CodingSubmission', CodingSubmissionSchema);