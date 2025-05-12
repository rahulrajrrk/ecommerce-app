import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Import Pages
import ProductListing from "./pages/Customer/ProductListing";
import Cart from "./pages/Customer/Cart";
import CustomerLogin from "./pages/Login/CustomerLogin";
import Register from "./pages/Login/Register";
import ForgotPassword from "./pages/Login/ForgotPassword";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<ProductListing />} />

        {/* Customer Pages */}
        <Route path="/products" element={<ProductListing />} />
        <Route path="/cart" element={<Cart />} />

        {/* Login Pages */}
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
