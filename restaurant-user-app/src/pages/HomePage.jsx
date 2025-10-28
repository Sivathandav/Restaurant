import React, { useState, useEffect } from 'react';
import Header from '../components/HomePage/Header';
import CategoryTabs from '../components/HomePage/CategoryTabs';
import MenuGrid from '../components/HomePage/MenuGrid';
import CartPreview from '../components/HomePage/CartPreview';
import UserDetailsModal from '../components/HomePage/UserDetailsModal';
import { useCart } from '../context/CartContext';
import '../styles/HomePage.css';

const HomePage = () => {
  const categories = [
    'Burger', 'Pizza', 'Drink', 'French fries', 'Veggies',
    'Pasta', 'Desserts', 'Seafood', 'Salads', 'Soups'
  ];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const { cart } = useCart();

  // Check if user details exist in localStorage
  useEffect(() => {
    const savedUserDetails = localStorage.getItem('userDetails');
    if (savedUserDetails) {
      setUserDetails(JSON.parse(savedUserDetails));
    } else {
      // Show user details modal on first visit
      setShowUserDetails(true);
    }
  }, []);

  const handleUserDetailsSubmit = (details) => {
    setUserDetails(details);
    localStorage.setItem('userDetails', JSON.stringify(details));
    setShowUserDetails(false);
  };

  // Filter search within selected category
  const categorySpecificSearch = selectedCategory === 'All' ? searchTerm : searchTerm;

  return (
    <div className="home-page-user">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        userDetails={userDetails}
        onEditDetails={() => setShowUserDetails(true)}
      />
      
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setSearchTerm(''); // Clear search when changing category
        }}
      />
      
      <MenuGrid
        selectedCategory={selectedCategory}
        searchTerm={categorySpecificSearch}
      />
      
      {cart.length > 0 && <CartPreview />}

      <UserDetailsModal
        isOpen={showUserDetails}
        onClose={() => setShowUserDetails(false)}
        onSubmit={handleUserDetailsSubmit}
        initialData={userDetails}
      />
    </div>
  );
};

export default HomePage;