const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

router.post('/', async (req, res) => {
  const { email, advertisementId, vacancyType, applicationType, formData } = req.body;
  if (!email || !advertisementId || !vacancyType || !applicationType || !formData) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const app = await Application.create({
      email,
      advertisementId,
      vacancyType,
      applicationType,
      formData,
    });
    res.status(201).json({ message: 'Application submitted', applicationId: app._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

module.exports = router; 