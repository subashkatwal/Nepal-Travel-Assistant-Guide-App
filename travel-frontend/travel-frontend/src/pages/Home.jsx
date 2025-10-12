import mountains from "../assets/mountains.jpg";
import "../styles/home.css";
import { FaCalculator, FaFileAlt, FaMapMarkerAlt, FaShoppingBag, FaShieldAlt, FaArrowRight } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <Navbar />

      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(41, 86, 60, 0.5), rgba(41, 86, 60, 0.5)), url(${mountains})`,
        }}
      >
        <div className="hero-content">
          <h1>Plan Your Nepal Adventure</h1>
          <p className="hero-description">
            Discover Nepal with AI-driven trip estimates, safety alerts, and destination recommendations.
          </p>
          <div className="hero-buttons">
            <Link to="/destinations">
              <button className="btn-primary">Plan My Trip</button>
            </Link>
            <Link to="/shop">
              <button className="btn-secondary">Shop Essentials</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2>Everything You Need for Your Journey</h2>
          <p className="section-subtitle">
            Plan, prepare, and explore Nepal with confidence using our comprehensive travel tools
          </p>
          <div className="services-grid">
            <Link to="/trip-cost-estimator" className="service-card">
              <div className="service-icon"><FaCalculator /></div>
              <h3>Trip Cost Estimation</h3>
              <p>Get accurate cost estimates for your Nepal adventure based on AI predictions.</p>
            </Link>

            <Link to="/permit-applications" className="service-card">
              <div className="service-icon"><FaFileAlt /></div>
              <h3>Permit Applications</h3>
              <p>Apply for tourist permits easily through our streamlined process.</p>
            </Link>

            <Link to="/destination-recommendations" className="service-card">
              <div className="service-icon"><FaMapMarkerAlt /></div>
              <h3>Destination Recommendations</h3>
              <p>Discover the best places in Nepal tailored to your preferences.</p>
            </Link>

            <Link to="/shop" className="service-card">
              <div className="service-icon"><FaShoppingBag /></div>
              <h3>Travel Essentials</h3>
              <p>Shop for quality trekking gear and travel essentials.</p>
            </Link>

            <Link to="/safety-alerts" className="service-card">
              <div className="service-icon"><FaShieldAlt /></div>
              <h3>Safety & Scam Alerts</h3>
              <p>Stay informed about local prices and avoid common tourist scams.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Adventure?</h2>
          <p>Join thousands of travelers who have explored Nepal with our expert guidance and tools</p>
          <Link to="/trip-planner">
            <button className="btn-primary">
              Get Started Now <FaArrowRight className="btn-icon" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
