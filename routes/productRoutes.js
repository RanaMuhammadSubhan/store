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
// Add more routes as needed (e.g., update, delete)
router.post("/deleteProducts", async (req, res) => {
  const { productid } = req.body;
  try {
    const result = await Product.deleteOne({ _id: productid });
    if (result.deletedCount === 1) {
      console.log("Product deleted successfully");
      res.send({ status: "Ok", data: "Deleted" });
    } else {
      console.log("Product not found");
      res.status(404).send({ status: "Error", data: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error", data: "Failed to delete Product" });
  }
});



// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
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

router.put("/updateProduct/:productid", async (req, res) => {
  const { productid } = req.params;
  const updatedProduct = req.body; // The updated product data
  try {
      const result = await Product.findOneAndUpdate({ _id: productid }, updatedProduct, { new: true });
      if (result) {
          console.log("Product updated successfully");
          res.send({ status: "Ok", data: result });
      } else {
          console.log("Product not found");
          res.status(404).send({ status: "Error", data: "Product not found" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).send({ status: "Error", data: "Failed to update product" });
  }
});

// Purchase a product (associate it with an order)
router.post("/purchaseProduct/:productId", async (req, res) => {
  const { productId } = req.params;
  const { totalCost, paymentMethod } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const newOrder = new Order({
      products: [productId],
      totalCost,
      paymentMethod,
    });

    await newOrder.save();

    product.order = newOrder._id;
    await product.save();

    res.json({ order: newOrder, product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
