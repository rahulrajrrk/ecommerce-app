import React, { useState, useEffect } from "react";
import "./ProductListing.css";

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch products and categories from backend API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://ecommerce-backend-vjir.onrender.com/api/products");
        const data = await response.json();
        setProducts(data.products);
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="product-listing-container">
      <h1>Products</h1>
      {categories.map((category) => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="product-grid">
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <div className="product-card" key={product.id}>
                  <img
                    src={`/api/images/${product.image}`}
                    alt={product.name}
                    className="product-image"
                  />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <button className="add-to-cart-button">Add to Cart</button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductListing;
