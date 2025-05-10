const express = require("express");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Multer setup for handling image uploads
const upload = multer({ dest: "data/images/" });

// Paths to text files
const usersFile = "./data/users.txt";
const productsFile = "./data/products.txt";
const ordersFile = "./data/orders.txt";

// Helper function to read data from a file
const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) reject(err);
      resolve(data ? JSON.parse(data) : []);
    });
  });
};

// Helper function to write data to a file
const writeFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

// --- User APIs ---

// Login API
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const users = await readFile(usersFile);

  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, message: "Login successful", user });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Register API
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  const users = await readFile(usersFile);

  if (users.find((u) => u.email === email)) {
    res.status(400).json({ success: false, message: "User already exists" });
    return;
  }

  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  await writeFile(usersFile, users);

  res.json({ success: true, message: "User registered successfully", user: newUser });
});

// --- Product APIs ---

// Get all products
app.get("/api/products", async (req, res) => {
  const products = await readFile(productsFile);
  res.json(products);
});

// Add a new product
app.post("/api/products", upload.single("image"), async (req, res) => {
  const { name, price, description } = req.body;
  const products = await readFile(productsFile);

  const newProduct = {
    id: Date.now(),
    name,
    price,
    description,
    image: req.file ? req.file.filename : null,
  };

  products.push(newProduct);
  await writeFile(productsFile, products);

  res.json({ success: true, message: "Product added successfully", product: newProduct });
});

// Serve product images
app.get("/api/images/:imageName", (req, res) => {
  const imagePath = `./data/images/${req.params.imageName}`;
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath, { root: "." });
  } else {
    res.status(404).send("Image not found");
  }
});

// --- Order APIs ---

// Place an order
app.post("/api/orders", async (req, res) => {
  const { userId, products } = req.body;
  const orders = await readFile(ordersFile);

  const newOrder = { id: Date.now(), userId, products, date: new Date() };
  orders.push(newOrder);
  await writeFile(ordersFile, orders);

  res.json({ success: true, message: "Order placed successfully", order: newOrder });
});

// Get all orders for a user
app.get("/api/orders/:userId", async (req, res) => {
  const orders = await readFile(ordersFile);
  const userOrders = orders.filter((order) => order.userId === parseInt(req.params.userId));
  res.json(userOrders);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
