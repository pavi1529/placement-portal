const PlacementDrive = require('../models/PlacementDrive');


exports.createPlacementDrive = async (req, res) => {
  try {
    const driveData = {
      ...req.body,
      createdBy: req.user?.id || null
    };

    const drive = new PlacementDrive(driveData);
    await drive.save();

    res.status(201).json({
      success: true,
      message: 'Placement drive created successfully',
      data: drive
    });
  } catch (error) {
    console.error('Error creating placement drive:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create placement drive',
      error: error.message
    });
  }
};


exports.getAllPlacementDrives = async (req, res) => {
  try {
    const { status, workMode, search, page = 1, limit = 100 } = req.query;
    
    let query = { isActive: true };
    
    if (status && status !== 'ALL') {
      query.status = status;
    }
    
    if (workMode && workMode !== 'ALL') {
      query.workMode = workMode;
    }
    
    if (search) {
      query.$or = [
        { company: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const drives = await PlacementDrive.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await PlacementDrive.countDocuments(query);

    res.status(200).json({
      success: true,
      data: drives,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching placement drives:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch placement drives',
      error: error.message
    });
  }
};


exports.getPlacementDriveById = async (req, res) => {
  try {
    const drive = await PlacementDrive.findById(req.params.id);

    if (!drive) {
      return res.status(404).json({
        success: false,
        message: 'Placement drive not found'
      });
    }

    res.status(200).json({
      success: true,
      data: drive
    });
  } catch (error) {
    console.error('Error fetching placement drive:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch placement drive',
      error: error.message
    });
  }
};


exports.updatePlacementDrive = async (req, res) => {
  try {
    const drive = await PlacementDrive.findById(req.params.id);

    if (!drive) {
      return res.status(404).json({
        success: false,
        message: 'Placement drive not found'
      });
    }

    const updatedDrive = await PlacementDrive.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Placement drive updated successfully',
      data: updatedDrive
    });
  } catch (error) {
    console.error('Error updating placement drive:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update placement drive',
      error: error.message
    });
  }
};


exports.deletePlacementDrive = async (req, res) => {
  try {
    const drive = await PlacementDrive.findById(req.params.id);

    if (!drive) {
      return res.status(404).json({
        success: false,
        message: 'Placement drive not found'
      });
    }

   
    drive.isActive = false;
    await drive.save();

    res.status(200).json({
      success: true,
      message: 'Placement drive deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting placement drive:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete placement drive',
      error: error.message
    });
  }
};


exports.getDriveStats = async (req, res) => {
  try {
    const totalDrives = await PlacementDrive.countDocuments({ isActive: true });
    const eligible = await PlacementDrive.countDocuments({ status: 'Eligible', isActive: true });
    const applied = await PlacementDrive.countDocuments({ status: 'Applied', isActive: true });
    const shortlisted = await PlacementDrive.countDocuments({ status: 'Shortlisted', isActive: true });
    const selected = await PlacementDrive.countDocuments({ status: 'Selected', isActive: true });

    res.status(200).json({
      success: true,
      data: {
        totalDrives,
        eligible,
        applied,
        shortlisted,
        selected
      }
    });
  } catch (error) {
    console.error('Error fetching drive stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch drive stats',
      error: error.message
    });
  }
};


exports.applyToDrive = async (req, res) => {
  try {
    const { studentId } = req.body;
    const driveId = req.params.id;

    const drive = await PlacementDrive.findById(driveId);

    if (!drive) {
      return res.status(404).json({
        success: false,
        message: 'Placement drive not found'
      });
    }

   
    const existingApplication = drive.applications?.find(
      app => app.student?.toString() === studentId
    );

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this drive'
      });
    }

    if (!drive.applications) {
      drive.applications = [];
    }

    drive.applications.push({
      student: studentId,
      status: 'Applied',
      appliedDate: new Date()
    });

   
    if (drive.status === 'Eligible') {
      drive.status = 'Applied';
    }

    await drive.save();

    res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      data: drive
    });
  } catch (error) {
    console.error('Error applying to drive:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to apply to drive',
      error: error.message
    });
  }
};


exports.updateApplicationStatus = async (req, res) => {
  try {
    const { studentId, status } = req.body;
    const driveId = req.params.id;

    const drive = await PlacementDrive.findById(driveId);

    if (!drive) {
      return res.status(404).json({
        success: false,
        message: 'Placement drive not found'
      });
    }

    if (!drive.applications) {
      return res.status(404).json({
        success: false,
        message: 'No applications found for this drive'
      });
    }

    const application = drive.applications.find(
      app => app.student?.toString() === studentId
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    application.status = status;

   
    if (status === 'Shortlisted' && drive.status !== 'Shortlisted') {
      drive.status = 'Shortlisted';
    } else if (status === 'Selected' && drive.status !== 'Selected') {
      drive.status = 'Selected';
    } else if (status === 'Rejected' && drive.status !== 'Rejected') {
      drive.status = 'Rejected';
    }

    await drive.save();

    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: drive
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application status',
      error: error.message
    });
  }
};