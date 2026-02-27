import RiskBadge from './RiskBadge';
import './PatientCard.css';

const PatientCard = ({ patient, onClick }) => {
  return (
    <div className="patient-card" onClick={onClick}>
      <div className="patient-header">
        <h3>{patient.name}</h3>
        <RiskBadge level={patient.riskLevel} />
      </div>
      <div className="patient-details">
        <div className="detail-row">
          <span className="label">ID:</span>
          <span className="value">{patient.patientId}</span>
        </div>
        <div className="detail-row">
          <span className="label">Age:</span>
          <span className="value">{patient.age} years</span>
        </div>
        <div className="detail-row">
          <span className="label">Type:</span>
          <span className="value">{patient.type}</span>
        </div>
        <div className="detail-row">
          <span className="label">ASHA:</span>
          <span className="value">{patient.assignedAsha}</span>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
