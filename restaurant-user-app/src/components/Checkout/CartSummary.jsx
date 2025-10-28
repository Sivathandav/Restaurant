import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartSummary = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="cart-summary">
      {cart.map((item) => (
        <div key={item._id} className="cart-item-checkout">
          <div className="item-image-checkout">
            <img 
              src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80'} 
              alt={item.name}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80';
              }}
            />
          </div>
          
          <div className="item-info-checkout">
            <div className="item-details-checkout">
              <h4>{item.name}</h4>
              <p className="item-description-checkout">{item.description}</p>
              <p className="item-price-checkout">₹{item.price}</p>
            </div>
            
            <div className="quantity-controls-checkout">
              <button
                className="qty-btn-checkout"
                onClick={() => removeFromCart(item._id)}
              >
                <Minus size={16} />
              </button>
              <span className="quantity-checkout">{item.quantity}</span>
              <button
                className="qty-btn-checkout"
                onClick={() => addToCart(item)}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartSummary;