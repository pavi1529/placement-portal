const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
       
    },
    tier: {
        type: String,
        enum: ['Product', 'Services', 'Startup'],
        default: 'Product'
    },
    minCgpa: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    openRoles: {
        type: Number,
        default: 0,
        min: 0
    },
    description: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Company', CompanySchema);