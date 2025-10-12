import "../styles/footer.css"; // optional, or keep styles in home.css

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Nepal Travel</h3>
            <p>Your trusted companion for exploring the beauty of Nepal.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/trip-estimate">Trip Estimate</a></li>
              <li><a href="/destinations">Destinations</a></li>
              <li><a href="/permits">Permits</a></li>
              <li><a href="/safety">Safety Info</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="/travel-essentials">Travel Essentials</a></li>
              <li><a href="/cost-planning">Cost Planning</a></li>
              <li><a href="/recommendations">Recommendations</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <div className="contact-info">
              <p>info@nepaltravel.com</p>
              <p>+977 1234567890</p>
              <p>Kathmandu, Nepal</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Made for Exploring Nepal</p>
          <p>&copy; 2025 Nepal Travel Assistant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
