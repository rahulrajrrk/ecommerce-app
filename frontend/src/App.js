import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Admin Pages
import AdminLogin from "./pages/Login/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProductManagement from "./pages/Admin/ProductManagement";
import Reports from "./pages/Admin/Reports";
import OrderTracking from "./pages/Admin/OrderTracking";

// Customer Pages
import CustomerLogin from "./pages/Login/CustomerLogin";
import Register from "./pages/Login/Register";
import ForgotPassword from "./pages/Login/ForgotPassword";
import ProductListing from "./pages/Customer/ProductListing";
import Cart from "./pages/Customer/Cart";
import Checkout from "./pages/Customer/Checkout";
import OrderHistory from "./pages/Customer/OrderHistory";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/order-tracking" element={<OrderTracking />} />

        {/* Customer Routes */}
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-history" element={<OrderHistory />} />

        {/* Default Route */}
        <Route path="/" element={<CustomerLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
