import React, { useState, useEffect } from "react";
import "./OrderHistory.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders/customer")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="order-history-container">
      <h1>Your Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <h2>Order #{order.id}</h2>
            <p>Status: {order.status}</p>
            <p>Total: ${order.totalPrice}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderHistory;
