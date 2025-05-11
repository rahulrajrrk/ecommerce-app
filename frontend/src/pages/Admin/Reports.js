import React, { useState, useEffect } from "react";
import "./Reports.css";

function Reports() {
  const [reports, setReports] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    lowStockProducts: [],
  });

  useEffect(() => {
    fetch("/api/admin/reports")
      .then((res) => res.json())
      .then((data) => setReports(data));
  }, []);

  return (
    <div className="reports-container">
      <h1>Reports</h1>
      <div className="report-summary">
        <p>Total Orders: {reports.totalOrders}</p>
        <p>Total Customers: {reports.totalCustomers}</p>
        <p>Total Revenue: ${reports.totalRevenue}</p>
      </div>
      <h2>Low Stock Products</h2>
      <ul>
        {reports.lowStockProducts.map((product) => (
          <li key={product.id}>
            {product.name} - {product.availableUnits} units left
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reports;
