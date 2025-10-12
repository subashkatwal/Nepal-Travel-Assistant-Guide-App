// src/components/Navbar.jsx
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext.jsx"

import "../styles/navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);

  return (
    <header className="navbar">
      <div className="logo">Nepal Travel</div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={menuOpen ? "bar rotate1" : "bar"}></div>
        <div className={menuOpen ? "bar fade" : "bar"}></div>
        <div className={menuOpen ? "bar rotate2" : "bar"}></div>
      </div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/trip-estimate">Trip Estimate</Link>
        <Link to="/destinations">Destinations</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/permits">Permits</Link>
        <Link to="/safety-alerts">Safety Alerts</Link>

        <Link to="/cart" className="cart-container">
          <FaShoppingCart className="cart-icon" />
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
        </Link>

        <Link to="/login" className="login-btn">Login</Link>
      </nav>
    </header>
  );
}
