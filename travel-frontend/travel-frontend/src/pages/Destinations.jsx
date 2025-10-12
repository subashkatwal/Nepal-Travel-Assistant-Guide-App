import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/destinations.css";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [recommendedDestinations, setRecommendedDestinations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/destinations/")
      .then(res => res.json())
      .then(data => {
        setDestinations(data.all_destinations || data); 
        setRecommendedDestinations(data.recommended_destinations || []); 
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="destinations-container">
      <Navbar />

      <header className="destinations-header">
        <div className="container">
          <div className="header-content">
            <div className="header-icon">
              <FaMapMarkerAlt />
            </div>
            <h1>Discover Nepal's Wonders</h1>
            <p className="header-description">
              Explore breathtaking destinations and view details
            </p>
          </div>
        </div>
      </header>

      <main className="destinations-main">
        <div className="container">
          <h2 className="section-title">All Destinations</h2>
          <div className="destinations-grid">
            {destinations.map(dest => (
              <div key={dest.id} className="destination-card">
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${dest.image_url})` }}
                ></div>
                <div className="card-content">
                  <h2>{dest.title}</h2>
                  <p className="destination-description">{dest.description}</p>
                  <div className="tags">
                    {dest.tags_list?.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="destination-details">
                    <div className="detail-item">
                      <FaCalendarAlt className="detail-icon" />
                      <span>{dest.duration}</span>
                    </div>
                    <div className="detail-item">
                      <FaDollarSign className="detail-icon" />
                      <span>Rs.{dest.price}</span>
                    </div>
                  </div>
                  <button className="details-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="recommended-destinations-title">Recommended Destinations</h2>
          <div className="destinations-grid">
            {recommendedDestinations.map(dest => (
              <div key={dest.id} className="destination-card">
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${dest.image_url})` }}
                ></div>
                <div className="card-content">
                  <h2>{dest.title}</h2>
                  <p className="destination-description">{dest.description}</p>
                  <div className="tags">
                    {dest.tags_list?.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="destination-details">
                    <div className="detail-item">
                      <FaCalendarAlt className="detail-icon" />
                      <span>{dest.duration}</span>
                    </div>
                    <div className="detail-item">
                      <FaDollarSign className="detail-icon" />
                      <span>${dest.price}</span>
                    </div>
                  </div>
                  <button className="details-btn">View Details</button>
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
