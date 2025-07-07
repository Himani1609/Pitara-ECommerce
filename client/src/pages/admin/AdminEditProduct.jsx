import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/pages/AdminEditProduct.css';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    images: []
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setForm({
          name: res.data.name,
          description: res.data.description,
          price: res.data.price,
          stock: res.data.stock,
          images: res.data.images
        });
      }).catch(err => console.error('Fetch error:', err));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/products/${id}`, form)
      .then(() => {
        alert('Product updated');
        navigate('/admin/dashboard');
      }).catch(err => {
        alert('Update failed');
        console.error(err);
      });
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="edit-product-page">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="edit-product-form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
        <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" required />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
