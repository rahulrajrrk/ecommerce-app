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
            <Link to="/order-history" className="navbar-link">Order History</Link>
          </li>
          <li>
            <Link to="/login" className="navbar-link">Login</Link>
          </li>
          <li>
            <Link to="/register" className="navbar-link">Register</Link>
          </li>
          <li>
            <Link to="/admin/login" className="navbar-link">Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
