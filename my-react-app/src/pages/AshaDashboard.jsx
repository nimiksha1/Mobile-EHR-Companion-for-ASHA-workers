import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './DoctorDashboard.css';
import './AshaDashboard.css';

const AshaDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignedPatients();
  }, []);

  const fetchAssignedPatients = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:8080/api/patients/asha', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      if (response.status === 403) {
        const errBody = await response.json().catch(() => ({}));
        console.error('Access denied - role in token may not match. Body:', errBody);
        return;
      }

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        console.error('API error:', response.status, errBody);
        return;
      }

      const data = await response.json();
      setPatients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(p =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.patientId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="doctor-dashboard">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>ASHA Dashboard</h1>
            <button onClick={fetchAssignedPatients} className="btn-refresh">
              Refresh
            </button>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search assigned patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="patients-stats">
            <div className="stat-card">
              <h3>Total Assigned Patients</h3>
              <p className="stat-number">{patients.length}</p>
            </div>
            <div className="stat-card">
              <h3>Pregnancy Cases</h3>
              <p className="stat-number">
                {patients.filter(p => p.patientType === 'PREGNANCY').length}
              </p>
            </div>
            <div className="stat-card">
              <h3>Diabetes Cases</h3>
              <p className="stat-number">
                {patients.filter(p => p.patientType === 'DIABETES').length}
              </p>
            </div>
          </div>

          <div className="patients-table-container">
            {loading ? (
              <div className="loading-message">
                <p>Loading assigned patients...</p>
              </div>
            ) : (
              <table className="patients-table">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Type</th>
                    <th>Phone</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="no-data">
                        No assigned patients available
                      </td>
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
                          {patient.createdDate ?
                            new Date(patient.createdDate).toLocaleDateString() :
                            'N/A'
                          }
                        </td>
                        <td>
                          <button
                            className="btn-prescription"
                            onClick={() => navigate(`/asha/update-patient/${patient.id}`)}
                          >
                            Update
                          </button>
                          <button
                            className="btn-view"
                            onClick={() => navigate(`/patient-history/${patient.id}`)}
                            style={{ marginLeft: '5px' }}
                          >
                            View History
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AshaDashboard;
