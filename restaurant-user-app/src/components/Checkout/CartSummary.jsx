import React from 'react';
import { Plus, Minus, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartSummary = ({ cookingInstructions, setCookingInstructions, onOpenModal }) => {
  const { cart, addToCart, removeFromCart, removeItemCompletely } = useCart();

  return (
    <div className="cart-summary">
      {cart.map((item) => (
        <div key={item._id} className="cart-item-checkout">
          <div className="item-left-section">
            <div className="item-image-checkout">
              <img 
                src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80'} 
                alt={item.name}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80';
                }}
              />
            </div>
            
            <button 
              className="add-cooking-instructions-btn"
              onClick={onOpenModal}
            >
              Add cooking instructions (optional)
            </button>
          </div>
          
          <div className="item-info-checkout">
            <div className="item-header-checkout">
              <div className="item-name-details">
                <h4>{item.name}</h4>
                {item.description && (
                  <p className="item-details-checkout">{item.description}</p>
                )}
              </div>
              <button
                className="remove-item-btn"
                onClick={() => removeItemCompletely(item._id)}
                aria-label="Remove item"
              >
                <X size={16} />
              </button>
            </div>
            
            <p className="item-price-checkout">₹{item.price}</p>
            
            <div className="quantity-controls-checkout">
              <button
                className="qty-btn-checkout"
                onClick={() => removeFromCart(item._id)}
              >
                <Minus size={14} />
              </button>
              <span className="quantity-checkout">{item.quantity}</span>
              <button
                className="qty-btn-checkout"
                onClick={() => addToCart(item)}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartSummary;