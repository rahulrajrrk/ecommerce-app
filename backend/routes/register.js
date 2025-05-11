const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const router = express.Router();

// Register API
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, userType } = req.body;

  // Input validation
  if (!firstName || !lastName || !email || !password || !userType) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // User entry
  const userEntry = `${firstName},${lastName},${email},${hashedPassword},${userType}\n`;

  // File path
  const filePath = path.join(__dirname, "../data/user.txt");

  // Append to file
  fs.appendFile(filePath, userEntry, (err) => {
    if (err) {
      console.error("Error writing to user.txt:", err);
      return res.status(500).json({ success: false, message: "Failed to save user details." });
    }
    res.json({ success: true, message: "User registered successfully!" });
  });
});

module.exports = router;
