import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">E-Commerce</div>
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/products" className="navbar-link">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="navbar-link">Cart</Link>
          </li>
          <li>
            <Link to="/order-tracking" className="navbar-link">Order Tracking</Link>
          </li>
          <li>
            <Link to="/login" className="navbar-link">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
