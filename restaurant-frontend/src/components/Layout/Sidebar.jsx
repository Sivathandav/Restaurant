import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Table, ClipboardList, Utensils } from 'lucide-react';
import '../../styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      id: 'dashboard', 
      icon: <LayoutDashboard size={24} />, 
      path: '/',
      label: 'Dashboard'
    },
    { 
      id: 'tables', 
      icon: <Table size={24} />, 
      path: '/tables',
      label: 'Tables'
    },
    { 
      id: 'orders', 
      icon: <ClipboardList size={24} />, 
      path: '/orders',
      label: 'Orders'
    },
    { 
      id: 'menu', 
      icon: <Utensils size={24} />, 
      path: '/menu',
      label: 'Menu'
    },
  ];

  const handleNavigation = (path) => {
    
    // Try direct window navigation as fallback
    if (path !== location.pathname) {
      navigate(path);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">R</div>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleNavigation(item.path);
            }}
            onMouseDown={(e) => e.preventDefault()}
            title={item.label}
            type="button"
          >
            {item.icon}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;