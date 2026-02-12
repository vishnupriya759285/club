/**
 * Activity Controller
 * Handles CRUD operations for club activities
 */

const Activity = require('../models/Activity');
const Attendance = require('../models/Attendance');

/**
 * @route   POST /api/activities
 * @desc    Create a new activity (Teacher only)
 * @access  Private (Teacher)
 */
const createActivity = async (req, res) => {
  try {
    const { title, description, clubName, date, startTime, endTime, location, maxCapacity } = req.body;

    // Validate required fields
    if (!title || !description || !clubName || !date || !startTime || !endTime || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const activity = await Activity.create({
      title,
      description,
      clubName,
      date,
      startTime,
      endTime,
      location,
      maxCapacity,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      data: { activity }
    });
  } catch (error) {
    console.error('Create activity error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

/**
 * @route   GET /api/activities
 * @desc    Get all activities
 * @access  Private
 */
const getAllActivities = async (req, res) => {
  try {
    const { status, clubName, date } = req.query;
    
    let query = {};
    
    if (status) query.status = status;
    if (clubName) query.clubName = clubName;
    if (date) query.date = { $gte: new Date(date) };

    const activities = await Activity.find(query)
      .populate('createdBy', 'name email')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      data: { activities }
    });
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

/**
 * @route   GET /api/activities/:id
 * @desc    Get single activity
 * @access  Private
 */
const getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { activity }
    });
  } catch (error) {
    console.error('Get activity error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

/**
 * @route   PUT /api/activities/:id
 * @desc    Update activity (Teacher only)
 * @access  Private (Teacher)
 */
const updateActivity = async (req, res) => {
  try {
    let activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    // Check if the teacher owns this activity
    if (activity.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this activity'
      });
    }

    activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Activity updated successfully',
      data: { activity }
    });
  } catch (error) {
    console.error('Update activity error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

/**
 * @route   DELETE /api/activities/:id
 * @desc    Delete activity (Teacher only)
 * @access  Private (Teacher)
 */
const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    // Check if the teacher owns this activity
    if (activity.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this activity'
      });
    }

    await activity.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    console.error('Delete activity error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

/**
 * @route   PUT /api/activities/:id/attendance/open
 * @desc    Open attendance for an activity (Teacher only)
 * @access  Private (Teacher)
 */
const openAttendance = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    if (activity.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this activity'
      });
    }

    activity.attendanceOpen = true;
    activity.attendanceOpenTime = new Date();
    await activity.save();

    res.status(200).json({
      success: true,
      message: 'Attendance opened successfully',
      data: { activity }
    });
  } catch (error) {
    console.error('Open attendance error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

/**
 * @route   PUT /api/activities/:id/attendance/close
 * @desc    Close attendance for an activity (Teacher only)
 * @access  Private (Teacher)
 */
const closeAttendance = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    if (activity.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this activity'
      });
    }

    activity.attendanceOpen = false;
    activity.attendanceCloseTime = new Date();
    await activity.save();

    res.status(200).json({
      success: true,
      message: 'Attendance closed successfully',
      data: { activity }
    });
  } catch (error) {
    console.error('Close attendance error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivity,
  updateActivity,
  deleteActivity,
  openAttendance,
  closeAttendance
};
