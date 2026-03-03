import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout-wrapper">
      <header className="layout-navbar">
        <div className="navbar-brand">Mobile EHR</div>
        <div className="navbar-right">
          <span className="navbar-user">{user?.name}</span>
          <button className="navbar-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      
      <div className="layout-body">
        <Sidebar />
        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
