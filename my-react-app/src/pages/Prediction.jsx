import { useData } from '../context/DataContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Prediction.css';

const Prediction = () => {
  const { predictions } = useData();

  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <div className="page-header">
            <h1>Risk Predictions</h1>
          </div>

          {predictions.length === 0 ? (
            <div className="empty-state">
              <p>No predictions available yet. Add a visit to generate predictions.</p>
            </div>
          ) : (
            <div className="predictions-grid">
              {predictions.map((pred) => (
                <div key={pred.id} className={`prediction-item ${pred.riskLevel.toLowerCase()}`}>
                  <div className="prediction-badge">
                    <span className="badge-score">{pred.riskScore}%</span>
                    <span className={`badge-level ${pred.riskLevel.toLowerCase()}`}>
                      {pred.riskLevel}
                    </span>
                  </div>
                  <div className="prediction-details">
                    <p className="prediction-time">
                      {new Date(pred.timestamp).toLocaleString()}
                    </p>
                    <p className="prediction-recommendation">{pred.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prediction;
