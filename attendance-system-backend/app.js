const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const app = express();

app.use(express.json());
app.use('/api/admin', adminRoutes);

mongoose.connect('mongodb://localhost:27017/student-attendance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(5000, () => console.log('Server running on port 5000'));