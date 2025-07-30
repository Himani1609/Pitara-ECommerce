import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/pages/AdminProducts.css';
import productImages from '../../productImages';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../admin/AdminLayout';


const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <AdminLayout>
    <div className="admin-products">
      <div className="top-bar">
        <button
          className="add-btn"
          onClick={() => navigate('/admin/products/add')}
        >
          + Add Product
        </button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock Qty.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, idx) => (
            <tr key={prod._id}>
              <td>{idx + 1}</td>
              <td>
                <div className="carousel-container">
                  <Carousel showThumbs={false} showStatus={false} infiniteLoop showIndicators={prod.images.length > 1} >
                    {(prod.images || []).map((imgName, idx) => {
                      const isPredefined = productImages[imgName];
                      const imageSrc = isPredefined
                        ? productImages[imgName]
                        : `http://localhost:5000/uploads/${imgName}`;

                      return (
                        <div key={idx}>
                          <img
                            src={imageSrc}
                            alt={`${prod.name} ${idx + 1}`}
                            className="product-image"
                            onError={(e) => { e.target.src = '/placeholder.jpg'; }}
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              </td>
              <td>{prod.name}</td>
              <td>{prod.description}</td>
              <td>${prod.price.toFixed(2)}</td>
              <td>{prod.stock}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/admin/products/edit/${prod._id}`)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(prod._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AdminLayout>

  );
};

export default AdminProducts;
