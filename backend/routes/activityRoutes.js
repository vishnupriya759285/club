/**
 * Activity Routes
 */

const express = require('express');
const router = express.Router();
const {
  createActivity,
  getAllActivities,
  getActivity,
  updateActivity,
  deleteActivity,
  openAttendance,
  closeAttendance
} = require('../controllers/activityController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Public authenticated routes (Both student and teacher)
router.get('/', getAllActivities);
router.get('/:id', getActivity);

// Teacher only routes
router.post('/', authorize('teacher'), createActivity);
router.put('/:id', authorize('teacher'), updateActivity);
router.delete('/:id', authorize('teacher'), deleteActivity);
router.put('/:id/attendance/open', authorize('teacher'), openAttendance);
router.put('/:id/attendance/close', authorize('teacher'), closeAttendance);

module.exports = router;
