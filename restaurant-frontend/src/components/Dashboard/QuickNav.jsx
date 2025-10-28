import React from 'react';
import { Gauge, Table as TableIcon, ClipboardList, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickNav = () => {
  const navigate = useNavigate();

  const items = [
    { label: 'Dashboard', icon: <Gauge size={22} />, to: '/' },
    { label: 'Tables', icon: <TableIcon size={22} />, to: '/tables' },
    { label: 'Orders', icon: <ClipboardList size={22} />, to: '/orders' },
    { label: 'Menu', icon: <Utensils size={22} />, to: '/menu' },
  ];

  return (
    <div className="quick-nav">
      {items.map((it) => (
        <button key={it.label} className="quick-nav-card" onClick={() => navigate(it.to)}>
          <span className="quick-nav-icon">{it.icon}</span>
          <span className="quick-nav-label">{it.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickNav;


