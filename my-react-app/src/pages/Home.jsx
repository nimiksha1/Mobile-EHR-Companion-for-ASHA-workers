import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Mobile EHR Companion</h1>
        <h2 className="home-subtitle">
          AI-Driven Clinical Decision Support for ASHA Workers
        </h2>
        <p className="home-description">
          Empowering community health workers with intelligent healthcare management tools
        </p>
        
        <div className="home-features">
          <div className="feature">
            <h3>Patient Management</h3>
            <p>Track and manage patient records efficiently</p>
          </div>
          <div className="feature">
            <h3>AI Predictions</h3>
            <p>ML-powered risk assessment and recommendations</p>
          </div>
          <div className="feature">
            <h3>Offline Support</h3>
            <p>Work seamlessly even without internet</p>
          </div>
        </div>

        <div className="home-actions">
          <Link to="/login" className="btn-home btn-primary">
            Login
          </Link>
          <Link to="/signup" className="btn-home btn-secondary">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
