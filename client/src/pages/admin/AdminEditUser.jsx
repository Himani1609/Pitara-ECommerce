import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/pages/AdminEditUser.css';

const AdminEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users`)
      .then(res => {
        const user = res.data.find(u => u._id === id);
        if (user) {
          setForm({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load user:', err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, form);
      alert('User updated!');
      navigate('/admin/users');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update user');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-user-wrapper">
      <div className="edit-user-form">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
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
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditUser;
