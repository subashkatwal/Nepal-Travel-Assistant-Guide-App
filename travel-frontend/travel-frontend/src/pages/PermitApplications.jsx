import { useState } from "react";
import { 
  FaFileAlt, FaUser, FaPassport, FaGlobe, FaMapMarkerAlt, 
  FaCalendarAlt, FaUpload, FaFlag, FaIdCard 
} from "react-icons/fa";
import Navbar from "../components/Navbar";  // import Navbar
import Footer from "../components/Footer";  // import Footer
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
    idDocument: null
  });

  const destinations = [
    "Upper Mustang","Upper Dolpo","Lower Dolpo","Manaslu Circuit",
    "Kanchenjunga Base Camp","Makalu Base Camp","Humla","Simikot"
  ];

  const purposes = ["Trekking","Mountaineering","Research","Photography","Cultural Tour","Adventure Sports"];
  const nationalities = ["United States","United Kingdom","Canada","Australia","Germany","France","Japan","China","India","Other"];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, idDocument: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Permit application:", formData);
  };

  /* Helper Components */

  const PermitOption = ({ selected, icon, title, description, onSelect }) => (
    <label className={`permit-type-option ${selected ? 'selected' : ''}`} onClick={onSelect}>
      <input type="radio" hidden />
      <div className="option-content">
        <div className="option-icon">{icon}</div>
        <div className="option-text">
          <strong>{title}</strong>
          <span className="option-description">{description}</span>
        </div>
      </div>
    </label>
  );

  const FormInput = ({ icon, label, value, onChange, placeholder }) => (
    <div className="form-group">
      <label>{icon} {label}</label>
      <input value={value} onChange={onChange} placeholder={placeholder} required />
    </div>
  );

  const FormSelect = ({ icon, label, options, value, onChange }) => (
    <div className="form-group">
      <label>{icon} {label}</label>
      <select value={value} onChange={onChange} required>
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  const DurationInput = ({ duration, onChange }) => (
    <div className="form-group half">
      <label><FaCalendarAlt /> Duration (Days)</label>
      <div className="duration-input">
        <button type="button" className="duration-btn" onClick={() => onChange(Math.max(1, duration - 1))}>-</button>
        <input type="number" value={duration} onChange={(e) => onChange(parseInt(e.target.value) || 1)} min="1" max="30" />
        <button type="button" className="duration-btn" onClick={() => onChange(Math.min(30, duration + 1))}>+</button>
      </div>
    </div>
  );

  const FileUpload = ({ file, onChange }) => (
    <div className="form-section">
      <h3>Upload ID Document</h3>
      <div className="file-upload-group">
        <label htmlFor="idDocument" className="file-upload-label">
          <FaUpload className="upload-icon" />
          <span className="upload-text">{file ? file.name : 'Choose File'}</span>
          <span className="file-chosen">{file ? 'File chosen' : 'No file chosen'}</span>
        </label>
        <input type="file" id="idDocument" onChange={onChange} accept=".pdf,.jpg,.jpeg,.png" required />
      </div>
    </div>
  );

  /* Main JSX */

  return (
    <div className="permit-applications-container">
      <Navbar />

      {/* Header */}
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

      {/* Main Form */}
      <main className="permit-main">
        <div className="container">
          <div className="permit-card">
            <form onSubmit={handleSubmit} className="permit-form">
              {/* Permit Type */}
              <div className="form-section">
                <h2>Select Permit Type</h2>
                <div className="permit-type-selector">
                  <PermitOption 
                    selected={formData.permitType === 'local'} 
                    icon={<FaUser />} 
                    title="Local Tourist" 
                    description="Nepali citizens"
                    onSelect={() => handleInputChange('permitType', 'local')}
                  />
                  <PermitOption 
                    selected={formData.permitType === 'foreign'} 
                    icon={<FaPassport />} 
                    title="Foreign Tourist" 
                    description="International visitors"
                    onSelect={() => handleInputChange('permitType', 'foreign')}
                  />
                </div>
              </div>

              {/* Personal Info */}
              <div className="form-section">
                <FormInput 
                  icon={<FaUser />} 
                  label="Full Name" 
                  value={formData.fullName} 
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter full name"
                />
                {formData.permitType === 'foreign' ? (
                  <>
                    <FormInput 
                      icon={<FaPassport />} 
                      label="Passport Number" 
                      value={formData.passportNumber} 
                      onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                      placeholder="Enter passport number"
                    />
                    <FormSelect 
                      icon={<FaGlobe />} 
                      label="Nationality" 
                      options={nationalities} 
                      value={formData.nationality} 
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                    />
                  </>
                ) : (
                  <FormInput 
                    icon={<FaIdCard />} 
                    label="Citizenship ID" 
                    value={formData.citizenshipId || ''} 
                    onChange={(e) => handleInputChange('citizenshipId', e.target.value)}
                    placeholder="Enter citizenship number"
                  />
                )}
              </div>

              {/* Destination & Trip */}
              <div className="form-section">
                <FormSelect 
                  icon={<FaMapMarkerAlt />} 
                  label="Destination" 
                  options={destinations} 
                  value={formData.destination} 
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                />
                <div className="form-row">
                  <DurationInput 
                    duration={formData.duration} 
                    onChange={(value) => handleInputChange('duration', value)}
                  />
                  <FormSelect 
                    icon={<FaFlag />} 
                    label="Purpose" 
                    options={purposes} 
                    value={formData.purpose} 
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                  />
                </div>
              </div>

              {/* File Upload */}
              <FileUpload 
                file={formData.idDocument} 
                onChange={handleFileChange} 
              />

              <button type="submit" className="submit-btn">Submit Application</button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
