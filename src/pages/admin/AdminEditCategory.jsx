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
  API.get(`categories/${id}`).then(res => {
    setForm({ name: res.data.name, description: res.data.description });
    if (res.data.image) {
      console.log("Fetched category data:", res.data);
      setPreview(`${UPLOADS_BASE}${res.data.image}`);
    }
  });
}, [id]);



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
      await API.put(`categories/${id}`, data);
      navigate('/admin/categories');
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <AdminLayout>
          <div className='edit-category-wrapper'>
    <div className="edit-category-form">
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />
        <textarea name="description" value={form.description} onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className="preview-image" />}
        <button type="submit">Update Category</button>
      </form>
    </div>
    </div>
    </AdminLayout>

  );
};

export default AdminEditCategory;
