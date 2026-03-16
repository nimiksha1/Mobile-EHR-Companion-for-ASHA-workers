import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import './PatientHistory.css';

const PatientHistory = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientName, setPatientName] = useState('');

  useEffect(() => {
    fetchPatientHistory();
  }, [patientId]);

  const fetchPatientHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching history for patient:', patientId);
      console.log('Token:', token ? 'Present' : 'Missing');
      
      const response = await fetch(`http://localhost:8080/api/patients/${patientId}/history`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        console.error('Failed to fetch history:', response.status, response.statusText);
        return;
      }
      
      const data = await response.json();
      console.log('Visit history received:', data);
      console.log('Number of visits:', data.length);
      setVisits(data);
    } catch (error) {
      console.error('Error fetching patient history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="history-header">
        <h1>Patient Visit History</h1>
        <button className="btn-back" onClick={() => navigate('/doctor/dashboard')}>
          Back to Dashboard
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading visit history...</div>
      ) : visits.length === 0 ? (
        <div className="no-visits">
          <p>No visit records found for this patient.</p>
        </div>
      ) : (
        <div className="visits-container">
          {visits.map((visit) => (
            <div key={visit.id} className="visit-card">
              <div className="visit-card-header">
                <h3>Visit Date: {formatDate(visit.visitDate)}</h3>
                {visit.doctorName && <span className="doctor-name">Dr. {visit.doctorName}</span>}
              </div>

              <div className="visit-card-body">
                <div className="visit-section">
                  <h4>Vital Signs</h4>
                  <div className="visit-grid">
                    {visit.bloodPressure && (
                      <div className="visit-item">
                        <label>Blood Pressure:</label>
                        <span>{visit.bloodPressure}</span>
                      </div>
                    )}
                    {visit.sugarLevel && (
                      <div className="visit-item">
                        <label>Sugar Level:</label>
                        <span>{visit.sugarLevel} mg/dL</span>
                      </div>
                    )}
                    {visit.weight && (
                      <div className="visit-item">
                        <label>Weight:</label>
                        <span>{visit.weight} kg</span>
                      </div>
                    )}
                    {visit.temperature && (
                      <div className="visit-item">
                        <label>Temperature:</label>
                        <span>{visit.temperature} °F</span>
                      </div>
                    )}
                    {visit.pulseRate && (
                      <div className="visit-item">
                        <label>Pulse Rate:</label>
                        <span>{visit.pulseRate} bpm</span>
                      </div>
                    )}
                    {visit.cholesterol && (
                      <div className="visit-item">
                        <label>Cholesterol:</label>
                        <span>{visit.cholesterol} mg/dL</span>
                      </div>
                    )}
                    {visit.heartRate && (
                      <div className="visit-item">
                        <label>Heart Rate:</label>
                        <span>{visit.heartRate} bpm</span>
                      </div>
                    )}
                    {visit.oxygenLevel && (
                      <div className="visit-item">
                        <label>Oxygen Level:</label>
                        <span>{visit.oxygenLevel} %</span>
                      </div>
                    )}
                    {visit.numberOfWeeks && (
                      <div className="visit-item">
                        <label>Pregnancy Weeks:</label>
                        <span>{visit.numberOfWeeks} weeks</span>
                      </div>
                    )}
                    {visit.hemoglobin && (
                      <div className="visit-item">
                        <label>Hemoglobin:</label>
                        <span>{visit.hemoglobin} g/dL</span>
                      </div>
                    )}
                    {visit.address && (
                      <div className="visit-item">
                        <label>Address:</label>
                        <span>{visit.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {visit.symptoms && (
                  <div className="visit-section">
                    <h4>Symptoms</h4>
                    <p>{visit.symptoms}</p>
                  </div>
                )}

                {visit.diagnosis && (
                  <div className="visit-section">
                    <h4>Diagnosis</h4>
                    <p>{visit.diagnosis}</p>
                  </div>
                )}

                {visit.prescription && (
                  <div className="visit-section">
                    <h4>Prescription</h4>
                    <p>{visit.prescription}</p>
                  </div>
                )}

                {visit.labReports && (
                  <div className="visit-section">
                    <h4>Lab Reports</h4>
                    <p>{visit.labReports}</p>
                  </div>
                )}

                {visit.followUpDate && (
                  <div className="visit-section">
                    <h4>Follow-up Date</h4>
                    <p>{formatDate(visit.followUpDate)}</p>
                  </div>
                )}

                {visit.notes && (
                  <div className="visit-section">
                    <h4>Notes</h4>
                    <p>{visit.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default PatientHistory;
