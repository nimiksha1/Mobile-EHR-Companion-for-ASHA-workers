import './RiskBadge.css';

const RiskBadge = ({ level }) => {
  if (!level) return null;
  
  return (
    <span className={`risk-badge ${level.toLowerCase()}`}>
      {level}
    </span>
  );
};

export default RiskBadge;
