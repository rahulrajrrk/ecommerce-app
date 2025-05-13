import React, { useState, useEffect } from "react";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("https://ecommerce-backend-vjir.onrender.com/api/cart")
      .then((res) => res.json())
      .then((data) => setCartItems(data));
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    fetch(`https://ecommerce-backend-vjir.onrender.com/api/cart/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
    })
      .then((res) => res.json())
      .then(() => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      });
  };

  const handleRemoveItem = (itemId) => {
    fetch(`https://ecommerce-backend-vjir.onrender.com/api/cart/${itemId}`, {
      method: "DELETE",
    }).then(() => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    });
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <ul className="cart-items">
        {cartItems.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} />
            <div>
              <h2>{item.name}</h2>
              <p>${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              />
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Total: ${totalPrice}</h2>
      <button onClick={() => alert("Proceed to Checkout")}>Checkout</button>
    </div>
  );
}

export default Cart;
