import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/pages/AdminEditProduct.css';
import productImages from '../../productImages';
import AdminLayout from '../admin/AdminLayout';

const UPLOADS_BASE = import.meta.env.VITE_API_BASE + '/uploads/';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    images: []
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    API.get(`products/${id}`)
      .then(res => {
        const prod = res.data;
        setForm({
          name: prod.name,
          description: prod.description,
          price: prod.price,
          stock: prod.stock,
          images: prod.images
        });
        setPreviewImages(prod.images.map(img =>
          productImages[img] || `${UPLOADS_BASE}${img}`
        ));

      })
      .catch(err => console.error('Fetch error:', err));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleImageChange = (e) => {
  const files = Array.from(e.target.files);

  setNewImages(prev => [...prev, ...files]);

  const newPreviews = files.map(file => URL.createObjectURL(file));
  setPreviewImages(prev => [...prev, ...newPreviews]);
};



 const handleSubmit = async e => {
  e.preventDefault();
  const data = new FormData();

  data.append('name', form.name);
  data.append('description', form.description);
  data.append('price', form.price);
  data.append('stock', form.stock);

  newImages.forEach(file => {
    data.append('images', file); 
  });

  try {
    await API.put(`products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert('Product updated');
    navigate('/admin/products');
  } catch (err) {
    alert('Update failed');
    console.error(err);
  }
};



  return (
    <AdminLayout>
          <div className="edit-product-wrapper">
      <div className="edit-product-page">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit} className="edit-product-form">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
          <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
          <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" required />

          <label>Upload New Images (will replace existing ones)</label>
          <input type="file" name="images" multiple accept="image/*" onChange={handleImageChange} />

          <div className="preview-gallery">
            {previewImages.map((img, idx) => (
              <img key={idx} src={img} alt={`Preview ${idx + 1}`} className="preview-img" />
            ))}
          </div>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
    </AdminLayout>

  );
};

export default AdminEditProduct;
