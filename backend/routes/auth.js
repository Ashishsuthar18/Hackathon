const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Default user for demo (username: admin, password: admin123)
router.post('/register', async (req, res) => {
  try {
    let user = await User.findOne({ username: 'admin' });
    if (!user) {
      user = new User({ username: 'admin', password: 'admin123' });
      await user.save();
    }
    res.json({ msg: 'Default user created: admin/admin123' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;