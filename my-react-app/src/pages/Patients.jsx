import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PatientCard from '../components/PatientCard';
import './Patients.css';

const Patients = () => {
  const { patients } = useData();
  const navigate = useNavigate();

  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <div className="page-header">
            <h1>All Patients</h1>
          </div>

          {patients.length === 0 ? (
            <div className="empty-state">
              <p>No patients added yet. Click "Add Patient" to get started.</p>
            </div>
          ) : (
            <div className="patients-grid">
              {patients.map((patient) => (
                <PatientCard
                  key={patient.patientId}
                  patient={patient}
                  onClick={() => navigate(`/doctor/edit-patient/${patient.patientId}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Patients;
