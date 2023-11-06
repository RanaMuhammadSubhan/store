const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const multer = require('multer');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: (req, file, callback) => {
    // Replace backslashes with forward slashes in the file path
    const webPath = file.originalname.replace(/\\/g, '/');
    callback(null, webPath);
  },
});

const upload = multer({ storage: storage });

// Route to create a new category with image upload
router.post('/categories', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? req.file.path : 'image is not uploaded';
    image = image.replace(/\\/g, '/');
    const newCategory = new Category({
      name,
      image,
    });

    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
