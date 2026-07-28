const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question is required']
    },
    category: {
        type: String,
        enum: ['Aptitude', 'C/C++', 'Java', 'Python', 'DBMS', 'Technical'],
        default: 'Aptitude'
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    options: {
        type: [String],
        required: [true, 'Options are required'],
        validate: {
            validator: function(v) {
                return v && v.length >= 2;
            },
            message: 'At least 2 options are required'
        }
    },
    correctAnswer: {
        type: String,
        required: [true, 'Correct answer is required']
    },
    status: {
        type: String,
        enum: ['Draft', 'Published', 'Archived'],
        default: 'Draft'
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


QuestionSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Question', QuestionSchema);