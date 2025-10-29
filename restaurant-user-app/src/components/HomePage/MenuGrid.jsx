import React, { useState, useEffect, useRef, useCallback } from 'react';
import MenuItemCard from './MenuItemCard';
import { getAllMenuItems } from '../../services/api';

const MenuGrid = ({ selectedCategory, searchTerm }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  const fetchItems = useCallback(async (pageNum, isNewCategory = false) => {
    setLoading(true);
    try {
      const category = selectedCategory === 'All' ? '' : selectedCategory;
      const response = await getAllMenuItems(pageNum, 20, category, searchTerm);
      const newItems = response.data.data;
      const total = response.data.total || 0;
      
      setTotalItems(total);
      
      if (pageNum === 1 || isNewCategory) {
        setItems(newItems);
      } else {
        setItems((prev) => [...prev, ...newItems]);
      }
      
      // Check if we have more items to load
      setHasMore(newItems.length === 20 && items.length + newItems.length < total);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm, items.length]);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setTotalItems(0);
    fetchItems(1, true);
    
    // Scroll to top when category changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    if (page > 1 && !loading && hasMore) {
      fetchItems(page);
    }
  }, [page, fetchItems, loading, hasMore]);

  // Filter in-stock items only
  const inStockItems = items.filter(item => item.inStock);

  // Native infinite scroll implementation
  const lastItemRef = useRef();
  const observerRef = useRef();
  
  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (loading || !hasMore || inStockItems.length === 0) return;
    
    // Create intersection observer for infinite scroll
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const lastItem = entries[0];
        if (lastItem.isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // Load more items when user is 100px from bottom
      }
    );

    const currentRef = lastItemRef.current;
    if (currentRef && observerRef.current) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, hasMore, inStockItems.length, page]);

  // Alternative scroll event listener (fallback)
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;
      
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Load more when user scrolls to 80% of the page
      if (scrollTop + clientHeight >= scrollHeight * 0.8) {
        setPage((prev) => prev + 1);
      }
    };

    // Use scroll event as fallback if intersection observer fails
    if (!observerRef.current) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [loading, hasMore]);

  if (loading && items.length === 0) {
    return (
      <div className="menu-grid-user">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading delicious food...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-grid-user">
      {/* Items counter */}
      {totalItems > 0 && (
        <div className="items-counter">
          Showing {inStockItems.length} of {totalItems} items
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </div>
      )}
      
      {/* Menu items grid */}
      {inStockItems.map((item, index) => (
        <div
          key={item._id}
          ref={index === inStockItems.length - 1 ? lastItemRef : null}
          className="menu-item-wrapper"
        >
          <MenuItemCard item={item} />
        </div>
      ))}
      
      {/* Loading indicator */}
      {loading && items.length > 0 && (
        <div className="loading-more">
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>Loading more delicious items...</p>
        </div>
      )}
      
      {/* End message */}
      {!loading && !hasMore && inStockItems.length > 0 && (
        <div className="end-message">
          🎉 You've seen all {inStockItems.length} items in {selectedCategory}!
        </div>
      )}
      
      {/* No items message */}
      {!loading && inStockItems.length === 0 && (
        <div className="no-items">
          <div className="no-items-icon">🍽️</div>
          <h3>No items available</h3>
          <p>Try selecting a different category or check back later!</p>
        </div>
      )}
    </div>
  );
};

export default MenuGrid;