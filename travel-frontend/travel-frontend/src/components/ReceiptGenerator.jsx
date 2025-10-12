import React from "react";
import { jsPDF } from "jspdf";

export default function ReceiptGenerator({ cartItems }) {
  const generateReceipt = () => {
    const doc = new jsPDF();

    let yPos = 10;
    doc.setFontSize(16);
    doc.text("NEPAL TRAVEL SHOP", 105, yPos, { align: "center" });

    yPos += 10;
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, yPos, { align: "center" });

    yPos += 10;
    doc.text("----------------------------", 105, yPos, { align: "center" });

    yPos += 10;
    doc.setFontSize(12);
    doc.text("Items:", 10, yPos);

    cartItems.forEach((item, idx) => {
      yPos += 7;
      doc.text(
        `${idx + 1}. ${item.title} x${item.quantity} - Rs ${item.price * item.quantity}`,
        10,
        yPos
      );
    });

    yPos += 10;
    doc.text("----------------------------", 10, yPos);

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toLocaleString("en-IN");

    yPos += 10;
    doc.text(`Total Items: ${totalItems}`, 10, yPos);
    yPos += 7;
    doc.text(`Total Amount: Rs ${totalAmount}`, 10, yPos);

    yPos += 10;
    doc.text("Thank you for shopping with us!", 105, yPos, { align: "center" });

    doc.save(`receipt_${Date.now()}.pdf`);
  };

  return (
    <button className="download-receipt-btn" onClick={generateReceipt}>
      Download Receipt
    </button>
  );
}
