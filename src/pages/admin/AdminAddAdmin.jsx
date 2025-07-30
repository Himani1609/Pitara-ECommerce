import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../admin/AdminLayout';
import '../../styles/pages/AdminAddAdmin.css';
import API from '../../services/api';

const AdminAddAdmin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Product Manager'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('admins', form);
      alert('Admin added successfully!');
      navigate('/admin/admins');
    } catch (err) {
      console.error('Add admin failed:', err);
      alert('Failed to add admin.');
    }
  };

  return (
    <AdminLayout>
    <div className="add-admin-wrapper">
      <div className="add-admin-form">
        <h2>Add New Admin</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="Product Manager">Product Manager</option>
            <option value="Site Manager">Site Manager</option>
          </select>

          <button type="submit">Add Admin</button>
        </form>
      </div>
    </div>
    </AdminLayout>
  );
};

export default AdminAddAdmin;
