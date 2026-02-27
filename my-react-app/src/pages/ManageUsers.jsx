import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchDoctors();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response?.status === 403) {
        alert('Access denied. Admin only.');
        navigate('/dashboard');
      }
    }
  };

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/admin/doctors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleAssignDoctor = async (ashaWorkerId, doctorId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8080/api/admin/assign-doctor', 
        { ashaWorkerId, doctorId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Doctor assigned successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error assigning doctor:', error);
      alert('Failed to assign doctor');
    }
  };

  return (
    <div className="manage-users-container">
      <Sidebar />
      <div className="manage-users-content">
        <div className="header">
          <h1>Manage Users</h1>
          <div className="action-buttons">
            <button onClick={() => navigate('/admin/add-doctor')} className="btn-primary">
              + Create Doctor
            </button>
            <button onClick={() => navigate('/admin/add-asha')} className="btn-primary">
              + Create ASHA Worker
            </button>
          </div>
        </div>

        <div className="users-table-container">
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
                  <td><span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span></td>
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
      </div>
    </div>
  );
};

export default ManageUsers;
