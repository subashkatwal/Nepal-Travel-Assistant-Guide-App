import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { 
  FaFileAlt, FaUser, FaPassport, FaGlobe, FaMapMarkerAlt, 
  FaCalendarAlt, FaUpload, FaFlag, FaIdCard 
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/permit-applications.css";

export default function PermitApplications() {
  const [formData, setFormData] = useState({
    permitType: "foreign",
    fullName: "",
    passportNumber: "",
    citizenshipId: "",
    nationality: "",
    destination: "",
    duration: 7,
    purpose: "",
    idDocument: null,
  });

  const [permits, setPermits] = useState([]);
  const [loading, setLoading] = useState(false);

  const destinations = [
    "Upper Mustang","Upper Dolpo","Lower Dolpo","Manaslu Circuit",
    "Kanchenjunga Base Camp","Makalu Base Camp","Humla","Simikot"
  ];

  const purposes = ["Trekking","Mountaineering","Research","Photography","Cultural Tour","Adventure Sports"];
  const nationalities = ["United States","United Kingdom","Canada","Australia","Germany","France","Japan","China","India","Other"];

  // Universal input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // File input handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setFormData(prev => ({ ...prev, idDocument: file }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("permit_type", formData.permitType);
    formDataToSend.append("full_name", formData.fullName);
    formDataToSend.append("passport_number", formData.passportNumber);
    formDataToSend.append("citizenship_id", formData.citizenshipId);
    formDataToSend.append("nationality", formData.nationality);
    formDataToSend.append("destination", formData.destination);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("purpose", formData.purpose);
    if (formData.idDocument) formDataToSend.append("id_document", formData.idDocument);

    try {
      const res = await fetch("http://localhost:8000/api/permits/apply/", {
        method: "POST",
        body: formDataToSend,
      });
      if (!res.ok) throw new Error("Failed to submit application");
      alert("Application submitted successfully!");
      fetchPermits();
      setFormData({
        permitType: "foreign",
        fullName: "",
        passportNumber: "",
        citizenshipId: "",
        nationality: "",
        destination: "",
        duration: 7,
        purpose: "",
        idDocument: null,
      });
    } catch (err) {
      console.error(err);
      alert("Error submitting application");
    } finally {
      setLoading(false);
    }
  };

  // Fetch permits
  const fetchPermits = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/permits/all/");
      if (!res.ok) throw new Error("Failed to fetch permits");
      const data = await res.json();
      setPermits(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPermits();
  }, []);

  // Generate PDF receipt
  const generatePermitReceipt = (permit) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Nepal Tourism Permit Receipt", 55, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    let y = 40;
    const gap = 10;

    const lines = [
      `Name: ${permit.full_name}`,
      `Permit Type: ${permit.permit_type}`,
      `Destination: ${permit.destination}`,
      `Duration: ${permit.duration} days`,
      `Purpose: ${permit.purpose}`,
      `Status: ${permit.status}`,
    ];
    lines.forEach(line => { doc.text(line, 20, y); y += gap; });

    if (permit.status === "approved") {
      doc.setTextColor(0, 128, 0);
      doc.text(`Permit ID: ${permit.permit_id}`, 20, y + 5);
      doc.text("Approved by Nepal Tourism Board", 20, y + 15);
    } else if (permit.status === "rejected") {
      doc.setTextColor(255, 0, 0);
      doc.text("Application Rejected", 20, y + 5);
      doc.text(`Reason: ${permit.rejection_reason || "Not specified"}`, 20, y + 15);
    } else {
      doc.setTextColor(0, 0, 0);
      doc.text(" Application Pending Approval", 20, y + 5);
    }

    doc.save(`permit_${permit.id}.pdf`);
  };

  const handleViewReceipt = async (permitId) => {
    try {
      const res = await fetch(`http://localhost:8000/api/permits/${permitId}/`);
      if (!res.ok) throw new Error("Failed to fetch permit");
      const permitData = await res.json();
      generatePermitReceipt(permitData);
    } catch (err) {
      console.error(err);
      alert("Could not load permit data.");
    }
  };

  return (
    <div className="permit-applications-container">
      <Navbar />

      <header className="permit-header">
        <div className="container">
          <div className="header-content">
            <div className="header-icon"><FaFileAlt /></div>
            <h1>Permit Applications</h1>
            <p className="header-description">
              Apply for tourist permits to explore restricted areas of Nepal
            </p>
          </div>
        </div>
      </header>

      <main className="permit-main">
        <div className="container">
          <div className="permit-card">
            <form onSubmit={handleSubmit} className="permit-form">

              {/* Permit Type */}
              <div className="form-section">
                <h2>Select Permit Type</h2>
                <div className="permit-type-selector">
                  <button
                    type="button"
                    className={`permit-type-option ${formData.permitType === "local" ? "selected" : ""}`}
                    onClick={() => setFormData(prev => ({ ...prev, permitType: "local" }))}
                  >
                    <FaUser /> Local Tourist
                  </button>

                  <button
                    type="button"
                    className={`permit-type-option ${formData.permitType === "foreign" ? "selected" : ""}`}
                    onClick={() => setFormData(prev => ({ ...prev, permitType: "foreign" }))}
                  >
                    <FaPassport /> Foreign Tourist
                  </button>
                </div>
              </div>

              {/* Personal Info */}
              <div className="form-section">
                <div className="form-group">
                  <label><FaUser /> Full Name</label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                {formData.permitType === "foreign" ? (
                  <>
                    <div className="form-group">
                      <label><FaPassport /> Passport Number</label>
                      <input
                        name="passportNumber"
                        value={formData.passportNumber}
                        onChange={handleChange}
                        placeholder="Enter passport number"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label><FaGlobe /> Nationality</label>
                      <select name="nationality" value={formData.nationality} onChange={handleChange} required>
                        <option value="">Select nationality</option>
                        {nationalities.map((n, i) => <option key={i} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </>
                ) : (
                  <div className="form-group">
                    <label><FaIdCard /> Citizenship ID</label>
                    <input
                      name="citizenshipId"
                      value={formData.citizenshipId}
                      onChange={handleChange}
                      placeholder="Enter citizenship number"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Destination & Trip */}
              <div className="form-section">
                <div className="form-group">
                  <label><FaMapMarkerAlt /> Destination</label>
                  <select name="destination" value={formData.destination} onChange={handleChange} required>
                    <option value="">Select destination</option>
                    {destinations.map((d, i) => <option key={i} value={d}>{d}</option>)}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label><FaCalendarAlt /> Duration (Days)</label>
                    <div className="duration-input">
                      <button type="button" className="duration-btn" onClick={() => setFormData(prev => ({ ...prev, duration: Math.max(1, prev.duration - 1) }))}>-</button>
                      <input type="number" name="duration" value={formData.duration} min="1" max="30" onChange={handleChange}/>
                      <button type="button" className="duration-btn" onClick={() => setFormData(prev => ({ ...prev, duration: Math.min(30, prev.duration + 1) }))}>+</button>
                    </div>
                  </div>

                  <div className="form-group half">
                    <label><FaFlag /> Purpose</label>
                    <select name="purpose" value={formData.purpose} onChange={handleChange} required>
                      <option value="">Select purpose</option>
                      {purposes.map((p, i) => <option key={i} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div className="form-section">
                <h3>Upload ID Document</h3>
                <label htmlFor="idDocument" className="file-upload-label">
                  <FaUpload className="upload-icon" />
                  <span className="upload-text">{formData.idDocument ? formData.idDocument.name : "Choose File"}</span>
                </label>
                <input
                  type="file"
                  id="idDocument"
                  name="idDocument"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>

          {/* Permit list */}
         <div className="permits-list">
  <h2>Your Submitted Permits</h2>

  {permits.length === 0 ? (
    <p className="empty-message">
      You have not submitted any permits yet. Fill out the form above to apply for a tourist permit.
    </p>
  ) : (
    <table className="permit-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Permit Type</th>
          <th>Destination</th>
          <th>Duration</th>
          <th>Purpose</th>
          <th>Status</th>
          <th>Receipt</th>
        </tr>
      </thead>
      <tbody>
        {permits.map(p => (
          <tr key={p.id}>
            <td>{p.full_name}</td>
            <td>{p.permit_type}</td>
            <td>{p.destination}</td>
            <td>{p.duration} days</td>
            <td>{p.purpose}</td>
            <td className={`status-${p.status.toLowerCase()}`}>
  {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
</td>
            <td>
              {p.status !== "pending" ? (
                <button onClick={() => handleViewReceipt(p.id)}>Download</button>
              ) : "Pending"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
