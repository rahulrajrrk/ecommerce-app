import React, { useState, useEffect } from "react";
import "./ProductManagement.css";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    availableUnits: "",
    image: "",
  });

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Product added successfully");
        setProducts([...products, data]);
        setNewProduct({
          name: "",
          category: "",
          description: "",
          price: "",
          quantity: "",
          availableUnits: "",
          image: "",
        });
      });
  };

  return (
    <div className="product-management-container">
      <h1>Product Management</h1>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Quantity (e.g., 1kg, 500gm)"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Available Units"
          value={newProduct.availableUnits}
          onChange={(e) => setNewProduct({ ...newProduct, availableUnits: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          required
        />
        <button type="submit">Add Product</button>
      </form>
      <div>
        <h2>Existing Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.category} - ${product.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductManagement;
