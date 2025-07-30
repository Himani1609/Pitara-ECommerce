import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../admin/AdminLayout';
import '../../styles/pages/AdminAddProduct.css';

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', description: '', price: '', stock: '', images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const previews = [];
    const uploadedFileNames = [];
    setUploading(true);

    try {
      const UPLOADS_BASE = import.meta.env.VITE_API_BASE + '/uploads/';

      for (const file of files) {
        const data = new FormData();
        data.append('image', file);
        const res = await API.post('upload', data);
        const filename = res.data.filename;

        uploadedFileNames.push(filename);
        previews.push(`${UPLOADS_BASE}${filename}`);
      }


      setForm(prev => ({ ...prev, images: [...prev.images, ...uploadedFileNames] }));
      setPreviewImages(prev => [...prev, ...previews]);
    } catch (err) {
      console.error('Image upload error:', err);
    }

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('products', form);
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
            {uploading && <p>Uploading images...</p>}
            <div className="preview-gallery">
              {previewImages.map((img, idx) => (
                <img key={idx} src={img} alt={`Preview ${idx + 1}`} className="preview-img" />
              ))}
            </div>
            <button type="submit" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAddProduct;
