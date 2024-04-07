const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Create a new review
router.post('/reviews', async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.json(newReview);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all reviews
router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
