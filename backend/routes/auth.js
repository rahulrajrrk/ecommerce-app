const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Example User Database with Hashed Passwords
const users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin123', 10), // Hash the password
    role: 'admin',
  },
  {
    id: 2,
    email: 'customer@example.com',
    password: bcrypt.hashSync('customer123', 10), // Hash the password
    role: 'customer',
  },
];

// Admin Login API
router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.role === 'admin');
  if (!user) return res.status(400).json({ message: 'Invalid admin credentials' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: 'Invalid admin credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, 'SECRET_KEY', { expiresIn: '1h' });
  res.json({ success: true, token });
});

// Customer Login API
router.post('/customer/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.role === 'customer');
  if (!user) return res.status(400).json({ message: 'Invalid customer credentials' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: 'Invalid customer credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, 'SECRET_KEY', { expiresIn: '1h' });
  res.json({ success: true, token });
});

module.exports = router;
