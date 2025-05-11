import React, { useState } from "react";
import "./Login.css"; // Import custom CSS for styling
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://ecommerce-backend-vjir.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Login Successful!");
        console.log("User Data:", data.user);
        navigate("/home"); // Redirect to Home page
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to access your account</p>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          {/* Submit Button */}
          <button type="submit" className="btn-login">Login</button>
        </form>
        {/* Additional Options */}
        <div className="login-options">
          <a href="/register" className="link-register">Create an Account</a>
          <a href="/forgot-password" className="link-forgot-password">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
