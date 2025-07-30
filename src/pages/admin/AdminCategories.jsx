import React, { useEffect, useState } from 'react';
import API from '../services/api';

import '../../styles/pages/AdminCategories.css';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../admin/AdminLayout';


import category1 from '../../assets/images/category/homedecor.jpg';
import category2 from '../../assets/images/category/stationery.jpg';
import category3 from '../../assets/images/category/artifacts.jpg';
import category4 from '../../assets/images/category/plushies.jpg';

const categoryImages = [
  { name: 'Home Décor', image: category1 },
  { name: 'Stationery', image: category2 },
  { name: 'Artifacts', image: category3 },
  { name: 'Plushies', image: category4 },
];

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await API.get('categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await API.delete(`categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const getCategoryImage = (cat) => {
    const localMatch = categoryImages.find((item) => item.name === cat.name)?.image;
    if (!localMatch && cat.image && !cat.image.startsWith('http')) {
      return `/uploads/${cat.image}`;
    }

    return localMatch || '/placeholder.jpg';
  };


  return (
    <AdminLayout>
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
              <td><img
                src={getCategoryImage(cat)}
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
    </AdminLayout>

  );
};

export default AdminCategories;
