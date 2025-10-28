import React from 'react';
import { useCart } from '../../context/CartContext';

const PriceBreakdown = () => {
  const { itemTotal, deliveryCharge, taxes, grandTotal, orderType } = useCart();

  const avgPrepTime = 30; // minutes, can be calculated from items
  const deliveryTime = avgPrepTime + (orderType === 'takeaway' ? 12 : 0);

  return (
    <div className="price-breakdown">
      {orderType === 'takeaway' && (
        <p className="delivery-time">Delivery in {deliveryTime} mins</p>
      )}
      
      <div className="price-row">
        <span>Item Total</span>
        <span>₹{itemTotal.toFixed(2)}</span>
      </div>
      
      {orderType === 'takeaway' && (
        <div className="price-row">
          <span>Delivery Charge</span>
          <span>₹{deliveryCharge}</span>
        </div>
      )}
      
      <div className="price-row">
        <span>Taxes</span>
        <span>₹{taxes.toFixed(2)}</span>
      </div>
      
      <div className="price-row grand-total-row">
        <span>Grand Total</span>
        <span>₹{grandTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PriceBreakdown;