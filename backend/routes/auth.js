const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Path to the users.txt file
const filePath = path.join(__dirname, "../data/users.txt");

// Helper function to read users from file
const readUsers = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading users:", error);
    return [];
  }
};

// Admin Login API
router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find((u) => u.email === email && u.userType === 'admin');
  
  if (!user) return res.status(400).json({ message: 'Invalid admin credentials' });

  // For simplicity, we're doing direct comparison since we're not hashing in register.js
  // In a production app, you should use bcrypt.compare
  const isPasswordValid = user.password === password;
  if (!isPasswordValid) return res.status(400).json({ message: 'Invalid admin credentials' });

  const token = jwt.sign({ id: user.id, role: user.userType }, 'SECRET_KEY', { expiresIn: '1h' });
  res.json({ success: true, token, userType: user.userType });
});

// Customer Login API
router.post('/customer/login', async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find((u) => u.email === email && u.userType === 'customer');
  
  if (!user) return res.status(400).json({ message: 'Invalid customer credentials' });

  // For simplicity, we're doing direct comparison since we're not hashing in register.js
  // In a production app, you should use bcrypt.compare
  const isPasswordValid = user.password === password;
  if (!isPasswordValid) return res.status(400).json({ message: 'Invalid customer credentials' });

  const token = jwt.sign({ id: user.id, role: user.userType }, 'SECRET_KEY', { expiresIn: '1h' });
  res.json({ success: true, token, userType: user.userType });
});

module.exports = router;
