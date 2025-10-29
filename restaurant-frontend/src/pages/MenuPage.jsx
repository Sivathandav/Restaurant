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
  const [page, setPage] = useState(1);

  const categories = ['all', 'Burger', 'Pizza', 'Pasta', 'Salads', 'Sandwich', 'Desserts'];

  const fetchMenuItems = useCallback(async () => {
    try {
      const response = await getAllMenuItems(page, 20, category === 'all' ? '' : category, '');
      setMenuItems(response.data.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  }, [category, page]);

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
      <Header onSearch={setSearchTerm} title="Menu" />
      
      <main className="menu-content">
        <div className="page-header">
          <h1>Menu Management</h1>
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
      </main>
    </div>
  );
};

export default MenuPage;