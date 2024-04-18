// controllers/reviewsController.js

const Review = require('../models/Review');

exports.createReview = async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.json(newReview);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAllReviews = async (req, res) => {
    const { productid } = req.params; // Correctly extracting productid from req.params
    try {
   //     const reviews = await Review.find({ productid: productid }); // Filter reviews by product ID
        const reviews = await Review.find({}); // Filter reviews by product ID

        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

