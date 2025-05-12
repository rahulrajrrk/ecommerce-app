const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const readline = require("readline");

const router = express.Router();

// File path for user data
const filePath = path.join(__dirname, "../data/user.txt");

// Helper function to check if email exists
const checkEmailExists = async (email) => {
  if (!fs.existsSync(filePath)) return false; // File doesn't exist, no duplicates

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream });

  for await (const line of rl) {
    const [,, existingEmail] = line.split(",");
    if (existingEmail === email) return true;
  }

  return false;
};

// Register API
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;

    // Input validation
    if (!firstName || !lastName || !email || !password || !userType) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Check if email already exists
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(400).json({ success: false, message: "Email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // User entry
    const userEntry = `${firstName},${lastName},${email},${hashedPassword},${userType}\n`;

    // Ensure the directory exists
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Append to file
    fs.appendFile(filePath, userEntry, (err) => {
      if (err) {
        console.error("Error writing to user.txt:", err);
        return res.status(500).json({ success: false, message: "Failed to save user details." });
      }
      res.json({ success: true, message: "User registered successfully!" });
    });
  } catch (error) {
    console.error("Error in Register API:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
