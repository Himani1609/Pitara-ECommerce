import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages/AdminDashboard.css';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const isActive = (path) => currentPath.includes(path);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <Link to="/admin/dashboard" className="logo">Pitara</Link>
        <nav className="admin-nav">
          <Link to="/admin/admins" className={`nav-btn ${isActive('/admin/admins') ? 'active' : ''}`}>Admins</Link>
          <Link to="/admin/products" className={`nav-btn ${isActive('/admin/products') ? 'active' : ''}`}>Products</Link>
          <Link to="/admin/categories" className={`nav-btn ${isActive('/admin/categories') ? 'active' : ''}`}>Categories</Link>
          <Link to="/admin/users" className={`nav-btn ${isActive('/admin/users') ? 'active' : ''}`}>Users</Link>
        </nav>
        <button className="admin-logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <main className="admin-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
