const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');




router.get('/', reportController.getAllReports);


router.post('/generate', reportController.generateReport);

module.exports = router;