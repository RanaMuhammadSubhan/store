// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: [String], 
  },
  stock: {
    type: Number,
  },
  // Add other fields as needed
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
