import { useData } from '../context/DataContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Reports.css';

const Reports = () => {
  const { patients, visits, predictions } = useData();

  const highRiskCount = predictions.filter(p => p.riskLevel === 'High').length;
  const moderateRiskCount = predictions.filter(p => p.riskLevel === 'Moderate').length;
  const lowRiskCount = predictions.filter(p => p.riskLevel === 'Low').length;

  const handleDownloadReport = () => {
    alert('PDF report download feature - Connect to backend API');
  };

  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <div className="page-header">
            <h1>Reports & Analytics</h1>
            <button onClick={handleDownloadReport} className="btn-primary">
              📄 Download PDF
            </button>
          </div>

          <div className="reports-grid">
            <div className="report-card">
              <h3>Risk Distribution</h3>
              <div className="chart-placeholder">
                <div className="risk-bar high" style={{ width: `${(highRiskCount / predictions.length) * 100 || 0}%` }}>
                  <span>High: {highRiskCount}</span>
                </div>
                <div className="risk-bar moderate" style={{ width: `${(moderateRiskCount / predictions.length) * 100 || 0}%` }}>
                  <span>Moderate: {moderateRiskCount}</span>
                </div>
                <div className="risk-bar low" style={{ width: `${(lowRiskCount / predictions.length) * 100 || 0}%` }}>
                  <span>Low: {lowRiskCount}</span>
                </div>
              </div>
            </div>

            <div className="report-card">
              <h3>Monthly Statistics</h3>
              <div className="stats-list">
                <div className="stat-row">
                  <span>Total Patients:</span>
                  <strong>{patients.length}</strong>
                </div>
                <div className="stat-row">
                  <span>Total Visits:</span>
                  <strong>{visits.length}</strong>
                </div>
                <div className="stat-row">
                  <span>Predictions Made:</span>
                  <strong>{predictions.length}</strong>
                </div>
                <div className="stat-row">
                  <span>High Risk Cases:</span>
                  <strong className="text-danger">{highRiskCount}</strong>
                </div>
              </div>
            </div>

            <div className="report-card full-width">
              <h3>Recent High Risk Cases</h3>
              {highRiskCount === 0 ? (
                <p className="empty-message">No high risk cases found</p>
              ) : (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Risk Score</th>
                        <th>Recommendation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {predictions
                        .filter(p => p.riskLevel === 'High')
                        .slice(0, 5)
                        .map((pred) => (
                          <tr key={pred.id}>
                            <td>{new Date(pred.timestamp).toLocaleDateString()}</td>
                            <td><span className="badge-high">{pred.riskScore}%</span></td>
                            <td>{pred.recommendation}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
