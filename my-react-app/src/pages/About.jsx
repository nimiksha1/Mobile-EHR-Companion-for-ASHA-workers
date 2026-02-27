import Navigation from '../components/Navigation';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <Navigation />
      
      <div className="about-content">
        <section className="about-hero">
          <div className="about-hero-container">
            <h1>About Mobile EHR Companion</h1>
            <p>Empowering community health workers with intelligent healthcare technology</p>
          </div>
        </section>

        <section className="about-project">
          <div className="about-container">
            <div className="about-section">
              <h2>About the Project</h2>
              <p>
                Mobile EHR Companion is a comprehensive Electronic Health Record system specifically 
                designed for ASHA (Accredited Social Health Activist) workers in India. This innovative 
                platform combines mobile technology with artificial intelligence to provide clinical 
                decision support at the grassroots level of healthcare delivery.
              </p>
              <p>
                The system enables ASHA workers to maintain digital patient records, record vital signs, 
                receive AI-powered risk assessments, and make informed healthcare decisions even in 
                remote areas with limited internet connectivity.
              </p>
            </div>

            <div className="about-section">
              <h2>Problem Statement</h2>
              <div className="problem-grid">
                <div className="problem-item">
                  <h4>Manual Record Keeping</h4>
                  <p>ASHA workers rely on paper-based records which are difficult to maintain, prone to loss, and hard to analyze.</p>
                </div>
                <div className="problem-item">
                  <h4>Limited Connectivity</h4>
                  <p>Rural areas often lack reliable internet access, making it difficult to use cloud-based healthcare systems.</p>
                </div>
                <div className="problem-item">
                  <h4>Clinical Decision Support</h4>
                  <p>ASHA workers need guidance in identifying high-risk cases and making appropriate referrals.</p>
                </div>
                <div className="problem-item">
                  <h4>Data Analysis</h4>
                  <p>Lack of tools to analyze patient data and track health trends in the community.</p>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h2>Project Objectives</h2>
              <div className="objectives-list">
                <div className="objective-item">
                  <span className="objective-number">01</span>
                  <div className="objective-content">
                    <h4>Digitize Patient Records</h4>
                    <p>Enable ASHA workers to maintain comprehensive digital patient records with medical history, vital signs, and treatment information.</p>
                  </div>
                </div>
                <div className="objective-item">
                  <span className="objective-number">02</span>
                  <div className="objective-content">
                    <h4>AI-Powered Risk Assessment</h4>
                    <p>Implement machine learning algorithms to predict health risks based on patient vitals and provide actionable recommendations.</p>
                  </div>
                </div>
                <div className="objective-item">
                  <span className="objective-number">03</span>
                  <div className="objective-content">
                    <h4>Offline-First Architecture</h4>
                    <p>Design a system that works seamlessly without internet connectivity and automatically syncs data when connection is available.</p>
                  </div>
                </div>
                <div className="objective-item">
                  <span className="objective-number">04</span>
                  <div className="objective-content">
                    <h4>Improve Healthcare Outcomes</h4>
                    <p>Enable early detection of health risks, timely interventions, and better coordination between ASHA workers and healthcare facilities.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h2>Target Users</h2>
              <div className="users-grid">
                <div className="user-card">
                  <h3>ASHA Workers</h3>
                  <p>Primary users who manage patient records, conduct health visits, and receive AI-powered clinical decision support.</p>
                  <ul>
                    <li>Patient registration and management</li>
                    <li>Visit recording and vital signs tracking</li>
                    <li>Risk prediction and recommendations</li>
                    <li>Prescription management</li>
                    <li>Offline data entry and sync</li>
                  </ul>
                </div>
                <div className="user-card">
                  <h3>Doctors</h3>
                  <p>Healthcare professionals who review patient data, analyze risk assessments, and provide medical guidance.</p>
                  <ul>
                    <li>View patient records and history</li>
                    <li>Review AI risk predictions</li>
                    <li>Access detailed health reports</li>
                    <li>Add prescriptions and treatment plans</li>
                    <li>Monitor high-risk cases</li>
                  </ul>
                </div>
                <div className="user-card">
                  <h3>Administrators</h3>
                  <p>System administrators who manage users, monitor system performance, and analyze healthcare data.</p>
                  <ul>
                    <li>User management and access control</li>
                    <li>System analytics and reporting</li>
                    <li>Data export and backup</li>
                    <li>Performance monitoring</li>
                    <li>Configuration management</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="about-section impact-section">
              <h2>Expected Impact</h2>
              <div className="impact-grid">
                <div className="impact-item">
                  <h3>50%</h3>
                  <p>Reduction in manual paperwork</p>
                </div>
                <div className="impact-item">
                  <h3>70%</h3>
                  <p>Faster risk identification</p>
                </div>
                <div className="impact-item">
                  <h3>100%</h3>
                  <p>Data accessibility</p>
                </div>
                <div className="impact-item">
                  <h3>24/7</h3>
                  <p>Offline availability</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="about-footer">
        <p>&copy; 2024 Mobile EHR Companion. Built for ASHA Workers.</p>
      </footer>
    </div>
  );
};

export default About;
