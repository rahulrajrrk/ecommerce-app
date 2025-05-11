import React, { useState } from "react";

function Cart() {
  const [cart, setCart] = useState([
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 20.49 },
  ]); // Example cart items for testing
  const [userId, setUserId] = useState(""); // Replace with actual user ID after login
  const [isLoading, setIsLoading] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items to your cart before checking out.");
      return;
    }

    if (!userId) {
      alert("Please log in before checking out.");
      return;
    }

    setIsLoading(true); // Disable button while processing
    try {
      const response = await fetch("https://ecommerce-backend-vjir.onrender.com/api/orders", {
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
      alert(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Re-enable button
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <p>{item.name} - ${item.price}</p>
          </li>
        ))}
      </ul>
      <h2>Total: ${calculateTotal()}</h2>
      <button onClick={handleCheckout} disabled={isLoading}>
        {isLoading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
}

export default Cart;
