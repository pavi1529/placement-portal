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
    phone: {
        type: String,
        default: ''
    },
    year: {
        type: Number,
        default: 1
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

UserSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('User', UserSchema);