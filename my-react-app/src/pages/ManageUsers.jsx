import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem('token');

      const usersResponse = await fetch('http://localhost:8080/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const doctorsResponse = await fetch('http://localhost:8080/api/admin/doctors', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (usersResponse.ok) setUsers(await usersResponse.json());
      if (doctorsResponse.ok) setDoctors(await doctorsResponse.json());
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleAssignDoctor = async (ashaWorkerId, doctorId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8080/api/admin/assign-doctor', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ashaWorkerId, doctorId })
      });
      alert('Doctor assigned successfully!');
      loadData();
    } catch (error) {
      console.error('Error assigning doctor:', error);
      alert('Failed to assign doctor');
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <h1>Manage Users</h1>
        <div className="header-actions">
          <button onClick={() => navigate('/admin/add-doctor')} className="btn-primary">
            + Create Doctor
          </button>
          <button onClick={() => navigate('/admin/add-asha')} className="btn-primary">
            + Create ASHA Worker
          </button>
        </div>
      </div>

      <div className="table-card">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Assigned Doctor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  {user.role === 'ASHA' ? (
                    user.assignedDoctorName ? (
                      <span>{user.assignedDoctorName}</span>
                    ) : (
                      <select
                        onChange={(e) => handleAssignDoctor(user.id, e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>Assign Doctor</option>
                        {doctors.map(doc => (
                          <option key={doc.id} value={doc.id}>{doc.name}</option>
                        ))}
                      </select>
                    )
                  ) : '-'}
                </td>
                <td>
                  {user.role === 'ASHA' && user.assignedDoctorName && (
                    <button
                      className="btn-change"
                      onClick={() => {
                        const newDoctorId = prompt('Enter new doctor ID:');
                        if (newDoctorId) handleAssignDoctor(user.id, newDoctorId);
                      }}
                    >
                      Change
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ManageUsers;
