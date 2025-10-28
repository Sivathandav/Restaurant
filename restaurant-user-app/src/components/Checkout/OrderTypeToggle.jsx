import React from 'react';
import { useCart } from '../../context/CartContext';

const OrderTypeToggle = () => {
  const { orderType, setOrderType } = useCart();

  return (
    <div className="order-type-toggle">
      <button
        className={`toggle-btn ${orderType === 'dineIn' ? 'active' : ''}`}
        onClick={() => setOrderType('dineIn')}
      >
        Dine In
      </button>
      <button
        className={`toggle-btn ${orderType === 'takeaway' ? 'active' : ''}`}
        onClick={() => setOrderType('takeaway')}
      >
        Take Away
      </button>
    </div>
  );
};

export default OrderTypeToggle;