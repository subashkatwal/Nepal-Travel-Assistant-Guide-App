import { 
  FaShieldAlt, FaExclamationTriangle, FaTaxi, FaUserFriends, FaGem, 
  FaHandHoldingHeart, FaUtensils, FaBus, FaHiking, FaWater, FaLandmark 
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/safety-alerts.css";

export default function SafetyAlerts() {
  return (
    <div className="safety-alerts-page">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <header className="safety-header">
        <div className="container">
          <div className="header-content">
            <div className="header-icon"><FaShieldAlt /></div>
            <h1>Local Pricing & Safety Alerts</h1>
            <p className="header-description">
              Stay informed about fair prices and avoid common tourist scams
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="safety-main container">
        <div className="safety-grid">
          {/* Left Column - Scams */}
          <div className="scams-section">
            <h2><FaExclamationTriangle className="section-icon" />Common Tourist Scams</h2>

            <ScamItem 
              icon={<FaTaxi />} 
              title="Overpriced Taxi Rides" 
              description="Some taxi drivers may not use meters or quote inflated prices to tourists."
              prevention="Always insist on using the meter or agree on a fare before starting."
            />

            <ScamItem 
              icon={<FaUserFriends />} 
              title="Fake Tour Guides" 
              description="Unlicensed guides may offer services at lower prices but lack proper training."
              prevention="Verify guide credentials through official tourism boards or licensed agencies."
            />

            <ScamItem 
              icon={<FaGem />} 
              title="Gem Scams" 
              description="Sellers may claim gems are valuable and can be resold at profit."
              prevention="Avoid purchasing expensive items with promises of resale value."
            />

            <ScamItem 
              icon={<FaHandHoldingHeart />} 
              title="Charity Donations" 
              description="Some individuals may solicit donations for fake charities."
              prevention="Donate only to established, verified charitable organizations."
            />
          </div>

          {/* Right Column - Pricing */}
          <div className="pricing-section">
            <h2>Average Local Prices</h2>
            <div className="price-guide-card">
              <div className="price-guide-header">
                <h3>Price Guide (2024)</h3>
              </div>

              <PriceRow icon={<FaUtensils />} label="Local Meal" range="NPR 200–500" />
              <PriceRow icon={<FaUtensils />} label="Tourist Restaurant Meal" range="NPR 500–1000" />
              <PriceRow icon={<FaTaxi />} label="Taxi (per km)" range="NPR 50–70" />
              <PriceRow icon={<FaBus />} label="Local Bus Ride" range="NPR 20–50" />
              <PriceRow icon={<FaHiking />} label="Trekking Guide (per day)" range="NPR 2000–3000" />
              <PriceRow icon={<FaHiking />} label="Porter (per day)" range="NPR 1500–2000" />
              <PriceRow icon={<FaWater />} label="Water Bottle" range="NPR 30–50" />
              <PriceRow icon={<FaLandmark />} label="Temple Entry Fee" range="NPR 200–1000" />

              <div className="price-note">
                <div className="prevention-item">
                  <span className="checkbox">☐</span>
                  <span className="prevention-text">
                    Prices may vary by location and season. Tourist areas typically charge 20–50% more than local prices.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* Reusable Scam Item Component */
function ScamItem({ icon, title, description, prevention }) {
  return (
    <div className="scam-item">
      <div className="scam-header">
        <div className="scam-icon">{icon}</div>
        <h3>{title}</h3>
      </div>
      <p className="scam-description">{description}</p>
      <div className="prevention">
        <div className="prevention-item">
          <span className="checkbox">☐</span>
          <span className="prevention-text">
            <strong>Prevention:</strong> {prevention}
          </span>
        </div>
      </div>
    </div>
  );
}

function PriceRow({ icon, label, range }) {
  return (
    <div className="price-row">
      <div className="price-item">
        <div className="price-icon">{icon}</div>
        <span className="price-label">{label}</span>
      </div>
      <span className="price-range">{range}</span>
    </div>
  );
}
