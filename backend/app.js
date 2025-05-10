const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce Backend!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
