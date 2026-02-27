import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { mlService } from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
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
        systolic: found.pregnancyDetails?.systolic || found.diabetesDetails?.systolic || '',
        diastolic: found.pregnancyDetails?.diastolic || found.diabetesDetails?.diastolic || '',
        bloodSugar: found.pregnancyDetails?.bloodSugar || found.diabetesDetails?.bloodSugar || '',
        bodyTemperature: found.pregnancyDetails?.bodyTemperature || '',
        numberOfWeeks: found.pregnancyDetails?.numberOfWeeks || '',
        hemoglobin: found.pregnancyDetails?.hemoglobin || '',
        cholesterol: found.diabetesDetails?.cholesterol || '',
        heartRate: found.diabetesDetails?.heartRate || '',
        oxygenLevel: found.diabetesDetails?.oxygenLevel || ''
      });
    } else {
      alert('Patient not found');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await mlService.predictRisk({
      systolic: formData.systolic,
      diastolic: formData.diastolic,
      hemoglobin: formData.hemoglobin,
      weight: formData.weight
    });

    setPrediction(result);

    const updatedPatient = {
      ...formData,
      riskScore: result.riskScore,
      riskLevel: result.riskLevel,
      lastVisitDate: new Date().toLocaleDateString()
    };

    const patientIndex = patients.findIndex(p => p.patientId === formData.patientId);
    if (patientIndex !== -1) {
      patients[patientIndex] = updatedPatient;
      localStorage.setItem('patients', JSON.stringify(patients));
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!patient) {
    return (
      <div className="app-layout">
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <div className="content-area">
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
                <h3>Basic Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Patient ID</label>
                    <input type="text" value={formData.patientId} readOnly className="readonly" />
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Physical Measurements</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                    />
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
                    <label>Systolic BP</label>
                    <input
                      type="number"
                      name="systolic"
                      value={formData.systolic}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Diastolic BP</label>
                    <input
                      type="number"
                      name="diastolic"
                      value={formData.diastolic}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {formData.type === 'Pregnancy' && (
                  <div className="form-row">
                    <div className="form-group">
                      <label>Hemoglobin</label>
                      <input
                        type="number"
                        step="0.1"
                        name="hemoglobin"
                        value={formData.hemoglobin}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Number of Weeks</label>
                      <input
                        type="number"
                        name="numberOfWeeks"
                        value={formData.numberOfWeeks}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => navigate('/patients')} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Updating...' : 'Update & Predict'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPatient;
