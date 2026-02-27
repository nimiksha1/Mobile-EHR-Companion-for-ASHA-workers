import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './AssignedPatients.css';

const AssignedPatients = () => {
  const { patients } = useData();
  const { user } = useAuth();

  const assignedPatients = patients.filter(p => p.assignedAsha === user?.name);

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

          {assignedPatients.length === 0 ? (
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
