const express = require('express');
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get dashboard stats
router.get('/stats', auth, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalStock = await Product.aggregate([{ $group: { _id: null, total: { $sum: '$stockQuantity' } } }]);
    const lowStock = await Product.find({ stockQuantity: { $lt: 10 } });
    
    res.json({
      totalProducts,
      totalStock: totalStock[0]?.total || 0,
      lowStock: lowStock.length
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Add product
router.post('/', auth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update product
router.put('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete product
router.delete('/:id', auth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;