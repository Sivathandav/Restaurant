import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Dashboard/Header';
import MenuItemCard from '../components/Menu/MenuItemCard';
import { getAllMenuItems, toggleMenuItemStock } from '../services/api';
import '../styles/Menu.css';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const categories = ['all', 'Appetizer', 'Beverages', 'Burger', 'Desserts', 'Pasta', 'Pizza', 'Salads', 'Sandwich'];

  const fetchMenuItems = useCallback(async () => {
    try {
      // Fetch all items by setting a high limit
      const response = await getAllMenuItems(1, 1000, category === 'all' ? '' : category, '');
      setMenuItems(response.data.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const handleToggleStock = async (id) => {
    try {
      await toggleMenuItemStock(id);
      fetchMenuItems();
    } catch (error) {
      console.error('Error toggling stock:', error);
    }
  };

  const filteredMenuItems = menuItems.filter(item => 
    searchTerm === '' || 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="menu-page">
      {/* Search Bar - Outside frame, top left */}
      <div className="menu-filter-bar-container">
        <div className="menu-search-bar-top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Filter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <main className="menu-content">
        <div className="menu-frame">
          <div className="menu-frame-header">
            <h1 className="menu-title">Menu</h1>
          </div>
          
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={category === cat ? 'active' : ''}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {filteredMenuItems.length > 0 ? (
              filteredMenuItems.map((item) => (
                <MenuItemCard
                  key={item._id}
                  item={item}
                  onToggleStock={handleToggleStock}
                  isBlurred={searchTerm !== '' && 
                    !item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    !item.category.toLowerCase().includes(searchTerm.toLowerCase())
                  }
                />
              ))
            ) : (
              <div className="no-items">No menu items found</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MenuPage;