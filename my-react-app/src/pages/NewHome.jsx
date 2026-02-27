import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import './NewHome.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Navigation />
      
      <div className="home-content">
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-text">
              <h1>Empowering ASHA Workers with Smart Healthcare Solutions</h1>
              <p className="hero-description">
                A comprehensive mobile EHR system with AI-driven clinical decision support, 
                designed specifically for community health workers to deliver better healthcare outcomes.
              </p>
              <div className="hero-actions">
                <button onClick={() => navigate('/signup')} className="btn-primary-hero">
                  Get Started
                </button>
                <button onClick={() => navigate('/features')} className="btn-secondary-hero">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-illustration">
                <div className="floating-card card-1">
                  <p>AI Predictions</p>
                </div>
                <div className="floating-card card-2">
                  <p>Patient Care</p>
                </div>
                <div className="floating-card card-3">
                  <p>Mobile First</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="intro-section">
          <div className="intro-container">
            <h2>Transforming Community Healthcare</h2>
            <p>
              Mobile EHR Companion brings advanced healthcare technology to the frontlines, 
              enabling ASHA workers to make informed decisions with AI-powered insights, 
              manage patient records efficiently, and provide quality care even in remote areas.
            </p>
          </div>
        </section>

        <section className="highlights-section">
          <div className="highlights-container">
            <div className="highlight-card">
              <h3>AI-Powered Insights</h3>
              <p>Machine learning algorithms predict health risks and provide personalized recommendations</p>
            </div>
            <div className="highlight-card">
              <h3>Works Offline</h3>
              <p>Continue working without internet connectivity with automatic data synchronization</p>
            </div>
            <div className="highlight-card">
              <h3>Secure & Private</h3>
              <p>Patient data is encrypted and stored securely with role-based access control</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-container">
            <h2>Ready to Transform Healthcare Delivery?</h2>
            <p>Join thousands of ASHA workers using our platform to improve patient outcomes</p>
            <button onClick={() => navigate('/signup')} className="btn-cta">
              Start Your Journey
            </button>
          </div>
        </section>
      </div>

      <footer className="home-footer">
        <p>&copy; 2024 Mobile EHR Companion. Built for ASHA Workers.</p>
      </footer>
    </div>
  );
};

export default Home;
