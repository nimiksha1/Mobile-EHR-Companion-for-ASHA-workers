import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { mlService } from '../services/api';
import Layout from '../components/Layout';
import './AddPatientDoctor.css';

const EditPatient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { patients } = useData();
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState(id || '');
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    if (formData?.height && formData?.weight) {
      const heightInMeters = formData.height / 100;
      const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(2);
      setFormData(prev => ({ ...prev, bmi }));
    }
  }, [formData?.height, formData?.weight]);

  const handleSearch = () => {
    const found = patients.find(p => p.patientId === searchId);
    if (found) {
      setPatient(found);
      setFormData({
        ...found,
        visitDate: new Date().toISOString().split('T')[0],
        systolic: found.pregnancyDetails?.systolic || found.diabetesDetails?.systolic || '',
        diastolic: found.pregnancyDetails?.diastolic || found.diabetesDetails?.diastolic || '',
        bloodSugar: found.pregnancyDetails?.bloodSugar || found.diabetesDetails?.bloodSugar || '',
        bodyTemperature: found.pregnancyDetails?.bodyTemperature || '',
        numberOfWeeks: found.pregnancyDetails?.numberOfWeeks || '',
        hemoglobin: found.pregnancyDetails?.hemoglobin || '',
        cholesterol: found.diabetesDetails?.cholesterol || '',
        heartRate: found.diabetesDetails?.heartRate || '',
        oxygenLevel: found.diabetesDetails?.oxygenLevel || '',
        address: found.address || '',
        prescription: found.prescription || ''
      });
    } else {
      alert('Patient not found');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const doctorId = localStorage.getItem('userId');
      
      // Create visit record
      const visitData = {
        visitDate: formData.visitDate,
        bloodPressure: formData.systolic && formData.diastolic ? `${formData.systolic}/${formData.diastolic}` : null,
        sugarLevel: formData.bloodSugar ? parseFloat(formData.bloodSugar) : null,
        cholesterol: formData.cholesterol ? parseFloat(formData.cholesterol) : null,
        heartRate: formData.heartRate ? parseInt(formData.heartRate) : null,
        oxygenLevel: formData.oxygenLevel ? parseFloat(formData.oxygenLevel) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        temperature: formData.bodyTemperature ? parseFloat(formData.bodyTemperature) : null,
        pulseRate: formData.heartRate ? parseInt(formData.heartRate) : null,
        numberOfWeeks: formData.numberOfWeeks ? parseInt(formData.numberOfWeeks) : null,
        hemoglobin: formData.hemoglobin ? parseFloat(formData.hemoglobin) : null,
        address: formData.address || null,
        prescription: formData.prescription || null,
        notes: `Follow-up visit - Updated vitals`
      };
      
      if (formData.type === 'Pregnancy') {
        visitData.notes += `, Hemoglobin: ${formData.hemoglobin || 'N/A'}, Weeks: ${formData.numberOfWeeks || 'N/A'}`;
      } else {
        visitData.notes += `, Cholesterol: ${formData.cholesterol || 'N/A'}, Oxygen Level: ${formData.oxygenLevel || 'N/A'}`;
      }
      
      await fetch(`http://localhost:8080/api/patients/${patient.id}/visit?doctorId=${doctorId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(visitData)
      });
      
      alert('Visit record updated successfully!');
      navigate(`/doctor/patient-history/${patient.id}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating visit record');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!patient) {
    return (
      <Layout>
        <div className="page-header">
          <h1>Edit Patient</h1>
        </div>
        <div className="form-card">
          <div className="form-group">
            <label>Search Patient by ID</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Patient ID"
              />
              <button onClick={handleSearch} className="btn-primary">
                Search
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-header">
        <h1>Edit Patient: {patient.name}</h1>
      </div>

      {prediction && (
        <div className={`alert alert-${prediction.riskLevel.toLowerCase()}`}>
          Risk Updated: {prediction.riskLevel} ({prediction.riskScore}%)
        </div>
      )}

      <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Visit Information</h3>
                <div className="form-group">
                  <label>Visit Date *</label>
                  <input 
                    type="date" 
                    name="visitDate" 
                    value={formData.visitDate} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Basic Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Patient ID</label>
                    <input type="text" value={formData.patientId} readOnly className="readonly" />
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Physical Measurements</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Height (cm)</label>
                    <input type="number" name="height" value={formData.height} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Weight (kg)</label>
                    <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>BMI</label>
                    <input type="text" value={formData.bmi} readOnly className="readonly" />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Vital Signs</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Systolic BP (mmHg) *</label>
                    <input type="number" name="systolic" value={formData.systolic} onChange={handleChange} min="0" required />
                  </div>
                  <div className="form-group">
                    <label>Diastolic BP (mmHg) *</label>
                    <input type="number" name="diastolic" value={formData.diastolic} onChange={handleChange} min="0" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Blood Sugar (mg/dL) *</label>
                    <input type="number" name="bloodSugar" value={formData.bloodSugar} onChange={handleChange} min="0" required />
                  </div>
                  <div className="form-group">
                    <label>Cholesterol (mg/dL) *</label>
                    <input type="number" name="cholesterol" value={formData.cholesterol} onChange={handleChange} min="0" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Heart Rate (bpm) *</label>
                    <input type="number" name="heartRate" value={formData.heartRate} onChange={handleChange} min="0" required />
                  </div>
                  <div className="form-group">
                    <label>Oxygen Level (%) *</label>
                    <input type="number" name="oxygenLevel" value={formData.oxygenLevel} onChange={handleChange} min="0" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Body Temperature (°F) *</label>
                    <input type="number" step="0.1" name="bodyTemperature" value={formData.bodyTemperature} onChange={handleChange} min="0" required />
                  </div>
                  <div className="form-group">
                    <label>Hemoglobin (g/dL) *</label>
                    <input type="number" step="0.1" name="hemoglobin" value={formData.hemoglobin} onChange={handleChange} min="0" required />
                  </div>
                </div>
                {formData.type === 'Pregnancy' && (
                  <div className="form-row">
                    <div className="form-group">
                      <label>Number of Weeks *</label>
                      <input type="number" name="numberOfWeeks" value={formData.numberOfWeeks} onChange={handleChange} min="0" required />
                    </div>
                    <div className="form-group"></div>
                  </div>
                )}
              </div>

              <div className="form-section">
                <h3>Additional Information</h3>
                <div className="form-group">
                  <label>Address</label>
                  <textarea name="address" value={formData.address || ''} onChange={handleChange} rows="2" placeholder="Enter patient address" />
                </div>
                <div className="form-group">
                  <label>Prescription</label>
                  <textarea name="prescription" value={formData.prescription || ''} onChange={handleChange} rows="4" placeholder="Enter prescription details" />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => navigate('/patients')} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Visit Record'}
                </button>
              </div>
            </form>
          </div>
    </Layout>
  );
};

export default EditPatient;
