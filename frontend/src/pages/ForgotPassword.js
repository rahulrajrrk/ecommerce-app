import React, { useState } from "react";
import "./ForgotPassword.css"; // Import custom CSS for styling

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://ecommerce-backend-vjir.onrender.com/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Password reset link sent to your email!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">Forgot Password?</h2>
        <p>Enter your email to receive a password reset link.</p>
        <form onSubmit={handleForgotPassword}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-reset-password">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
