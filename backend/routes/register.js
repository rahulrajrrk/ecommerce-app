const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Path to the users.txt file (fixed the filename from user.txt to users.txt)
const filePath = path.join(__dirname, "../data/users.txt");

// Endpoint to handle user registration
router.post("/", (req, res) => {
  // ... existing code ...

  // Read existing users from the file
  fs.readFile(filePath, "utf8", (readErr, data) => {
    if (readErr && readErr.code !== "ENOENT") {
      // ... existing code ...
    }

    // Parse existing users if the file exists
    let users = [];
    try {
      users = data ? JSON.parse(data) : [];
    } catch (parseErr) {
      console.error("Error parsing users data:", parseErr);
      return res.status(500).json({ message: "Internal server error." });
    }

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

    // Add the new user to the array
    users.push(newUser);

    // Write the entire array back to the file
    fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing to users.txt:", writeErr);
        return res.status(500).json({ message: "Failed to register user." });
      }

      // Respond with success
      res.status(201).json({ message: "User registered successfully." });
    });
  });
});

module.exports = router;
