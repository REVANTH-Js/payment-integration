// File: server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kosanamrevanth5@gmail.com',
    pass: 'xnpdzyoexsogrhja' // Use environment variable ideally
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    console.log(`🔐 OTP for ${email}: ${otp}`);

    const newUser = new User({ name, email, password: hashedPassword, otp, otpExpiry });
    await newUser.save();

    try {
      const info = await transporter.sendMail({
        from: 'Code For Good <kosanamrevanth5@gmail.com>',
        to: email,
        subject: 'Verify your email',
        text: `Your OTP for CodeForGood registration is ${otp}`
      });
      console.log('✅ EMAIL SENT LOG:', info.response);
    } catch (err) {
      console.error('📧 EMAIL SEND ERROR:', err);
    }

    res.status(201).json({ message: 'OTP sent to email. Please verify.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Verify OTP
router.post('/verify', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'User already verified' });
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'User verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Verification failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    if (!user.isVerified) return res.status(403).json({ message: 'User not verified. Check email for OTP.' });

    const token = jwt.sign({ id: user._id }, 'CodeForGood@2025_SecretJWTKey!');
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;


    // "@google/generative-ai": "^0.24.1",