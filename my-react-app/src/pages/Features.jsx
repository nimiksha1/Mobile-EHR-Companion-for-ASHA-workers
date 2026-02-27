import Navigation from '../components/Navigation';
import './Features.css';

const Features = () => {
  const features = [
    {
      title: 'Offline-First Functionality',
      description: 'Work seamlessly without internet connectivity. All patient data is stored locally and automatically synced when connection is restored.',
      benefits: ['No internet required', 'Auto-sync capability', 'Local data storage', 'Uninterrupted workflow']
    },
    {
      title: 'AI/ML Risk Prediction',
      description: 'Advanced machine learning algorithms analyze patient vitals and medical history to predict health risks and provide actionable recommendations.',
      benefits: ['Real-time risk assessment', 'Personalized recommendations', 'Early warning alerts', 'Data-driven decisions']
    },
    {
      title: 'Secure Data Storage',
      description: 'Patient information is encrypted and stored securely with role-based access control ensuring privacy and compliance with healthcare standards.',
      benefits: ['End-to-end encryption', 'Role-based access', 'HIPAA compliant', 'Secure authentication']
    },
    {
      title: 'Auto Sync',
      description: 'Automatic synchronization of patient records, visit data, and prescriptions when internet connection is available.',
      benefits: ['Automatic updates', 'Conflict resolution', 'Real-time sync status', 'Data consistency']
    },
    {
      title: 'Local Language Support',
      description: 'Interface available in multiple regional languages to ensure ASHA workers can use the system in their preferred language.',
      benefits: ['Multi-language UI', 'Regional language support', 'Easy to understand', 'Culturally appropriate']
    },
    {
      title: 'Comprehensive Reporting',
      description: 'Generate detailed reports on patient health, risk assessments, and treatment outcomes for better healthcare management.',
      benefits: ['Visual analytics', 'Export capabilities', 'Trend analysis', 'Performance metrics']
    }
  ];

  return (
    <div className="features-page">
      <Navigation />
      
      <div className="features-content">
        <section className="features-hero">
          <div className="features-hero-container">
            <h1>Powerful Features for Better Healthcare</h1>
            <p>Comprehensive tools designed specifically for ASHA workers to deliver quality healthcare in rural and remote areas</p>
          </div>
        </section>

        <section className="features-grid-section">
          <div className="features-container">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3>{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-benefits">
                  <h4>Key Benefits:</h4>
                  <ul>
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="features-additional">
          <div className="additional-container">
            <h2>Additional Capabilities</h2>
            <div className="additional-grid">
              <div className="additional-item">
                <h4>Patient Management</h4>
                <p>Complete patient records with medical history</p>
              </div>
              <div className="additional-item">
                <h4>Prescription System</h4>
                <p>Digital prescription management and tracking</p>
              </div>
              <div className="additional-item">
                <h4>Health Monitoring</h4>
                <p>Track vital signs and health trends over time</p>
              </div>
              <div className="additional-item">
                <h4>Smart Alerts</h4>
                <p>Automated notifications for high-risk cases</p>
              </div>
              <div className="additional-item">
                <h4>Mobile Optimized</h4>
                <p>Responsive design for all devices</p>
              </div>
              <div className="additional-item">
                <h4>Fast Performance</h4>
                <p>Optimized for low-bandwidth areas</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="features-footer">
        <p>&copy; 2024 Mobile EHR Companion. Built for ASHA Workers.</p>
      </footer>
    </div>
  );
};

export default Features;
