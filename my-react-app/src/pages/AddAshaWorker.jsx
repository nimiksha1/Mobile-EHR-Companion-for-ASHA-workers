import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import './AddDoctor.css';

const AddAshaWorker = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/admin/create-asha', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('ASHA Worker created successfully!');
        navigate('/admin/manage-users');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create ASHA worker');
      }
    } catch (error) {
      console.error('Error creating ASHA worker:', error);
      alert('Failed to create ASHA worker');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <div className="page-header">
        <h1>Create ASHA Worker</h1>
      </div>
      
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-submit">Create ASHA Worker</button>
            <button type="button" onClick={() => navigate('/admin/manage-users')} className="btn-cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddAshaWorker;
