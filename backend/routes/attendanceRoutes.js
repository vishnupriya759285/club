/**
 * Attendance Routes
 */

const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getMyAttendance,
  getActivityAttendance,
  getStudentAttendance,
  getAttendanceReport
} = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Student routes
router.post('/mark', authorize('student'), markAttendance);
router.get('/my-attendance', authorize('student'), getMyAttendance);

// Teacher routes
router.get('/activity/:activityId', authorize('teacher'), getActivityAttendance);
router.get('/student/:studentId', authorize('teacher'), getStudentAttendance);
router.get('/report', authorize('teacher'), getAttendanceReport);

module.exports = router;
