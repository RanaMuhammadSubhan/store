// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create a new product
router.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/products-by-category', async (req, res) => {
  try {
    const productsByCategory = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          products: { $push: '$$ROOT' },
        },
      },
    ]);
    res.json(productsByCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Add more routes as needed (e.g., update, delete)

module.exports = router;
