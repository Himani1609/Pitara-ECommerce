import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/pages/AdminEditCategory.css';
import AdminLayout from '../admin/AdminLayout';

const UPLOADS_BASE = import.meta.env.VITE_API_BASE + '/uploads/';

const AdminEditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', description: '' });
  const [previewImage, setPreviewImage] = useState('');
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    API.get(`categories/${id}`)
      .then(res => {
        const category = res.data;
        setForm({ name: category.name, description: category.description });

        if (category.image) {
          setPreviewImage(`${UPLOADS_BASE}${category.image}`);
        } else {
          setPreviewImage('/placeholder.jpg');
        }
      })
      .catch(err => {
        console.error('Fetch category failed:', err);
      });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    if (newImage) data.append('image', newImage);

    try {
      await API.put(`categories/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
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
              placeholder="Category Name"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Category Description"
              required
            />
            <label>Upload New Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            <div className="preview-gallery">
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="preview-img"
                  onError={(e) => (e.target.src = '/placeholder.jpg')}
                />
              )}
            </div>

            <button type="submit">Update Category</button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEditCategory;
