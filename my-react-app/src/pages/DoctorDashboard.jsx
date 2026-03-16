import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showVisitHistory, setShowVisitHistory] = useState(false);
  const [showUpdatePrescriptionModal, setShowUpdatePrescriptionModal] = useState(false);
  const [visitHistory, setVisitHistory] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState({
    medicines: '',
    dosage: '',
    advice: ''
  });
  const [updatedPrescription, setUpdatedPrescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    filterPatients();
  }, [searchQuery, patients]);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/doctor/patients?page=0&size=100', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setPatients(data.content || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setPatients([]);
    }
  };

  const filterPatients = () => {
    if (!searchQuery) {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(p =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.patientId?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  };

  const handleAddPrescription = (patient) => {
    const userRole = localStorage.getItem('role');
    
    // Only ASHA workers need sync validation
    if (userRole === 'ASHA') {
      if (!patient.id || typeof patient.id === 'string' || patient.id > 1000000000000) {
        alert('Cannot add prescription for offline patients. Please sync patient to database first.');
        return;
      }
    }
    
    // DOCTOR can add prescription for any patient
    setSelectedPatient(patient);
    setShowPrescriptionModal(true);
  };

  const handleSubmitPrescription = async (e) => {
    e.preventDefault();
    const userRole = localStorage.getItem('role');
    
    // Check if patient is from localStorage (offline patient)
    const isOfflinePatient = !selectedPatient.id || typeof selectedPatient.id === 'string' || selectedPatient.id > 1000000000000;
    
    // For DOCTOR: Save to localStorage if patient is offline
    if (isOfflinePatient) {
      const prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
      prescriptions.push({
        ...prescriptionData,
        patientId: selectedPatient.patientId,
        patientName: selectedPatient.name,
        date: new Date().toISOString(),
        doctorId: localStorage.getItem('userId')
      });
      localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
      alert('Prescription saved locally!');
      setShowPrescriptionModal(false);
      setPrescriptionData({ medicines: '', dosage: '', advice: '' });
      return;
    }
    
    // For database patients: Call API
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:8080/api/doctor/patients/${selectedPatient.id}/prescriptions?doctorId=${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(prescriptionData)
      });
      
      if (response.ok) {
        alert('Prescription added successfully!');
        setShowPrescriptionModal(false);
        setPrescriptionData({ medicines: '', dosage: '', advice: '' });
      } else {
        alert('Failed to add prescription');
      }
    } catch (error) {
      console.error('Error adding prescription:', error);
      alert('Failed to add prescription');
    }
  };

  const handleUpdatePrescription = (patient) => {
    setSelectedPatient(patient);
    setUpdatedPrescription(patient.prescription || '');
    setShowUpdatePrescriptionModal(true);
  };

  const handleSubmitUpdatedPrescription = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/doctor/patients/${selectedPatient.id}/prescription`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'text/plain'
        },
        body: updatedPrescription
      });
      
      if (response.ok) {
        alert('Prescription updated successfully!');
        setShowUpdatePrescriptionModal(false);
        fetchPatients();
      }
    } catch (error) {
      console.error('Error updating prescription:', error);
      alert('Failed to update prescription');
    }
  };

  const handleDownloadReport = (patient) => {
    alert(`Downloading report for ${patient.name}...`);
  };

  const handleViewVisitHistory = (patient) => {
    setSelectedPatient(patient);
    setVisitHistory([
      { date: '2024-01-15', symptoms: 'Fever, Headache', diagnosis: 'Viral Infection' },
      { date: '2024-01-10', symptoms: 'Cough', diagnosis: 'Common Cold' }
    ]);
    setShowVisitHistory(true);
  };

  const getRiskLevel = (patient) => {
    if (patient.patientType === 'PREGNANCY') {
      const bp = patient.pregnancyDetails?.bpSystolic || 0;
      if (bp > 140) return 'High';
      if (bp > 120) return 'Medium';
      return 'Low';
    } else {
      const sugar = patient.diabetesDetails?.bloodSugar || 0;
      if (sugar > 200) return 'High';
      if (sugar > 140) return 'Medium';
      return 'Low';
    }
  };

  return (
    <div className="doctor-dashboard">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>Doctor Dashboard</h1>
            <button className="add-patient-btn" onClick={() => navigate('/doctor/add-patient')}>
              + Add Patient
            </button>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by patient name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="patients-table-container">
            <h2>Patient List</h2>
            <table className="patients-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Type</th>
                  <th>Assigned ASHA</th>
                  <th>Prescription</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-data">No patients found</td>
                  </tr>
                ) : (
                  filteredPatients.map(patient => (
                    <tr key={patient.id}>
                      <td>{patient.patientId}</td>
                      <td>{patient.name}</td>
                      <td>{patient.age}</td>
                      <td>
                        <span className={`type-badge ${patient.patientType?.toLowerCase()}`}>
                          {patient.patientType}
                        </span>
                      </td>
                      <td>{patient.assignedAshaName || 'Not Assigned'}</td>
                      <td>{patient.prescription || 'No prescription'}</td>
                      <td className="action-buttons">
                        <button 
                          className="btn-prescription"
                          onClick={() => handleUpdatePrescription(patient)}
                        >
                          Update Prescription
                        </button>
                        <button 
                          className="btn-view"
                          onClick={() => navigate(`/doctor/patient-history/${patient.id}`)}
                        >
                          View History
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showPrescriptionModal && (
        <div className="modal-overlay" onClick={() => setShowPrescriptionModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add Prescription for {selectedPatient?.name}</h2>
            <form onSubmit={handleSubmitPrescription}>
              <div className="form-group">
                <label>Medicines</label>
                <textarea
                  value={prescriptionData.medicines}
                  onChange={(e) => setPrescriptionData({...prescriptionData, medicines: e.target.value})}
                  placeholder="Enter medicines..."
                  required
                />
              </div>
              <div className="form-group">
                <label>Dosage</label>
                <textarea
                  value={prescriptionData.dosage}
                  onChange={(e) => setPrescriptionData({...prescriptionData, dosage: e.target.value})}
                  placeholder="Enter dosage instructions..."
                  required
                />
              </div>
              <div className="form-group">
                <label>Advice</label>
                <textarea
                  value={prescriptionData.advice}
                  onChange={(e) => setPrescriptionData({...prescriptionData, advice: e.target.value})}
                  placeholder="Enter medical advice..."
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowPrescriptionModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Add Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showUpdatePrescriptionModal && (
        <div className="modal-overlay" onClick={() => setShowUpdatePrescriptionModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Update Prescription - {selectedPatient?.name}</h2>
            <form onSubmit={handleSubmitUpdatedPrescription}>
              <div className="form-group">
                <label>Prescription</label>
                <textarea
                  value={updatedPrescription}
                  onChange={(e) => setUpdatedPrescription(e.target.value)}
                  placeholder="Enter prescription details..."
                  rows="6"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowUpdatePrescriptionModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Update Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showVisitHistory && (
        <div className="modal-overlay" onClick={() => setShowVisitHistory(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Visit History - {selectedPatient?.name}</h2>
            <div className="visit-history-list">
              {visitHistory.map((visit, index) => (
                <div key={index} className="visit-item">
                  <div className="visit-date">{visit.date}</div>
                  <div className="visit-details">
                    <p><strong>Symptoms:</strong> {visit.symptoms}</p>
                    <p><strong>Diagnosis:</strong> {visit.diagnosis}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-cancel" onClick={() => setShowVisitHistory(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
