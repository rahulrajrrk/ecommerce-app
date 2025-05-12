import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left-Aligned Logo */}
        <div className="navbar-logo">
          <Link to="/" className="navbar-link">E-Commerce</Link>
        </div>

        {/* Right-Aligned Links */}
        <div className="navbar-actions">
          <Link to="/cart" className="navbar-link">
            <FaShoppingCart /> Cart
          </Link>
          <Link to="/login" className="navbar-link">
            <FaUser /> Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
