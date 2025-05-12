import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-link">E-Commerce</Link>
        </div>
        <ul className="navbar-links">
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
          <li>
            <Link to="/register" className="navbar-link">Register</Link>
          </li> {/* Added Register link */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
