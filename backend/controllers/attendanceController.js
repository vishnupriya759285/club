/**
 * Attendance Controller
 * Handles attendance marking and reporting
 */

const Attendance = require('../models/Attendance');
const Activity = require('../models/Activity');
const User = require('../models/User');

/**
 * @route   POST /api/attendance/mark
 * @desc    Mark attendance for an activity (Student only)
 * @access  Private (Student)
 */
const markAttendance = async (req, res) => {
  try {
    const { activityId } = req.body;

    if (!activityId) {
      return res.status(400).json({
        success: false,
        message: 'Activity ID is required'
      });
    }

    // Check if activity exists
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    // Check if attendance is open
    if (!activity.attendanceOpen) {
      return res.status(400).json({
        success: false,
        message: 'Attendance is not open for this activity'
      });
    }

    // Check if student already marked attendance
    const existingAttendance = await Attendance.findOne({
      studentId: req.user._id,
      activityId
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: 'Attendance already marked for this activity'
      });
    }

    // Create attendance record
    const attendance = await Attendance.create({
      studentId: req.user._id,
      activityId,
      status: 'present'
    });

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      data: { attendance }
    });
  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

/**
 * @route   GET /api/attendance/my-attendance
 * @desc    Get student's own attendance records
 * @access  Private (Student)
 */
const getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ studentId: req.user._id })
      .populate('activityId', 'title clubName date startTime endTime')
      .sort({ markedAt: -1 });

    // Calculate attendance percentage
    const totalActivities = await Activity.countDocuments({
      date: { $lte: new Date() }
    });

    const attendedActivities = attendance.filter(a => a.status === 'present').length;
    const attendancePercentage = totalActivities > 0 
      ? ((attendedActivities / totalActivities) * 100).toFixed(2) 
      : 0;

    res.status(200).json({
      success: true,
      data: {
        attendance,
        stats: {
          totalActivities,
          attendedActivities,
          attendancePercentage
        }
      }
    });
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

/**
 * @route   GET /api/attendance/activity/:activityId
 * @desc    Get attendance for a specific activity (Teacher only)
 * @access  Private (Teacher)
 */
const getActivityAttendance = async (req, res) => {
  try {
    const { activityId } = req.params;

    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    const attendance = await Attendance.find({ activityId })
      .populate('studentId', 'name email rollNumber department year')
      .sort({ markedAt: -1 });

    const presentCount = attendance.filter(a => a.status === 'present').length;
    const absentCount = attendance.filter(a => a.status === 'absent').length;

    res.status(200).json({
      success: true,
      data: {
        activity: {
          id: activity._id,
          title: activity.title,
          clubName: activity.clubName,
          date: activity.date
        },
        attendance,
        stats: {
          total: attendance.length,
          present: presentCount,
          absent: absentCount
        }
      }
    });
  } catch (error) {
    console.error('Get activity attendance error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

/**
 * @route   GET /api/attendance/student/:studentId
 * @desc    Get attendance for a specific student (Teacher only)
 * @access  Private (Teacher)
 */
const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await User.findById(studentId);

    if (!student || student.role !== 'student') {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const attendance = await Attendance.find({ studentId })
      .populate('activityId', 'title clubName date startTime endTime')
      .sort({ markedAt: -1 });

    const totalActivities = await Activity.countDocuments({
      date: { $lte: new Date() }
    });

    const attendedActivities = attendance.filter(a => a.status === 'present').length;
    const attendancePercentage = totalActivities > 0 
      ? ((attendedActivities / totalActivities) * 100).toFixed(2) 
      : 0;

    res.status(200).json({
      success: true,
      data: {
        student: {
          id: student._id,
          name: student.name,
          email: student.email,
          rollNumber: student.rollNumber
        },
        attendance,
        stats: {
          totalActivities,
          attendedActivities,
          attendancePercentage
        }
      }
    });
  } catch (error) {
    console.error('Get student attendance error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

/**
 * @route   GET /api/attendance/report
 * @desc    Get comprehensive attendance report (Teacher only)
 * @access  Private (Teacher)
 */
const getAttendanceReport = async (req, res) => {
  try {
    // Get all students
    const students = await User.find({ role: 'student' }).select('name email rollNumber');

    // Get all activities
    const activities = await Activity.find().sort({ date: -1 });

    // Get all attendance records
    const attendanceRecords = await Attendance.find()
      .populate('studentId', 'name rollNumber')
      .populate('activityId', 'title date');

    // Generate report
    const report = students.map(student => {
      const studentAttendance = attendanceRecords.filter(
        a => a.studentId && a.studentId._id.toString() === student._id.toString()
      );

      const presentCount = studentAttendance.filter(a => a.status === 'present').length;
      const percentage = activities.length > 0 
        ? ((presentCount / activities.length) * 100).toFixed(2) 
        : 0;

      return {
        student: {
          id: student._id,
          name: student.name,
          rollNumber: student.rollNumber,
          email: student.email
        },
        totalActivities: activities.length,
        attended: presentCount,
        percentage
      };
    });

    res.status(200).json({
      success: true,
      data: {
        report,
        summary: {
          totalStudents: students.length,
          totalActivities: activities.length,
          totalAttendanceRecords: attendanceRecords.length
        }
      }
    });
  } catch (error) {
    console.error('Get attendance report error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

module.exports = {
  markAttendance,
  getMyAttendance,
  getActivityAttendance,
  getStudentAttendance,
  getAttendanceReport
};
