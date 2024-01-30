const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// API endpoint to handle form submissions
router.post('/submit', contactController.submitForm);
router.get('/all', contactController.getAllContacts);
module.exports = router;
