// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Place a new order
router.post('/orders', async (req, res) => {
  try {
    const { products, totalCost, paymentMethod, customerInfo } = req.body;
    
    const newOrder = new Order({
      products,
      totalCost,
      paymentMethod,
      customerInfo,
    });

    await newOrder.save();
    res.json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('products');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//delete orders 
router.delete('/orders/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Find and remove the order
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(deletedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//single order
router.get('/orders/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId).populate('products');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
