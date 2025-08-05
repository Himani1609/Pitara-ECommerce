import React, { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../admin/AdminLayout';
import '../../styles/pages/AdminAddProduct.css';

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', description: '', price: '', stock: ''
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...files]);
    setPreviewImages(prev => [...prev, ...previews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    data.append('price', form.price);
    data.append('stock', form.stock);
    images.forEach(file => data.append('images', file)); 

    try {
      await API.post('products', data);
      alert('Product added!');
      navigate('/admin/products');
    } catch (err) {
      console.error('Product creation failed:', err);
      alert('Failed to add product');
    }
  };

  return (
    <AdminLayout>
      <div className="admin-add-product-wrapper">
        <div className="admin-add-product">
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
            <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
            <input name="stock" type="number" placeholder="Stock Quantity" value={form.stock} onChange={handleChange} required />
            <label>Product Images</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} />
            <div className="preview-gallery">
              {previewImages.map((img, idx) => (
                <img key={idx} src={img} alt={`Preview ${idx + 1}`} className="preview-img" />
              ))}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAddProduct;
