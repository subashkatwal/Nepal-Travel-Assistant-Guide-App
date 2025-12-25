import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/cart-page.css";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReceiptGenerator from "../components/ReceiptGenerator";

const KHALTI_PUBLIC_KEY = import.meta.env.VITE_KHALTI_PUBLIC_KEY;


export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } =
    useContext(CartContext);

  const [isPaymentDone, setIsPaymentDone] = useState(false);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

const handleProcessPayment = () => {
  if (cartItems.length === 0) {
    alert("Cart is empty");
    return;
  }

  // Verify Khalti script is loaded
  if (!window.KhaltiCheckout) {
    alert("Khalti payment gateway not loaded. Please refresh the page.");
    return;
  }

  // Verify public key exists
  if (!KHALTI_PUBLIC_KEY) {
    console.error("Khalti public key is missing");
    alert("Payment configuration error. Please contact support.");
    return;
  }

  const config = {
    publicKey: KHALTI_PUBLIC_KEY,
    productIdentity: "cart_payment",
    productName: "Shop Purchase",
    productUrl: window.location.href, // Use actual URL instead of localhost
    eventHandler: {
      onSuccess(payload) {
        console.log("Payment success:", payload);
        verifyKhaltiPayment(payload);
      },
      onError(error) {
        console.error("Payment error:", error);
        alert("Payment failed: " + (error.message || "Unknown error"));
      },
      onClose() {
        console.log("Khalti widget closed");
      }
    }
  };

  try {
    const checkout = new window.KhaltiCheckout(config);
    checkout.show({ amount: totalAmount * 100 }); // Amount in paisa
  } catch (error) {
    console.error("Checkout initialization error:", error);
    alert("Failed to initialize payment. Please try again.");
  }
};
  return (
    <div className="cart-page-wrapper">
      <Navbar />

      <main className="cart-main-section">
        <div className="cart-content-wrapper">
          <h1 className="cart-page-title">Your Cart</h1>

          {/* Empty cart message */}
          {!isPaymentDone && cartItems.length === 0 && (
            <div className="cart-empty-section">
              <p className="cart-empty-msg">Your cart is empty.</p>
              <Link to="/shop" className="continue-shopping-btn">
                Start Shopping
              </Link>
            </div>
          )}

          {/* Cart items */}
          {!isPaymentDone && cartItems.length > 0 && (
            <div className="cart-items-card">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <span className="cart-item-name">{item.title}</span>

                  <div className="cart-item-controls">
                    <button
                      className="cart-btn"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>

                    <span className="cart-item-qty">{item.quantity}</span>

                    <button
                      className="cart-btn"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
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
                    title="Remove item"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}

              {/* Cart Summary */}
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Total Items:</span>
                  <span>
                    {cartItems.reduce(
                      (acc, item) => acc + item.quantity,
                      0
                    )}
                  </span>
                </div>

                <div className="summary-row">
                  <span>Total Amount:</span>
                  <span>Rs {totalAmount.toLocaleString("en-IN")}</span>
                </div>

                <div className="cart-summary-buttons">
                  <button className="process-btn" onClick={handleProcessPayment}>
                    Process Payment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Success UI (optional, real success handled on redirect page) */}
          {isPaymentDone && (
            <div className="cart-empty-section">
              <h2>Payment Successful! 🎉</h2>
              <p>Thank you for your purchase!</p>
              <ReceiptGenerator cartItems={cartItems} />
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
