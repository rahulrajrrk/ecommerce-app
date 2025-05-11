import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/admin/products">Manage Products</Link>
        <Link to="/admin/orders">Track Orders</Link>
        <Link to="/admin/reports">View Reports</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
