import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Mobile EHR</h2>
      </div>
      <div className="navbar-right">
        <div className="user-profile">
          <span className="user-icon">👤</span>
          <span className="user-name">{user?.name}</span>
          <span className="user-role">({user?.role})</span>
        </div>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
