import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const ashaLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/assigned-patients', label: 'Assigned Patients' },
    { path: '/add-visit', label: 'Add Visit' },
    { path: '/prediction', label: 'Predictions' },
    { path: '/sync', label: 'Sync Data' }
  ];

  const doctorLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/patients', label: 'View Patients' },
    { path: '/doctor/add-patient', label: 'Add Patient' },
    { path: '/doctor/edit-patient', label: 'Edit Patient' },
    { path: '/reports', label: 'Health Records' },
    { path: '/prediction', label: 'ML Predictions' }
  ];

  const adminLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/patients', label: 'Manage Users' },
    { path: '/reports', label: 'Analytics' }
  ];

  const links = user?.role === 'ASHA' ? ashaLinks : 
                user?.role === 'Doctor' ? doctorLinks : adminLinks;

  return (
    <aside className="sidebar">
      <div className="sidebar-links">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            <span className="link-label">{link.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
