import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './DoctorDashboard.css';

const AshaDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignedPatients();
  }, []);

  const fetchAssignedPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/patients/asha', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        console.error('Failed to fetch patients:', response.status);
        setPatients([]);
        return;
      }
      
      const data = await response.json();
      setPatients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setPatients([]);
    }
  };

  const filteredPatients = Array.isArray(patients) ? patients.filter(p =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.patientId?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="doctor-dashboard">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>ASHA Dashboard</h1>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search assigned patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="patients-table-container">
            <table className="patients-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Type</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">No assigned patients</td>
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
                      <td>{patient.phone}</td>
                      <td>
                        <button 
                          className="btn-prescription"
                          onClick={() => navigate(`/asha/update-patient/${patient.id}`)}
                        >
                          Update
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
    </div>
  );
};

export default AshaDashboard;
