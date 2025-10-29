import React from 'react';

const CategoryTabs = ({ categories, selectedCategory, onSelectCategory }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'All': '🍽️',
      'Burger': '🍔',
      'Pizza': '🍕',
      'Beverages': '🥤',
      'French fries': '🍟',
      'Veggies': '🥗',
      'Pasta': '🍝',
      'Desserts': '🍰',
      'Seafood': '🦐',
      'Salads': '🥙',
      'Soups': '🍲',
      'Sandwich': '🥪',
      'Appetizer': '🍤'
    };
    return icons[category] || '🍽️';
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