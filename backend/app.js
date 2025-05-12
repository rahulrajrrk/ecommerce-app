const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(cors());

// In-memory storage
const users = [];
const products = [];
const orders = [];

// Multer setup for image uploads
const upload = multer({ dest: "uploads/" });

// --- Root Route ---
app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce Backend!");
});

// --- User APIs ---

// Login API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, message: "Login successful", user });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Register API
app.post("/api/register", (req, res) => {
  const { firstName, lastName, email, password, userType } = req.body;

  // Check if the user already exists
  if (users.find((u) => u.email === email)) {
    res.status(400).json({ success: false, message: "User already exists" });
    return;
  }

  // Create a new user
  const newUser = {
    id: Date.now(),
    name: `${firstName} ${lastName}`, // Combine firstName and lastName
    email,
    password,
    userType, // Include userType (customer/admin)
  };
  users.push(newUser);

  res.json({ success: true, message: "User registered successfully", user: newUser });
});

// --- Product APIs ---

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Add a product
app.post("/api/products", upload.single("image"), (req, res) => {
  const { name, price, description } = req.body;

  const newProduct = {
    id: Date.now(),
    name,
    price,
    description,
    image: req.file ? req.file.filename : null, // Save the uploaded file name
  };

  products.push(newProduct);

  res.json({ success: true, message: "Product added successfully", product: newProduct });
});

// Serve product images
app.get("/api/images/:imageName", (req, res) => {
  const imagePath = `uploads/${req.params.imageName}`;
  res.sendFile(imagePath, { root: "." });
});

// --- Order APIs ---

// Place an order
app.post("/api/orders", (req, res) => {
  const { userId, productIds } = req.body;

  const newOrder = {
    id: Date.now(),
    userId,
    productIds,
    date: new Date(),
  };
  orders.push(newOrder);

  res.json({ success: true, message: "Order placed successfully", order: newOrder });
});

// Get orders for a user
app.get("/api/orders/:userId", (req, res) => {
  const userOrders = orders.filter((order) => order.userId === parseInt(req.params.userId));
  res.json(userOrders);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
