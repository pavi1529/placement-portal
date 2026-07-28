const mongoose = require('mongoose');

const CodingChallengeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'easy'
    },
    language: {
        type: String,
        enum: ['javascript', 'python', 'java', 'cpp', 'csharp', 'go', 'rust', 'typescript'],
        default: 'javascript'
    },
    testCases: {
        type: [String],
        default: []
    },
    solution: {
        type: String,
        default: ''
    },
    points: {
        type: Number,
        default: 10,
        min: 0
    },
    timeLimit: {
        type: Number,
        default: 30,
        min: 0
    },
    category: {
        type: String,
        enum: ['algorithms', 'data-structures', 'web', 'database', 'system-design', 'other'],
        default: 'algorithms'
    },
    starterCode: {
        type: String,
        default: ''
    },
    constraints: {
        type: String,
        default: ''
    },
    examples: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Archived'],
        default: 'Active'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

CodingChallengeSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('CodingChallenge', CodingChallengeSchema);