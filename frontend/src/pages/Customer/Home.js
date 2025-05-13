import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function CustomerHome() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    
    if (!token || userType !== "customer") {
      navigate("/login");
      return;
    }
    
    // Fetch products
    fetchProducts();
    // Fetch categories
    fetchCategories();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://ecommerce-backend-vjir.onrender.com/api/products");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://ecommerce-backend-vjir.onrender.com/api/categories");
      const data = await response.json();
      setCategories([{ id: "all", name: "All Products" }, ...data]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "all" || product.category === selectedCategory)
    );

  return (
    <div className="customer-home">
      <header className="home-header">
        <div className="logo">QuickMart</div>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search for products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="cart-icon" onClick={() => navigate("/cart")}>
          🛒 <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
        </div>
      </header>

      <div className="category-nav">
        {categories.map(category => (
          <button 
            key={category.id}
            className={selectedCategory === category.id ? "active" : ""}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <main className="products-grid">
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <p className="product-delivery">Delivery in 10 minutes</p>
              <button className="add-to-cart" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <div className="no-products">No products found</div>
        )}
      </main>
    </div>
  );
}

export default CustomerHome;
