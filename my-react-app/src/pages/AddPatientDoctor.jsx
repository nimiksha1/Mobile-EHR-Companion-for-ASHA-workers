import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Layout from '../components/Layout';
import './AddPatientDoctor.css';

const AddPatientDoctor = () => {
  const navigate = useNavigate();
  const { fetchPatients } = useData();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ashaWorkers, setAshaWorkers] = useState([]);
  const [loadingAsha, setLoadingAsha] = useState(true);
  
  const [formData, setFormData] = useState({
    patientId: 'P' + Date.now(),
    name: '',
    age: '',
    gender: 'Female',
    phone: '',
    address: '',
    assignedAshaId: '',
    prescription: '',
    type: 'Pregnancy',
    visitDate: new Date().toISOString().split('T')[0],
    height: '',
    weight: '',
    bmi: '',
    systolic: '',
    diastolic: '',
    bloodSugar: '',
    bodyTemperature: '',
    numberOfWeeks: '',
    hemoglobin: '',
    cholesterol: '',
    heartRate: '',
    oxygenLevel: ''
  });

  useEffect(() => {
    fetchAshaWorkers();
  }, []);

  const fetchAshaWorkers = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching ASHA workers with token:', token ? 'Present' : 'Missing');
      
      const response = await fetch('http://localhost:8080/api/doctor/asha-workers', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        console.error('Failed to fetch ASHA workers:', response.status, response.statusText);
        return;
      }
      
      const data = await response.json();
      console.log('ASHA workers received:', data);
      setAshaWorkers(data);
    } catch (error) {
      console.error('Error fetching ASHA workers:', error);
    } finally {
      setLoadingAsha(false);
    }
  };

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

    try {
      const token = localStorage.getItem('token');
      const doctorId = localStorage.getItem('userId');
      
      const requestData = {
        patientId: formData.patientId,
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        phone: formData.phone,
        address: formData.address,
        patientType: formData.type.toUpperCase(),
        prescription: formData.prescription,
        assignedAshaId: formData.assignedAshaId ? parseInt(formData.assignedAshaId) : null
      };

      if (formData.type === 'Pregnancy') {
        requestData.pregnancyDetails = {
          bpSystolic: parseInt(formData.systolic),
          bpDiastolic: parseInt(formData.diastolic),
          bloodSugar: parseFloat(formData.bloodSugar),
          bodyTemperature: parseFloat(formData.bodyTemperature),
          numberOfWeeks: parseInt(formData.numberOfWeeks),
          hemoglobin: parseFloat(formData.hemoglobin),
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          bmi: parseFloat(formData.bmi)
        };
      } else {
        requestData.diabetesDetails = {
          bpSystolic: parseInt(formData.systolic),
          bpDiastolic: parseInt(formData.diastolic),
          bloodSugar: parseFloat(formData.bloodSugar),
          cholesterol: parseFloat(formData.cholesterol),
          heartRate: parseInt(formData.heartRate),
          oxygenLevel: parseFloat(formData.oxygenLevel),
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          bmi: parseFloat(formData.bmi)
        };
      }

      const response = await fetch(`http://localhost:8080/api/doctor/patient?doctorId=${doctorId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        const patient = await response.json();
        
        // Create initial visit record
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
          notes: `Initial visit - Patient Type: ${formData.type}`
        };
        
        if (formData.type === 'Pregnancy') {
          visitData.notes += `, Hemoglobin: ${formData.hemoglobin || 'N/A'}, Weeks: ${formData.numberOfWeeks || 'N/A'}`;
        } else {
          visitData.notes += `, Cholesterol: ${formData.cholesterol || 'N/A'}, Oxygen Level: ${formData.oxygenLevel || 'N/A'}`;
        }
        
        // Add visit record
        await fetch(`http://localhost:8080/api/patients/${patient.id}/visit?doctorId=${doctorId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(visitData)
        });
        
        setSuccess(true);
        fetchPatients(); // Refresh patient list
        setTimeout(() => {
          navigate('/doctor/dashboard');
        }, 1500);
      } else {
        alert('Failed to register patient');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error registering patient');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
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
                <input type="text" name="patientId" value={formData.patientId} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Age *</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />
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
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Assigned ASHA Worker *</label>
                <select name="assignedAshaId" value={formData.assignedAshaId} onChange={handleChange} required>
                  <option value="">-- Select ASHA --</option>
                  {loadingAsha ? (
                    <option disabled>Loading...</option>
                  ) : (
                    ashaWorkers.map(asha => (
                      <option key={asha.id} value={asha.id}>{asha.name}</option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Prescription</label>
              <textarea 
                name="prescription" 
                value={formData.prescription} 
                onChange={handleChange} 
                rows="3"
                placeholder="Enter prescription details..."
              />
            </div>

            <div className="form-group">
              <label>Address *</label>
              <textarea name="address" value={formData.address} onChange={handleChange} rows="2" required />
            </div>
          </div>

          <div className="form-section">
            <h3>Physical Measurements</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Height (cm) *</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Weight (kg) *</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>BMI (Auto-calculated)</label>
                <input type="text" name="bmi" value={formData.bmi} readOnly className="readonly" />
              </div>
            </div>
          </div>

          {formData.type === 'Pregnancy' && (
            <div className="form-section pregnancy-section">
              <h3>Pregnancy Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Systolic BP (mmHg) *</label>
                  <input type="number" name="systolic" value={formData.systolic} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Diastolic BP (mmHg) *</label>
                  <input type="number" name="diastolic" value={formData.diastolic} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Blood Sugar (mg/dL) *</label>
                  <input type="number" name="bloodSugar" value={formData.bloodSugar} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Body Temperature (°F) *</label>
                  <input type="number" step="0.1" name="bodyTemperature" value={formData.bodyTemperature} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Number of Weeks *</label>
                  <input type="number" name="numberOfWeeks" value={formData.numberOfWeeks} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Hemoglobin (g/dL) *</label>
                  <input type="number" step="0.1" name="hemoglobin" value={formData.hemoglobin} onChange={handleChange} required />
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
                  <input type="number" name="systolic" value={formData.systolic} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Diastolic BP (mmHg) *</label>
                  <input type="number" name="diastolic" value={formData.diastolic} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Blood Sugar (mg/dL) *</label>
                  <input type="number" name="bloodSugar" value={formData.bloodSugar} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Cholesterol (mg/dL) *</label>
                  <input type="number" name="cholesterol" value={formData.cholesterol} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Heart Rate (bpm) *</label>
                  <input type="number" name="heartRate" value={formData.heartRate} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Oxygen Level (%) *</label>
                  <input type="number" name="oxygenLevel" value={formData.oxygenLevel} onChange={handleChange} required />
                </div>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/doctor/dashboard')} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Registering...' : 'Register Patient'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddPatientDoctor;
