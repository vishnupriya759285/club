/**
 * Activity Model
 * Represents club activities created by teachers
 */

const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Activity title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Activity description is required'],
    trim: true
  },
  clubName: {
    type: String,
    required: [true, 'Club name is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Activity date is required']
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  maxCapacity: {
    type: Number,
    default: null // null means unlimited
  },
  attendanceOpen: {
    type: Boolean,
    default: false
  },
  attendanceOpenTime: {
    type: Date,
    default: null
  },
  attendanceCloseTime: {
    type: Date,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  }
}, {
  timestamps: true
});

// Index for efficient queries
activitySchema.index({ date: 1, clubName: 1 });
activitySchema.index({ createdBy: 1 });

module.exports = mongoose.model('Activity', activitySchema);
