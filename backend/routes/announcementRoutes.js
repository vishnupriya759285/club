/**
 * Announcement Routes
 */

const express = require('express');
const router = express.Router();
const {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} = require('../controllers/announcementController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Public authenticated routes (Both student and teacher)
router.get('/', getAllAnnouncements);
router.get('/:id', getAnnouncement);

// Teacher only routes
router.post('/', authorize('teacher'), createAnnouncement);
router.put('/:id', authorize('teacher'), updateAnnouncement);
router.delete('/:id', authorize('teacher'), deleteAnnouncement);

module.exports = router;
