import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PatientCard from '../components/PatientCard';
import './Patients.css';

const Patients = () => {
  const { patients } = useData();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="page-header">
        <h1>View Patients</h1>
        <button className="btn-add" onClick={() => navigate('/doctor/add-patient')}>
          + Add Patient
        </button>
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
    </Layout>
  );
};

export default Patients;
