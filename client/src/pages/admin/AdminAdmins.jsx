import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/pages/AdminAdmins.css';
import { useNavigate } from 'react-router-dom';

const AdminAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  const fetchAdmins = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admins');
      setAdmins(res.data);
    } catch (err) {
      console.error('Failed to load admins:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admins/${id}`);
      fetchAdmins();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="admin-admins">
      <div className="top-bar">
        <button className="add-btn" onClick={() => navigate('/admin/admins/add')}>
          + Add Admin
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, idx) => (
            <tr key={admin._id}>
              <td>{idx + 1}</td>
              <td>{admin.firstName}</td>
              <td>{admin.lastName}</td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
              <td>
                <button className="edit-btn" onClick={() => navigate(`/admin/admins/edit/${admin._id}`)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(admin._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAdmins;
