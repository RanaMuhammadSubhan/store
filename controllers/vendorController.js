// vendorController.js
const Vendor = require('../models/vendorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const encryptedpassword = await bcrypt.hash(password, 10);

  try {
    const oldVendor = await Vendor.findOne({ email });
    if (oldVendor) {
      return res.send({ error: 'Vendor Exists' });
    }

    await Vendor.create({
      username,
      email,
      password: encryptedpassword,
    });

    res.send({ status: 'ok', message: 'Vendor Successfully Registered' });
  } catch (error) {
    res.send({ status: 'error', error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const vendor = await Vendor.findOne({ $or: [{ email: username }, { username }] });
  if (!vendor) {
    return res.json({ error: 'Vendor Not found' });
  }

  if (await bcrypt.compare(password, vendor.password)) {
    const tokenData = {
      email: vendor.email,
      username: vendor.username,
      // Add other vendor details as needed
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRETVALUE, {
      expiresIn: '1h', // Adjust the expiration time as needed
    });

    return res.json({ status: 'ok', data: token, role: 'vendor' });
  }

  return res.json({ status: 'error', error: 'Invalid Password' });
};

const manage = async (req, res) => {
  // Implement vendor management logic (approval, etc.)
};

module.exports = {
  register,
  login,
  manage,
};
