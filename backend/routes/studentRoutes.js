const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');




router.post('/register', studentController.registerStudent);
router.post('/login', studentController.loginStudent);


router.use(protect);


router.get('/', studentController.getAllStudents); 


router.get('/profile', studentController.getProfile);


router.put('/profile', studentController.updateProfile);


router.get('/:id', studentController.getStudentById);  


router.put('/:id', studentController.updateStudent);


router.delete('/:id', studentController.deleteStudent);


router.get('/:id/applications', studentController.getStudentApplications);

module.exports = router;