const mongoose = require('mongoose');

const AdvertisementSchema = new mongoose.Schema({
  date: { type: String, required: true },
  vacancyTypes: [{ type: String, required: true }],
  isOpen: { type: Boolean, default: true },
});

module.exports = mongoose.model('Advertisement', AdvertisementSchema); 