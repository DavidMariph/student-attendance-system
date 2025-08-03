const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'excused'],
    default: 'present',
  },
  recordedBy: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Compound index to ensure one record per student per date
AttendanceSchema.index({ date: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);