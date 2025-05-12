const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../data/user.txt");

// Endpoint to handle registration
router.post("/", (req, res) => {
  const { name, email, password, userType } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Create a user object
  const user = {
    name,
    email,
    password, // Consider hashing the password for security
    userType: userType || "customer", // Default to "customer"
  };

  // Convert user object to a string
  const userLine = `${JSON.stringify(user)}\n`;

  // Append the user data to the file
  fs.appendFile(filePath, userLine, (err) => {
    if (err) {
      console.error("Error writing to user.txt:", err);
      return res.status(500).json({ message: "Failed to register user." });
    }

    // Respond with success
    res.status(201).json({ message: "User registered successfully." });
  });
});

module.exports = router;
