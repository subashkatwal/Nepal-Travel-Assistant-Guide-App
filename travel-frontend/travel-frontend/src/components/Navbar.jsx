// src/components/Navbar.jsx
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const userCtx = useContext(UserContext); // do not destructure immediately
  const navigate = useNavigate();

  // Defensive check - helpful for debugging
  useEffect(() => {
    if (!userCtx) {
      console.error("[Navbar] UserContext is undefined! Did you wrap App with UserProvider?");
    } else {
      console.log("[Navbar] UserContext available:", userCtx);
    }
  }, [userCtx]);

  // If context missing, fallback to not logged in
  const loggedIn = userCtx?.loggedIn ?? false;
  const userEmail = userCtx?.userEmail ?? null;
  const logoutUser = userCtx?.logoutUser ?? (() => {});

  
  useEffect(() => {
    if (loggedIn && !sessionStorage.getItem("loginToastShown")) {
      toast.success(`Welcome, ${userEmail || "User"}!`);
      sessionStorage.setItem("loginToastShown", "true");
    }
  }, [loggedIn, userEmail]);

  const handleAuthButton = () => {
    if (loggedIn) {
      logoutUser();
      sessionStorage.removeItem("loginToastShown");
      toast.success("Logged out successfully!");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
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
          <Link to="/shop">Toursit Pasal</Link>
          <Link to="/permits">Permits</Link>
          <Link to="/safety-alerts">Safety Alerts</Link>

          <Link to="/cart" className="cart-container">
            <FaShoppingCart className="cart-icon" />
            {cartItems?.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </Link>

          <button onClick={handleAuthButton} className="login-btn">
            {loggedIn ? "Logout" : "Login"}
          </button>
        </nav>
      </header>

      <ToastContainer position="bottom-center" autoClose={2000} />
    </>
  );
}
