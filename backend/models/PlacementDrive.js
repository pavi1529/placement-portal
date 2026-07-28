const mongoose = require('mongoose');

const PlacementDriveSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Job role is required'],
    trim: true
  },
  package: {
    type: String,
    required: [true, 'Package is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  workMode: {
    type: String,
    enum: ['Onsite', 'Hybrid', 'Remote'],
    default: 'Onsite'
  },
  eligibleDepts: {
    type: [String],
    default: ['CSE', 'IT', 'ECE']
  },
  minCgpa: {
    type: String,
    required: [true, 'Minimum CGPA is required']
  },
  eligibleBatch: {
    type: String,
    required: [true, 'Eligible batch is required']
  },
  selectionProcess: {
    type: [String],
    default: ['Aptitude Test', 'Technical Interview', 'HR Interview']
  },
  regDeadline: {
    type: Date,
    required: [true, 'Registration deadline is required']
  },
  driveDate: {
    type: Date,
    required: [true, 'Drive date is required']
  },
  driveTime: {
    type: String,
    default: '10:00 AM'
  },
  openings: {
    type: Number,
    default: 10,
    min: 1
  },
  description: {
    type: String,
    trim: true
  },
  requiredSkills: {
    type: [String],
    default: []
  },
  eligibilityCriteria: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Eligible', 'Applied', 'Shortlisted', 'Selected', 'Rejected'],
    default: 'Eligible'
  },
  color: {
    type: String,
    default: '#4f46e5'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  applications: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    status: {
      type: String,
      enum: ['Applied', 'Shortlisted', 'Selected', 'Rejected'],
      default: 'Applied'
    },
    appliedDate: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('PlacementDrive', PlacementDriveSchema);