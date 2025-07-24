const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  advertisementId: { type: String, required: true }, // Changed from ObjectId to String
  vacancyType: { type: String, required: true },
  applicationType: { type: String, enum: ['Internal', 'External'], required: true },
  formData: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', ApplicationSchema); 