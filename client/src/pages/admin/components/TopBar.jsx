import React from 'react';
import '../../../styles/pages/AdminDashboard.css';

const TopBar = ({ activeTab, setActiveTab }) => {
  const tabs = ['admins', 'products', 'categories', 'users'];

  return (
    <div className="admin-sidebar">
      <h1>PITARA</h1>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopBar;
