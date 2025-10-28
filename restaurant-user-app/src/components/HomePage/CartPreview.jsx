import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartPreview = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  if (cartCount === 0) return null;

  return (
    <div className="cart-preview-container">
      <button className="next-btn" onClick={() => navigate('/checkout')}>
        Next ({cartCount} items)
      </button>
    </div>
  );
};

export default CartPreview;