// File: server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/codeforgood', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));



const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);
const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});




// const aiRoutes = require('./routes/ai');
// app.use('/api/ai', aiRoutes);
