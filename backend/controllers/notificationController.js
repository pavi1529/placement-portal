const Notification = require('../models/Notification'); 
const User = require('../models/User');




exports.getAllNotifications = async (req, res) => {
    try {
        let query = {};
        
        
        if (req.user.role === 'student') {
            query = {
                $or: [
                    { target: 'all' },
                    { target: 'students' },
                    { target: req.user.id }
                ]
            };
        }
        
        const notifications = await Notification.find(query)
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.createNotification = async (req, res) => {
    try {
        const { title, message, type, target, link } = req.body;

       
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Only admin can create notifications'
            });
        }

        const notification = new Notification({
            title,
            message,
            type: type || 'info',
            target: target || 'all',
            link: link || null,
            createdBy: req.user.id
        });

        await notification.save();

        const populatedNotification = await Notification.findById(notification._id)
            .populate('createdBy', 'name email');

        res.status(201).json({
            success: true,
            message: 'Notification created successfully',
            data: populatedNotification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id)
            .populate('createdBy', 'name email');

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

       
        if (req.user.role === 'student') {
            if (notification.target !== 'all' && 
                notification.target !== 'students' && 
                notification.target !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: 'You do not have access to this notification'
                });
            }
        }

        res.status(200).json({
            success: true,
            data: notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.updateNotification = async (req, res) => {
    try {
        
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Only admin can update notifications'
            });
        }

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('createdBy', 'name email');

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Notification updated successfully',
            data: notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.deleteNotification = async (req, res) => {
    try {
        // Only admin can delete
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Only admin can delete notifications'
            });
        }

        const notification = await Notification.findByIdAndDelete(req.params.id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Notification deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        ).populate('createdBy', 'name email');

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Notification marked as read',
            data: notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.getUnreadNotifications = async (req, res) => {
    try {
        let query = { isRead: false };
        
        if (req.user.role === 'student') {
            query = {
                isRead: false,
                $or: [
                    { target: 'all' },
                    { target: 'students' },
                    { target: req.user.id }
                ]
            };
        }

        const notifications = await Notification.find(query)
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.markAllAsRead = async (req, res) => {
    try {
        let query = { isRead: false };
        
        if (req.user.role === 'student') {
            query = {
                isRead: false,
                $or: [
                    { target: 'all' },
                    { target: 'students' },
                    { target: req.user.id }
                ]
            };
        }

        await Notification.updateMany(query, { isRead: true });

        res.status(200).json({
            success: true,
            message: 'All notifications marked as read'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};