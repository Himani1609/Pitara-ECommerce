import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminProducts from './AdminProducts';
import AdminCategories from './AdminCategories';
import AdminUsers from './AdminUsers';
import AdminAdmins from './AdminAdmins';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Admins');

  const renderContent = () => {
    switch (activeTab) {
      case 'Admins': return <AdminAdmins />;
      case 'Products': return <AdminProducts />;
      case 'Categories': return <AdminCategories />;
      case 'Users': return <AdminUsers />;
      default: return null;
    }
  };

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      <h2>{activeTab}</h2>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminDashboard;
