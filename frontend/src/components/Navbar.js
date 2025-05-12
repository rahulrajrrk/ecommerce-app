import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa"; // Import icons
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
            <Link to="/cart" className="navbar-link">
              <FaShoppingCart /> Cart
            </Link>
          </li>
          <li>
            <Link to="/login" className="navbar-link">
              <FaUser /> Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
