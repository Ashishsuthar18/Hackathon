const express = require('express');
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const router = express.Router();

// Receipt (add stock)
router.post('/receipt/:id', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { stockQuantity: quantity } },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delivery (reduce stock)
router.post('/delivery/:id', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (product.stockQuantity < quantity) {
      return res.status(400).json({ msg: 'Insufficient stock' });
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { stockQuantity: -quantity } },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;