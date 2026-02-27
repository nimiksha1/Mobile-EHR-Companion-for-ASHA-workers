import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { mlService } from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Forms.css';
import './AddVisit.css';

const AddVisit = () => {
  const navigate = useNavigate();
  const { patients, addVisit, addPrediction } = useData();
  const [formData, setFormData] = useState({
    patientId: '',
    systolic: '',
    diastolic: '',
    weight: '',
    hemoglobin: '',
    temperature: '',
    symptoms: ''
  });
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    addVisit(formData);

    const result = await mlService.predictRisk(formData);
    setPrediction(result);
    addPrediction({ ...result, visitData: formData, timestamp: new Date().toISOString() });
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddPrescription = () => {
    navigate('/prescription', { state: { prediction, visitData: formData } });
  };

  if (prediction) {
    return (
      <div className="app-layout">
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <div className="content-area">
            <div className="page-header">
              <h1>ML Prediction Result</h1>
            </div>

            <div className={`prediction-card ${prediction.riskLevel.toLowerCase()}`}>
              <div className="prediction-header">
                <h2>Risk Assessment</h2>
              </div>
              
              <div className="risk-score">
                <div className="score-circle">
                  <span className="score-value">{prediction.riskScore}%</span>
                </div>
                <h3 className={`risk-level ${prediction.riskLevel.toLowerCase()}`}>
                  {prediction.riskLevel} Risk
                </h3>
              </div>

              <div className="recommendation">
                <h4>Recommendation:</h4>
                <p>{prediction.recommendation}</p>
              </div>

              {prediction.riskLevel === 'High' && (
                <div className="alert alert-danger">
                  ⚠️ HIGH RISK ALERT: Immediate medical attention required!
                </div>
              )}

              <div className="form-actions">
                <button onClick={() => navigate('/dashboard')} className="btn-secondary">
                  Back to Dashboard
                </button>
                <button onClick={handleAddPrescription} className="btn-primary">
                  Add Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <div className="page-header">
            <h1>Add Visit</h1>
          </div>

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Patient *</label>
                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Patient --</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} - {patient.age} years
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Systolic BP (mmHg) *</label>
                  <input
                    type="number"
                    name="systolic"
                    value={formData.systolic}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Diastolic BP (mmHg) *</label>
                  <input
                    type="number"
                    name="diastolic"
                    value={formData.diastolic}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Weight (kg) *</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Hemoglobin (g/dL) *</label>
                  <input
                    type="number"
                    step="0.1"
                    name="hemoglobin"
                    value={formData.hemoglobin}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Temperature (°F) *</label>
                <input
                  type="number"
                  step="0.1"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Symptoms</label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe any symptoms..."
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => navigate('/dashboard')} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Analyzing...' : 'Save & Predict Risk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVisit;
