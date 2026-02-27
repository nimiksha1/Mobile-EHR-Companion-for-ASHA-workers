import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { patients, visits, predictions, unsyncedData } = useData();

  const renderASHADashboard = () => (
    <div className="dashboard-grid">
      <div className="stat-card">
        <div className="stat-info">
          <h3>{patients.length}</h3>
          <p>Total Patients</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-info">
          <h3>{visits.length}</h3>
          <p>Total Visits</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-info">
          <h3>{predictions.length}</h3>
          <p>Predictions Made</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-info">
          <h3>{unsyncedData}</h3>
          <p>Unsynced Records</p>
        </div>
      </div>
    </div>
  );

  const renderDoctorDashboard = () => (
    <div className="dashboard-grid">
      <div className="stat-card">
        <div className="stat-info">
          <h3>{patients.length}</h3>
          <p>Total Patients</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-info">
          <h3>{predictions.filter(p => p.riskLevel === 'High').length}</h3>
          <p>High Risk Cases</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-info">
          <h3>{visits.length}</h3>
          <p>Total Visits</p>
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="dashboard-grid">
      <div className="stat-card">
        <div className="stat-info">
          <h3>24</h3>
          <p>Total Users</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-info">
          <h3>{patients.length}</h3>
          <p>Total Patients</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-info">
          <h3>85%</h3>
          <p>System Health</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <div className="page-header">
            <h1>Welcome, {user?.name}!</h1>
            <p>Role: {user?.role}</p>
          </div>
          
          {user?.role === 'ASHA' && renderASHADashboard()}
          {user?.role === 'Doctor' && renderDoctorDashboard()}
          {user?.role === 'Admin' && renderAdminDashboard()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
