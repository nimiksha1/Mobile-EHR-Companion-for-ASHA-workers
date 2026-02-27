import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Forms.css';

const UpdatePatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchPatientDetails();
  }, [id]);

  useEffect(() => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100;
      const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(2);
      setFormData(prev => ({ ...prev, bmi }));
    }
  }, [formData.height, formData.weight]);

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/asha/patients?ashaId=${user.id}`);
      const patients = await response.json();
      const foundPatient = patients.find(p => p.id === parseInt(id));
      
      if (foundPatient) {
        setPatient(foundPatient);
        if (foundPatient.patientType === 'PREGNANCY' && foundPatient.pregnancyDetails) {
          setFormData(foundPatient.pregnancyDetails);
        } else if (foundPatient.patientType === 'DIABETES' && foundPatient.diabetesDetails) {
          setFormData(foundPatient.diabetesDetails);
        }
      }
    } catch (error) {
      alert('Error fetching patient details');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      [patient.patientType === 'PREGNANCY' ? 'pregnancyDetails' : 'diabetesDetails']: formData
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/asha/update/${id}?ashaId=${user.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        }
      );

      if (response.ok) {
        alert('Patient details updated successfully!');
        navigate('/assigned-patients');
      } else {
        const error = await response.text();
        alert(error || 'Failed to update patient');
      }
    } catch (error) {
      alert('Error updating patient details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) || e.target.value });
  };

  if (!patient) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <div className="page-header">
            <h1>Update Patient: {patient.name}</h1>
            <span className="patient-type-badge">{patient.patientType}</span>
          </div>

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              {patient.patientType === 'PREGNANCY' && (
                <div className="form-section pregnancy-section">
                  <h3>Pregnancy Health Factors</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Systolic BP (mmHg) *</label>
                      <input
                        type="number"
                        name="bpSystolic"
                        value={formData.bpSystolic || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Diastolic BP (mmHg) *</label>
                      <input
                        type="number"
                        name="bpDiastolic"
                        value={formData.bpDiastolic || ''}
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
                        step="0.1"
                        name="bloodSugar"
                        value={formData.bloodSugar || ''}
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
                        value={formData.bodyTemperature || ''}
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
                        value={formData.numberOfWeeks || ''}
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
                        value={formData.hemoglobin || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Height (cm) *</label>
                      <input
                        type="number"
                        step="0.1"
                        name="height"
                        value={formData.height || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Weight (kg) *</label>
                      <input
                        type="number"
                        step="0.1"
                        name="weight"
                        value={formData.weight || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>BMI (Auto-calculated)</label>
                      <input
                        type="text"
                        value={formData.bmi || ''}
                        readOnly
                        className="readonly"
                      />
                    </div>
                  </div>
                </div>
              )}

              {patient.patientType === 'DIABETES' && (
                <div className="form-section diabetes-section">
                  <h3>Diabetes Health Factors</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Systolic BP (mmHg) *</label>
                      <input
                        type="number"
                        name="bpSystolic"
                        value={formData.bpSystolic || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Diastolic BP (mmHg) *</label>
                      <input
                        type="number"
                        name="bpDiastolic"
                        value={formData.bpDiastolic || ''}
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
                        step="0.1"
                        name="bloodSugar"
                        value={formData.bloodSugar || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Cholesterol (mg/dL) *</label>
                      <input
                        type="number"
                        step="0.1"
                        name="cholesterol"
                        value={formData.cholesterol || ''}
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
                        value={formData.heartRate || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Oxygen Level (%) *</label>
                      <input
                        type="number"
                        step="0.1"
                        name="oxygenLevel"
                        value={formData.oxygenLevel || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Height (cm) *</label>
                      <input
                        type="number"
                        step="0.1"
                        name="height"
                        value={formData.height || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Weight (kg) *</label>
                      <input
                        type="number"
                        step="0.1"
                        name="weight"
                        value={formData.weight || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>BMI (Auto-calculated)</label>
                      <input
                        type="text"
                        value={formData.bmi || ''}
                        readOnly
                        className="readonly"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button type="button" onClick={() => navigate('/assigned-patients')} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePatientDetails;
