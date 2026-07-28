const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'admin', 'company'],
        default: 'student'
    },
    department: {
        type: String,
        enum: ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT'],
        default: 'CSE'
    },
    cgpa: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);