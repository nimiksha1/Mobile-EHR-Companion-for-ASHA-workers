import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './DoctorLayout.css';

const DoctorLayout = () => {
  return (
    <div className="doctor-layout">
      <div className="doctor-navbar">
        <h2>EHR System - Doctor Portal</h2>
        <button onClick={() => {
          localStorage.clear();
          window.location.href = '/login';
        }}>Logout</button>
      </div>
      <div className="doctor-container">
        <Sidebar />
        <main className="doctor-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
