import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const ashaLinks = [
    { path: '/asha/dashboard', label: 'Dashboard' },
    { path: '/assigned-patients', label: 'Assigned Patients' },
    { path: '/add-visit', label: 'Add Visit' },
    { path: '/prediction', label: 'Predictions' },
    { path: '/sync', label: 'Sync Data' }
  ];

  const doctorLinks = [
    { path: '/doctor/dashboard', label: 'Dashboard' },
    { path: '/doctor/add-patient', label: 'Add Patient' },
    { path: '/patients', label: 'View Patients' },
    { path: '/reports', label: 'Reports' },
    { path: '/prediction', label: 'ML Predictions' }
  ];

  const adminLinks = [
    { path: '/admin/manage-users', label: 'Manage Users' },
    { path: '/admin/add-doctor', label: 'Add Doctor' },
    { path: '/admin/add-asha', label: 'Add ASHA Worker' },
    { path: '/reports', label: 'Analytics' }
  ];

  const links = user?.role === 'ASHA' ? ashaLinks : 
                user?.role === 'DOCTOR' ? doctorLinks : 
                user?.role === 'ADMIN' ? adminLinks : [];

  return (
    <aside className="layout-sidebar">
      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
