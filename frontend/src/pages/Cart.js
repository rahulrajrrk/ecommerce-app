import React, { useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(""); // Replace with actual user ID after login

  const handleCheckout = async () => {
    try {
      const response = await fetch("https://your-backend-url.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productIds: cart.map((item) => item.id) }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Order placed successfully!");
        setCart([]); // Clear cart after successful order
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
