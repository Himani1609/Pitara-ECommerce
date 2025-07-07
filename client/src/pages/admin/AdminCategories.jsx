import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/pages/AdminCategories.css';
import { useNavigate } from 'react-router-dom';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="admin-categories">
      <div className="top-bar">
        <button className="add-btn" onClick={() => navigate('/admin/categories/add')}>
          + Add Category
        </button>
      </div>

      <table className="category-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, idx) => (
            <tr key={cat._id}>
              <td>{idx + 1}</td>
              <td>
                <img
                  src={cat.image ? `/uploads/${cat.image}` : '/placeholder.jpg'}
                  alt={cat.name}
                  className="category-thumb"
                />
              </td>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <button onClick={() => navigate(`/admin/categories/edit/${cat._id}`)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(cat._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategories;
