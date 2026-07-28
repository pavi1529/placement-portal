const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Test title is required']
    },
    description: {
        type: String,
        required: [true, 'Test description is required']
    },
    type: {
        type: String,
        enum: ['aptitude', 'coding', 'technical', 'mock'],
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    duration: {
        type: Number, 
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    passingMarks: {
        type: Number,
        required: true
    },
    companies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    scheduledDate: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Test', TestSchema);