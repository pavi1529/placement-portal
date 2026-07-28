const express = require('express');
const router = express.Router();
const {
  createPlacementDrive,
  getAllPlacementDrives,
  getPlacementDriveById,
  updatePlacementDrive,
  deletePlacementDrive,
  getDriveStats,
  applyToDrive,
  updateApplicationStatus
} = require('../controllers/placementDriveController');


router.get('/stats', getDriveStats);
router.get('/', getAllPlacementDrives);
router.get('/:id', getPlacementDriveById);


router.post('/', createPlacementDrive);
router.put('/:id', updatePlacementDrive);
router.delete('/:id', deletePlacementDrive);


router.post('/:id/apply', applyToDrive);
router.put('/:id/status', updateApplicationStatus);

module.exports = router;