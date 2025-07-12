import React, { useState } from 'react';
import '../../styles/pages/AdminDashboard.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminProducts from './AdminProducts';
import AdminCategories from './AdminCategories';
import AdminUsers from './AdminUsers';
import AdminAdmins from './AdminAdmins';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Admins');

  const renderContent = () => {
  switch (activeTab) {
    case 'Admins':
      return <AdminAdmins />;
    case 'Products':
      return <AdminProducts />;
    case 'Categories':
      return <AdminCategories />;
    case 'Users':
      return <AdminUsers />;
    default:
      return null;
  }
};


  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="logo" >Pitara</div>
        <nav className="admin-nav">
          {['Admins', 'Products', 'Categories', 'Users'].map((tab) => (
            <button
              key={tab}
              className={`nav-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
        <button className="admin-logout-btn" onClick={handleLogout}>Logout</button>

      </header>

      <main className="admin-content">
        <h2>{activeTab}</h2>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
