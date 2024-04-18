// routes/reviewsRoutes.js

const express = require('express');
const router = express.Router();
const { createReview, getAllReviews } = require('../controllers/reviewsController');
// Create a new review
router.post('/reviews', createReview);

// Get all reviews
//router.get('/reviews/:productid', getAllReviews);
router.get('/reviews', getAllReviews);

module.exports = router;
