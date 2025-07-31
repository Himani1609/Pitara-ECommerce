import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import '../../styles/pages/AdminEditCategory.css';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../admin/AdminLayout';

const AdminEditCategory = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', description: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();
  const UPLOADS_BASE = import.meta.env.VITE_API_BASE + '/uploads/';

  useEffect(() => {
    API.get(`categories/${id}`)
      .then(res => {
        const category = res.data;
        setForm({ name: category.name, description: category.description });

        if (category.image) {
          console.log("Fetched category image:", category.image);
          setPreview(`${UPLOADS_BASE}${category.image}`);
        } else {
          console.warn("No image found for this category.");
          setPreview('/placeholder.jpg'); 
        }
      })
      .catch(err => {
        console.error('Failed to fetch category:', err);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    if (image) data.append('image', image);

    try {
      await API.put(`categories/${id}`, data);
      alert('Category updated!');
      navigate('/admin/categories');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update category');
    }
  };

  return (
    <AdminLayout>
      <div className="edit-category-wrapper">
        <div className="edit-category-form">
          <h2>Edit Category</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="preview-image"
                onError={(e) => { e.target.src = '/placeholder.jpg'; }}
              />
            )}
            <button type="submit">Update Category</button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEditCategory;
