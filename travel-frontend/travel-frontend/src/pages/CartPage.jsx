import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/cart-page.css";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReceiptGenerator from "../components/ReceiptGenerator";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  const handleProcessPayment = () => {
    alert("Payment processed successfully!");
    setIsPaymentDone(true);
    clearCart();
  };

  return (
    <div className="cart-page-wrapper">
      <Navbar />

      <main className="cart-main-section">
        <div className="cart-content-wrapper">
          <h1 className="cart-page-title">Your Cart</h1>

          {!isPaymentDone && cartItems.length === 0 && (
            <p className="cart-empty-msg">Your cart is empty.</p>
          )}

          {!isPaymentDone && cartItems.length > 0 && (
            <div className="cart-items-card">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <span className="cart-item-name">{item.title}</span>

                  <div className="cart-item-controls">
                    <button
                      className="cart-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <FaMinus />
                    </button>
                    <span className="cart-item-qty">{item.quantity}</span>
                    <button
                      className="cart-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <span className="cart-item-total">
                    Rs {(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>

                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Total Items:</span>
                  <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                </div>
                <div className="summary-row">
                  <span>Total Amount:</span>
                  <span>
                    Rs{" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.price * item.quantity, 0)
                      .toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="cart-summary-buttons">
  <button className="process-btn" onClick={handleProcessPayment}>
    Process Payment
  </button>

  <ReceiptGenerator cartItems={cartItems} />
</div>
              </div>
            </div>
          )}

          {isPaymentDone && (
            <div className="cart-empty-section">
              <h2>Your cart is empty</h2>
              <p>Thank you for your purchase!</p>
              <div className="cart-empty-buttons">
                <Link to="/shop" className="continue-shopping-btn">
                  Continue Shopping
                </Link>
                <Link to="/" className="back-home-btn">
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
