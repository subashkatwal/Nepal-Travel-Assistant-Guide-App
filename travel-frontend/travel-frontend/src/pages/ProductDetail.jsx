// src/pages/ProductDetail.jsx
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext.jsx"
import "../styles/shop.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}/`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart!");
  };

  return (
    <div className="shop-container">
      <Navbar />

      <main className="shop-main">
        <div className="container">
          <div className="product-detail-grid">
            <div
              className="product-image"
              style={{ backgroundImage: `url(${product.image_url})` }}
            ></div>

            <div className="product-info">
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <p>Price: Rs {product.price}</p>
              <p>Stock: {product.stock}</p>
              <button className="details-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="details-btn" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
