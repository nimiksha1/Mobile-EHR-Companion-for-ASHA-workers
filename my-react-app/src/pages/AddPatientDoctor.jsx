import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './AddPatientDoctor.css';

const AddPatientDoctor = () => {
  const navigate = useNavigate();
  const { addPatient } = useData();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    patientId: 'P' + Date.now(),
    name: '',
    age: '',
    gender: 'Female',
    phone: '',
    address: '',
    assignedAsha: '',
    type: 'Pregnancy',
    height: '',
    weight: '',
    bmi: '',
    // Pregnancy fields
    systolic: '',
    diastolic: '',
    bloodSugar: '',
    bodyTemperature: '',
    numberOfWeeks: '',
    hemoglobin: '',
    // Diabetes fields
    cholesterol: '',
    heartRate: '',
    oxygenLevel: ''
  });

  const ashaWorkers = ['Priya Sharma', 'Sunita Devi', 'Rekha Singh'];

  useEffect(() => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100;
      const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(2);
      setFormData(prev => ({ ...prev, bmi }));
    }
  }, [formData.height, formData.weight]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const patientData = {
      patientId: formData.patientId,
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      phone: formData.phone,
      address: formData.address,
      assignedAsha: formData.assignedAsha,
      type: formData.type,
      height: formData.height,
      weight: formData.weight,
      bmi: formData.bmi,
      lastVisitDate: new Date().toLocaleDateString(),
      riskLevel: 'Low',
      riskScore: 0
    };

    if (formData.type === 'Pregnancy') {
      patientData.pregnancyDetails = {
        systolic: formData.systolic,
        diastolic: formData.diastolic,
        bloodSugar: formData.bloodSugar,
        bodyTemperature: formData.bodyTemperature,
        numberOfWeeks: formData.numberOfWeeks,
        hemoglobin: formData.hemoglobin
      };
    } else {
      patientData.diabetesDetails = {
        systolic: formData.systolic,
        diastolic: formData.diastolic,
        bloodSugar: formData.bloodSugar,
        cholesterol: formData.cholesterol,
        heartRate: formData.heartRate,
        oxygenLevel: formData.oxygenLevel
      };
    }

    addPatient(patientData);
    setSuccess(true);
    setLoading(false);
    
    setTimeout(() => {
      navigate('/patients');
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
            <h1>Add New Patient</h1>
          </div>

          {success && (
            <div className="alert alert-success">
              Patient registered successfully! Redirecting...
            </div>
          )}

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Patient Type</h3>
                <div className="form-group">
                  <label>Select Patient Type *</label>
                  <select name="type" value={formData.type} onChange={handleChange} required>
                    <option value="Pregnancy">Pregnancy</option>
                    <option value="Diabetes">Diabetes</option>
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h3>Basic Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Patient ID *</label>
                    <input
                      type="text"
                      name="patientId"
                      value={formData.patientId}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Age *</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender *</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Assigned ASHA Worker *</label>
                    <select name="assignedAsha" value={formData.assignedAsha} onChange={handleChange} required>
                      <option value="">-- Select ASHA --</option>
                      {ashaWorkers.map(asha => (
                        <option key={asha} value={asha}>{asha}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Physical Measurements</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Height (cm) *</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      required
                    />
                  </div>
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
                    <label>BMI (Auto-calculated)</label>
                    <input
                      type="text"
                      name="bmi"
                      value={formData.bmi}
                      readOnly
                      className="readonly"
                    />
                  </div>
                </div>
              </div>

              {formData.type === 'Pregnancy' && (
                <div className="form-section pregnancy-section">
                  <h3>Pregnancy Details</h3>
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
                      <label>Blood Sugar (mg/dL) *</label>
                      <input
                        type="number"
                        name="bloodSugar"
                        value={formData.bloodSugar}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Body Temperature (°F) *</label>
                      <input
                        type="number"
                        step="0.1"
                        name="bodyTemperature"
                        value={formData.bodyTemperature}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Number of Weeks *</label>
                      <input
                        type="number"
                        name="numberOfWeeks"
                        value={formData.numberOfWeeks}
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
                </div>
              )}

              {formData.type === 'Diabetes' && (
                <div className="form-section diabetes-section">
                  <h3>Diabetes Details</h3>
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
                      <label>Blood Sugar (mg/dL) *</label>
                      <input
                        type="number"
                        name="bloodSugar"
                        value={formData.bloodSugar}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Cholesterol (mg/dL) *</label>
                      <input
                        type="number"
                        name="cholesterol"
                        value={formData.cholesterol}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Heart Rate (bpm) *</label>
                      <input
                        type="number"
                        name="heartRate"
                        value={formData.heartRate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Oxygen Level (%) *</label>
                      <input
                        type="number"
                        name="oxygenLevel"
                        value={formData.oxygenLevel}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button type="button" onClick={() => navigate('/dashboard')} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Registering...' : 'Register Patient'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatientDoctor;
