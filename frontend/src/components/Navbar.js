import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/products">Products</Link> |{" "}
      <Link to="/cart">Cart</Link> | <Link to="/order-tracking">Order Tracking</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;
