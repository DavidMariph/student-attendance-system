const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// Record attendance
router.post('/', async (req, res) => {
  try {
    const { date, studentId, status, recordedBy } = req.body;
    
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const attendance = new Attendance({
      date: new Date(date),
      student: student._id,
      status,
      recordedBy,
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get attendance for a specific date
router.get('/date/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    const attendance = await Attendance.find({
      date: {
        $gte: date,
        $lt: nextDay,
      },
    }).populate('student', 'studentId name department');

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;