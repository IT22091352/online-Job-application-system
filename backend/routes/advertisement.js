const express = require('express');
const router = express.Router();

// Hardcoded advertisement data
const advertisement = {
  _id: '1',
  date: '20th July 2025',
  vacancyTypes: [
    'Management Assistant',
    'Works Aide',
    'Store Keeper',
    'Driver',
  ],
  isOpen: true,
};

router.get('/', (req, res) => {
  res.json([advertisement]);
});

module.exports = router; 