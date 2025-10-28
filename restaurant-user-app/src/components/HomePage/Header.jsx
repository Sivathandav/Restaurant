import React from 'react';
import { Search, User, Edit3 } from 'lucide-react';

const Header = ({ searchTerm, onSearchChange, userDetails, onEditDetails }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="user-header">
      <div className="header-top">
        <div className="greeting-section">
          <h1 className="greeting">{getGreeting()}</h1>
          <p className="subtitle">Place your order here</p>
        </div>
        
        {userDetails && (
          <div className="user-info" onClick={onEditDetails}>
            <User size={20} />
            <div className="user-details">
              <span className="user-name">{userDetails.name}</span>
              <span className="user-phone">{userDetails.phone}</span>
            </div>
            <Edit3 size={16} />
          </div>
        )}
      </div>
      
      <div className="search-container">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Header;