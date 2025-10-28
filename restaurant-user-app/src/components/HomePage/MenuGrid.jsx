import React, { useState, useEffect, useRef, useCallback } from 'react';
import MenuItemCard from './MenuItemCard';
import { getAllMenuItems } from '../../services/api';

const MenuGrid = ({ selectedCategory, searchTerm }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = useCallback(async (pageNum, isNewCategory = false) => {
    setLoading(true);
    try {
      const category = selectedCategory === 'All' ? '' : selectedCategory;
      const response = await getAllMenuItems(pageNum, 20, category, searchTerm);
      const newItems = response.data.data;
      
      if (pageNum === 1 || isNewCategory) {
        setItems(newItems);
      } else {
        setItems((prev) => [...prev, ...newItems]);
      }
      
      setHasMore(newItems.length === 20);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    fetchItems(1, true);
    
    // Scroll to top when category changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    if (page > 1 && !loading && hasMore) {
      console.log('Fetching page:', page);
      fetchItems(page);
    }
  }, [page, fetchItems, loading, hasMore]);

  // Filter in-stock items only
  const inStockItems = items.filter(item => item.inStock);

  // Infinite scroll with Intersection Observer
  const lastItemRef = useRef();
  const observerRef = useRef();
  
  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (loading || !hasMore || inStockItems.length === 0) return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          console.log('Loading more items, current page:', page);
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
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

  if (loading && items.length === 0) {
    return (
      <div className="menu-grid-user">
        <div className="loading-spinner">Loading delicious food...</div>
      </div>
    );
  }

  return (
    <div className="menu-grid-user">
      {inStockItems.map((item, index) => (
        <div
          key={item._id}
          ref={index === inStockItems.length - 1 ? lastItemRef : null}
        >
          <MenuItemCard item={item} />
        </div>
      ))}
      
      {loading && items.length > 0 && (
        <div className="loading-more">Loading more items...</div>
      )}
      
      {!loading && !hasMore && inStockItems.length > 0 && (
        <div className="end-message">That's all for {selectedCategory}!</div>
      )}
      
      {!loading && inStockItems.length === 0 && (
        <div className="no-items">No items available in {selectedCategory}</div>
      )}
    </div>
  );
};

export default MenuGrid;