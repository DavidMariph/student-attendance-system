const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Admin Schema
const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // Hashed password
});
const Admin = mongoose.model('Admin', AdminSchema);

// Login Route
router.post('/login', async (req, res) => {
  const { name, email, password } = req.body;
  let admin = await Admin.findOne({ email });

  // If admin doesn't exist, create one (for demo purposes)
  if (!admin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();
    return res.json({ message: 'Admin account created and logged in!' });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, admin.password);
  if (isMatch && admin.name === name) {
    return res.json({ message: 'Login successful!' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
});

module.exports = router;