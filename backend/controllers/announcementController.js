/**
 * Announcement Controller
 * Handles CRUD operations for announcements
 */

const Announcement = require('../models/Announcement');

/**
 * @route   POST /api/announcements
 * @desc    Create a new announcement (Teacher only)
 * @access  Private (Teacher)
 */
const createAnnouncement = async (req, res) => {
  try {
    const { title, content, priority, targetAudience, clubName, expiryDate } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const announcement = await Announcement.create({
      title,
      content,
      priority,
      targetAudience,
      clubName,
      expiryDate,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: { announcement }
    });
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

/**
 * @route   GET /api/announcements
 * @desc    Get all active announcements
 * @access  Private
 */
const getAllAnnouncements = async (req, res) => {
  try {
    const { priority, clubName } = req.query;
    
    let query = { 
      isActive: true,
      $or: [
        { expiryDate: null },
        { expiryDate: { $gte: new Date() } }
      ]
    };
    
    if (priority) query.priority = priority;
    if (clubName) query.clubName = clubName;

    const announcements = await Announcement.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: announcements.length,
      data: { announcements }
    });
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

/**
 * @route   GET /api/announcements/:id
 * @desc    Get single announcement
 * @access  Private
 */
const getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { announcement }
    });
  } catch (error) {
    console.error('Get announcement error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

/**
 * @route   PUT /api/announcements/:id
 * @desc    Update announcement (Teacher only)
 * @access  Private (Teacher)
 */
const updateAnnouncement = async (req, res) => {
  try {
    let announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    // Check if the teacher owns this announcement
    if (announcement.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this announcement'
      });
    }

    announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Announcement updated successfully',
      data: { announcement }
    });
  } catch (error) {
    console.error('Update announcement error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

/**
 * @route   DELETE /api/announcements/:id
 * @desc    Delete announcement (Teacher only)
 * @access  Private (Teacher)
 */
const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    // Check if the teacher owns this announcement
    if (announcement.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this announcement'
      });
    }

    await announcement.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully'
    });
  } catch (error) {
    console.error('Delete announcement error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

module.exports = {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
};
