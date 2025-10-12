import { useState } from "react";
import { FaCalculator, FaCalendarAlt, FaMapMarkerAlt, FaSun } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; 
import "../styles/tripEstimate.css";

export default function TripEstimate() {
  const [tripData, setTripData] = useState({
    duration: 7,
    category: "",
    destination: "",
    season: ""
  });

  const travelCategories = [
    "Adventure Trekking",
    "Cultural Tour",
    "Wildlife Safari",
    "Pilgrimage",
    "Luxury Travel"
  ];

  const destinations = [
    "Kathmandu Valley",
    "Pokhara",
    "Chitwan",
    "Everest Region",
    "Annapurna Region",
    "Lumbini",
    "Mustang"
  ];

  const seasons = [
    "Spring (Mar-May)",
    "Summer (Jun-Aug)",
    "Autumn (Sep-Nov)",
    "Winter (Dec-Feb)"
  ];

  const handleInputChange = (field, value) => {
    setTripData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Trip estimate request submitted successfully!\n\nDestination: ${tripData.destination}\nCategory: ${tripData.category}\nDuration: ${tripData.duration} days\nSeason: ${tripData.season}`);
  };

  return (
    <>
      <Navbar />

      <div className="trip-estimate-container">
        {/* Header Section */}
        <header className="estimate-header">
          <div className="container">
            <div className="header-content">
              <div className="header-icon">
                <FaCalculator />
              </div>
              <h1>Plan Your Nepal Journey Smartly</h1>
              <p className="header-description">
                Get an instant AI-powered cost estimate for your next adventure.
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="estimate-main">
          <div className="container">
            <div className="estimate-card">
              <h2>Trip Details</h2>

              <form onSubmit={handleSubmit} className="trip-form">
                {/* Duration */}
                <div className="form-group">
                  <label htmlFor="duration">
                    <FaCalendarAlt className="input-icon" />
                    Trip Duration
                  </label>
                  <div className="duration-input">
                    <button
                      type="button"
                      className="duration-btn"
                      onClick={() =>
                        handleInputChange("duration", Math.max(1, tripData.duration - 1))
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="duration"
                      value={tripData.duration}
                      onChange={(e) =>
                        handleInputChange("duration", parseInt(e.target.value) || 1)
                      }
                      min="1"
                      max="30"
                    />
                    <span className="duration-text">Days</span>
                    <button
                      type="button"
                      className="duration-btn"
                      onClick={() =>
                        handleInputChange("duration", Math.min(30, tripData.duration + 1))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Category */}
                <div className="form-group">
                  <label htmlFor="category">
                    <FaCalendarAlt className="input-icon" />
                    Travel Category
                  </label>
                  <select
                    id="category"
                    value={tripData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    {travelCategories.map((cat, i) => (
                      <option key={i} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Destination */}
                <div className="form-group">
                  <label htmlFor="destination">
                    <FaMapMarkerAlt className="input-icon" />
                    Destination
                  </label>
                  <select
                    id="destination"
                    value={tripData.destination}
                    onChange={(e) => handleInputChange("destination", e.target.value)}
                    required
                  >
                    <option value="">Select destination</option>
                    {destinations.map((dest, i) => (
                      <option key={i} value={dest}>
                        {dest}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Season */}
                <div className="form-group">
                  <label htmlFor="season">
                    <FaSun className="input-icon" />
                    Season
                  </label>
                  <select
                    id="season"
                    value={tripData.season}
                    onChange={(e) => handleInputChange("season", e.target.value)}
                    required
                  >
                    <option value="">Select season</option>
                    {seasons.map((s, i) => (
                      <option key={i} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="submit-btn">
                  Get My Trip Estimate
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
