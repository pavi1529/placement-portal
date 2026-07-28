const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');



router.get('/', jobController.getAllJobs);           
router.get('/:id', jobController.getJobById);        


router.use(protect);


router.post('/', jobController.createJob);          

router.put('/:id', jobController.updateJob);         


router.delete('/:id', jobController.deleteJob);     


router.get('/company/:companyId', jobController.getJobsByCompany);


router.post('/:id/apply', jobController.applyForJob);

module.exports = router;