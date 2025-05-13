const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Path to the user.txt file
const filePath = path.join(__dirname, "../data/user.txt");

// Endpoint to handle user registration
router.post("/", (req, res) => {
  const { name, email, password, userType } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Read existing users from the file
  fs.readFile(filePath, "utf8", (readErr, data) => {
    if (readErr && readErr.code !== "ENOENT") {
      // If there's an error reading the file (other than the file not existing)
      console.error("Error reading user.txt:", readErr);
      return res.status(500).json({ message: "Internal server error." });
    }

    // Parse existing users if the file exists
    const users = data
      ? data
          .split("\n")
          .filter((line) => line.trim() !== "") // Remove empty lines
          .map((line) => JSON.parse(line)) // Parse each line as JSON
      : [];

    // Check if the email already exists
    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Create a new user object
    const newUser = {
      id: Date.now(), // Generate a unique ID based on the current timestamp
      name,
      email,
      password, // Consider hashing the password for security
      userType: userType || "customer", // Default to "customer" if userType is not provided
    };

    // Convert the new user object to a string
    const userLine = `${JSON.stringify(newUser)}\n`;

    // Append the new user to the file
    fs.appendFile(filePath, userLine, (writeErr) => {
      if (writeErr) {
        console.error("Error writing to user.txt:", writeErr);
        return res.status(500).json({ message: "Failed to register user." });
      }

      // Respond with success
      res.status(201).json({ message: "User registered successfully." });
    });
  });
});

module.exports = router;
