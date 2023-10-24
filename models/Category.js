const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // This will store the URL of the image
  },
  // Add any other category properties here
});

module.exports = mongoose.model('Category', categorySchema);
