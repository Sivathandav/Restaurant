import React from 'react';

const CategoryTabs = ({ categories, selectedCategory, onSelectCategory }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'All': (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 2h18v2H3V2zm0 18h18v2H3v-2zM3 7h18v10H3V7z"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      'Burger': (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 13c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2s.9-2 2-2h16c1.1 0 2 .9 2 2z"/>
          <path d="M22 9c0-3.3-2.7-6-6-6H8C4.7 3 2 5.7 2 9"/>
          <path d="M2 17h20v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-2z"/>
        </svg>
      ),
      'Pizza': (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
          <circle cx="8" cy="10" r="1.5"/>
          <circle cx="12" cy="14" r="1.5"/>
          <circle cx="16" cy="10" r="1.5"/>
          <path d="M12 2v20M2 12h20"/>
        </svg>
      ),
      'Pasta': (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 8h16M4 12h16M4 16h16"/>
          <path d="M6 8v8M10 8v8M14 8v8M18 8v8"/>
          <path d="M3 6h18v2H3zM3 16h18v2H3z"/>
        </svg>
      ),
      'Salads': (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22c5.5 0 10-3.5 10-8s-4.5-8-10-8S2 9.5 2 14s4.5 8 10 8z"/>
          <path d="M8 10c0-2 1.5-4 4-4s4 2 4 4"/>
          <path d="M6 14h12M7 17h10"/>
        </svg>
      ),
      'Sandwich': (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 11h18v2H3zM3 15h18v6H3z"/>
          <path d="M3 8c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v3H3V8z"/>
          <path d="M6 13v2M10 13v2M14 13v2M18 13v2"/>
        </svg>
      ),
      'Desserts': (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3v18M8 7l4-4 4 4"/>
          <path d="M6 12c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
          <ellipse cx="12" cy="17" rx="8" ry="4"/>
        </svg>
      ),
      'Beverages': (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 2h8v3H8zM7 5h10l1 14c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2L7 5z"/>
          <path d="M10 2v3M14 2v3"/>
          <path d="M9 10h6"/>
        </svg>
      ),
      'Appetizer': (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="3"/>
          <path d="M12 11c-4 0-7 2-7 5v5h14v-5c0-3-3-5-7-5z"/>
          <path d="M8 16h8M9 19h6"/>
        </svg>
      )
    };
    return icons[category] || icons['All'];
  };

  return (
    <div className="category-tabs-container">
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            <span className="category-icon">{getCategoryIcon(category)}</span>
            <span className="category-name">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;