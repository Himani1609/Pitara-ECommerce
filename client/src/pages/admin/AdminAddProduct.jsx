import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/pages/AdminAddProduct.css';
import productImages from '../../productImages';

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files).map(file => file.name);
    setForm({ ...form, images: selected });
    setPreviewImages(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', form);
      alert('Product added!');
    } catch (err) {
      console.error('Add product failed:', err);
      alert('Failed to add product');
    }
  };

  return (
    <div className="admin-add-product">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="stock" type="number" placeholder="Stock Quantity" value={form.stock} onChange={handleChange} required />

        <label>Product Images (select one or more from project images folder)</label>
        <input type="file" multiple onChange={handleImageChange} accept="image/jpeg, image/jpg, image/png" />

        <div className="preview-gallery">
          {previewImages.map((img, idx) => (
            <img
              key={idx}
              src={productImages[img] || '/placeholder.jpg'}
              alt={`Preview ${idx + 1}`}
              className="preview-img"
            />
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
