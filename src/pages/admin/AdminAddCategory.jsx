import React, { useState } from 'react';
import API from '../services/api';
import '../../styles/pages/AdminAddCategory.css';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../admin/AdminLayout';


const AdminAddCategory = () => {
  const [form, setForm] = useState({ name: '', description: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    if (image) data.append('image', image);

    try {
      await API.post('categories', data);
      alert('Category added!');
      navigate('/admin/categories');
    } catch (err) {
      console.error('Add category failed:', err);
      alert('Failed to add category');
    }
  };

  return (
    <AdminLayout>
          <div className="add-category-wrapper">
    <div className="add-category-form">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Category Name" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className="preview-image" />}
        <button type="submit">Add Category</button>
      </form>
    </div>
    </div>
    </AdminLayout>

  );
};

export default AdminAddCategory;
