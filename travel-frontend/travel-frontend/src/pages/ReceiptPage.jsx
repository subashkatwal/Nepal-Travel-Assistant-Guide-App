// src/pages/ReceiptPage.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReceiptGenerator from "../components/ReceiptGenerator";
import "../styles/cart-page.css";

export default function ReceiptPage() {
  const { cartItems } = useContext(CartContext);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-page-wrapper">
        <Navbar />
        <main className="cart-main-section">
          <div className="cart-content-wrapper">
            <h2>Your cart is empty</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <Navbar />
      <main className="cart-main-section">
        <div className="cart-content-wrapper">
          <h1 className="cart-page-title">Receipt</h1>

          <div className="cart-items-card">
            {cartItems.map((item, idx) => (
              <div key={idx} className="cart-item-row">
                <span className="cart-item-name">{item.title}</span>
                <span className="cart-item-qty">{item.quantity} pcs</span>
                <span className="cart-item-total">
                  Rs {(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
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

              <ReceiptGenerator cartItems={cartItems} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
