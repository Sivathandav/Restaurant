import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Header = ({ onSearch, title = "Analytics" }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1 className="page-title">{title}</h1>
      </div>
      
      <div className="header-center">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Filter..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="header-right">
        {/* Profile or other actions can go here */}
      </div>
    </header>
  );
};

export default Header;