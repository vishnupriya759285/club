/**
 * Attendance Model
 * Records student attendance for activities
 */

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Student ID is required']
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: [true, 'Activity ID is required']
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    default: 'present'
  },
  markedAt: {
    type: Date,
    default: Date.now
  },
  remarks: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Compound index to ensure one attendance record per student per activity
attendanceSchema.index({ studentId: 1, activityId: 1 }, { unique: true });

// Index for efficient queries
attendanceSchema.index({ activityId: 1 });
attendanceSchema.index({ studentId: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);
