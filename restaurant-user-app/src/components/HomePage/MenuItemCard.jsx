import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const MenuItemCard = ({ item }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const cartItem = cart.find((cartItem) => cartItem._id === item._id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    if (!imageError) {
      setImageError(true);
      e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80';
    }
  };

  return (
    <div className="menu-item-card-user">
      <div className="item-image">
        {!imageLoaded && (
          <div className="image-placeholder">
            <div className="placeholder-spinner"></div>
          </div>
        )}
        <img 
          src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80'} 
          alt={item.name}
          className={imageLoaded ? 'loaded' : ''}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      
      <div className="item-content">
        <div className="item-info">
          <h3 className="item-name">{item.name}</h3>
          <p className="item-description">{item.description}</p>
          <p className="item-price">₹{item.price}</p>
        </div>
        
        <div className="item-actions">
          {quantity === 0 ? (
            <button className="add-btn" onClick={() => addToCart(item)}>
              <Plus size={20} />
            </button>
          ) : (
            <div className="quantity-controls">
              <button className="qty-btn" onClick={() => removeFromCart(item._id)}>
                <Minus size={18} />
              </button>
              <span className="quantity">{quantity}</span>
              <button className="qty-btn" onClick={() => addToCart(item)}>
                <Plus size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;