const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Notification title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    message: {
        type: String,
        required: [true, 'Notification message is required'],
        trim: true,
        maxlength: [500, 'Message cannot be more than 500 characters']
    },
    type: {
        type: String,
        enum: ['info', 'success', 'warning', 'error', 'announcement'],
        default: 'info'
    },
    target: {
        type: String,
        enum: ['all', 'students', 'companies', 'admin'],
        default: 'all'
    },
    link: {
        type: String,
        default: null
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);