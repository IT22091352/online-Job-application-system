const express = require('express');
const router = express.Router();
const Otp = require('../models/Otp');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const OTP_EXPIRY_MINUTES = 5;

// Gmail SMTP setup (requires App Password, not main Gmail password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_PASS, // Your Gmail App Password
  },
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Request OTP
router.post('/request', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60000);
  await Otp.deleteMany({ email }); // Remove previous OTPs
  await Otp.create({ email, hashedOtp, expiresAt });
  // Send email
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}. It expires in ${OTP_EXPIRY_MINUTES} minutes.`,
  });
  res.json({ message: 'OTP sent' });
});

// Verify OTP
router.post('/verify', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });
  const record = await Otp.findOne({ email, used: false });
  if (!record) return res.status(400).json({ error: 'OTP not found or already used' });
  if (record.expiresAt < new Date()) return res.status(400).json({ error: 'OTP expired' });
  const match = await bcrypt.compare(otp, record.hashedOtp);
  if (!match) return res.status(400).json({ error: 'Invalid OTP' });
  record.used = true;
  await record.save();
  res.json({ message: 'OTP verified' });
});

module.exports = router; 