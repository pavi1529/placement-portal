const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');




router.use(protect);


router.get('/', notificationController.getAllNotifications);  


router.post('/', notificationController.createNotification); 


router.get('/:id', notificationController.getNotificationById); 


router.put('/:id', notificationController.updateNotification);  


router.delete('/:id', notificationController.deleteNotification); 


router.put('/:id/read', notificationController.markAsRead);  


router.get('/unread', notificationController.getUnreadNotifications);  


router.put('/mark-all-read', notificationController.markAllAsRead);  


module.exports = router;