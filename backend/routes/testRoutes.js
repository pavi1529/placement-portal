const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const { protect } = require('../middleware/authMiddleware');




router.get('/', testController.getAllTests);           
router.get('/:id', testController.getTestById);        


router.use(protect);


router.post('/', testController.createTest);          


router.put('/:id', testController.updateTest);         


router.delete('/:id', testController.deleteTest);     


router.get('/:id/questions', testController.getTestQuestions);


router.post('/:id/submit', testController.submitTest);


router.get('/:id/results', testController.getTestResults);

module.exports = router;