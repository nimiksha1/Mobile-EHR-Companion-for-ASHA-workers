import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="top-navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <span className="logo-text">Mobile EHR</span>
          </Link>
        </div>

        <button className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/features" 
              className={isActive('/features') ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Features
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={isActive('/about') ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className={`nav-btn ${isActive('/login') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </li>
          <li>
            <Link 
              to="/signup" 
              className={`nav-btn signup-btn ${isActive('/signup') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
