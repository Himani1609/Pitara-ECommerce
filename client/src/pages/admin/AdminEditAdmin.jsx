import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/pages/AdminEditAdmin.css';


const AdminEditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Product Manager',
    password: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/admins/${id}`)
        .then(res => {
          const { firstName, lastName, email, role } = res.data;
          setForm({ firstName, lastName, email, role, password: '' });
        })
        .catch(err => console.error('Fetch failed:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/admins/${id}`, form);
        alert('Admin updated');
      } else {
        await axios.post('http://localhost:5000/api/admins', form);
        alert('Admin added');
      }
      navigate('/admin/admins');
    } catch (err) {
      console.error('Submit failed:', err);
      alert('Operation failed');
    }
  };

  return (
    <div className="edit-admin-wrapper">
      <div className="edit-admin-form">
        <h2>{id ? 'Edit Admin' : 'Add Admin'}</h2>
        <form onSubmit={handleSubmit}>
          <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required />
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          <select name="role" value={form.role} onChange={handleChange}>
            <option>Product Manager</option>
            <option>Site Manager</option>
          </select>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required={!id} />
          <button type="submit">{id ? 'Update' : 'Add'} Admin</button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditAdmin;
