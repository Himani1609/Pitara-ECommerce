import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../admin/AdminLayout';
import '../../styles/pages/AdminAddProduct.css';

const AdminAddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    isFeatured: false
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      const uploadBase = import.meta.env.VITE_API_BASE + '/uploads/';
      const uploadedImages = [];
      const previews = [];

      for (const file of files) {
        const data = new FormData();
        data.append('image', file);
        const res = await API.post('upload', data);
        const filename = res.data.filename;

        uploadedImages.push(filename);
        previews.push(`${uploadBase}${filename}`);
      }

      setImages((prev) => [...prev, ...uploadedImages]);
      setPreviewImages((prev) => [...prev, ...previews]);
    } catch (err) {
      console.error('Image upload error:', err);
      alert('Upload failed. Please check the console.');
    }

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    data.append('price', form.price);
    data.append('stock', form.stock);
    data.append('categoryId', form.categoryId);
    data.append('isFeatured', form.isFeatured);

    images.forEach((img) => data.append('images', img));

    try {
      await API.post('products', data);
      alert('Product added successfully!');
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
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
            />
            <input
              name="stock"
              type="number"
              placeholder="Stock Quantity"
              value={form.stock}
              onChange={handleChange}
              required
            />
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label>
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
              />
              Featured Product
            </label>

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
