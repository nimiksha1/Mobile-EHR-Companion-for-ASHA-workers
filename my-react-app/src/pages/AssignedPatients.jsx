import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './AssignedPatients.css';

const AssignedPatients = () => {
  const [assignedPatients, setAssignedPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/patients/asha', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAssignedPatients(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <div className="page-header">
            <h1>Assigned Patients</h1>
            <p>Read-only view of patients assigned to you</p>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : assignedPatients.length === 0 ? (
            <div className="empty-state">
              <p>No patients assigned yet.</p>
            </div>
          ) : (
            <div className="patients-grid">
              {assignedPatients.map((patient) => (
                <div key={patient.patientId} className="patient-card">
                  <div className="patient-header">
                    <h3>{patient.name}</h3>
                    <span className="type-badge">{patient.type}</span>
                  </div>
                  <div className="patient-details">
                    <div className="detail-row">
                      <span className="label">Patient ID:</span>
                      <span className="value">{patient.patientId}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Age:</span>
                      <span className="value">{patient.age} years</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Address:</span>
                      <span className="value">{patient.address}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Type:</span>
                      <span className="value">{patient.type}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Last Visit:</span>
                      <span className="value">{patient.lastVisitDate || 'No visits yet'}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate(`/asha/update-patient/${patient.id}`)}
                    className="btn-update"
                  >
                    Update Health Factors
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignedPatients;
