import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Forms.css';

const Prescription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { prediction, visitData } = location.state || {};
  
  const [formData, setFormData] = useState({
    medicines: '',
    dosage: '',
    advice: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
    prescriptions.push({
      ...formData,
      visitData,
      prediction,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
    
    setSuccess(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <div className="page-header">
            <h1>Add Prescription</h1>
          </div>

          {success && (
            <div className="alert alert-success">
              Prescription saved successfully! Redirecting...
            </div>
          )}

          {prediction && (
            <div className="info-card">
              <h3>Risk Assessment: <span className={`risk-${prediction.riskLevel.toLowerCase()}`}>
                {prediction.riskLevel} ({prediction.riskScore}%)
              </span></h3>
            </div>
          )}

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Medicines *</label>
                <textarea
                  name="medicines"
                  value={formData.medicines}
                  onChange={handleChange}
                  rows="4"
                  placeholder="List medicines (one per line)"
                  required
                />
              </div>

              <div className="form-group">
                <label>Dosage Instructions *</label>
                <textarea
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Dosage and frequency for each medicine"
                  required
                />
              </div>

              <div className="form-group">
                <label>Medical Advice *</label>
                <textarea
                  name="advice"
                  value={formData.advice}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Additional advice and precautions"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => navigate('/dashboard')} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
