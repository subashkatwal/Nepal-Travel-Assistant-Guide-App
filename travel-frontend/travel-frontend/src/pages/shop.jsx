// src/pages/Shop.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/shop.css";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="shop-container">
      <Navbar />

      <header className="shop-header">
        <div className="container">
          <h1>Shop Our Products</h1>
          <p>Browse items and click view details for more information</p>
        </div>
      </header>

      <main className="shop-main">
        <div className="container">
          <div className="shop-grid">
            {products.map(product => (
              <div key={product.id} className="shop-card">
                <div
                  className="shop-image"
                  style={{ backgroundImage: `url(${product.image_url})` }}
                ></div>

                <div className="shop-card-content">
                  <h2>{product.title}</h2>
                  <p className="shop-description">{product.description.substring(0, 80)}...</p>

                  <div className="tags">
                    {product.tags_list.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>

                  <div className="shop-details">
                    Price: Rs {product.price} | Stock: {product.stock}
                  </div>

                  <a href={`/shop/${product.id}`} className="details-btn">View Details</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
