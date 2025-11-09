import React from 'react';
import { useCart } from '../../context/CartContext';
import { MapPin, Clock } from 'lucide-react';

const CustomerForm = ({ customerData, setCustomerData }) => {
  const { orderType } = useCart();

  return (
    <div className="customer-form">
      <h3 className="form-title">Your details</h3>
      
      <div className="user-details-display">
        <p className="user-name-phone">{customerData.name}, {customerData.phone}</p>
      </div>

      {orderType === 'takeaway' && customerData.deliveryAddress && (
        <>
          <div className="delivery-info-row">
            <MapPin size={20} color="#4CAF50" />
            <span className="delivery-info-text">
              Delivery at Home - {customerData.deliveryAddress}
            </span>
          </div>
          
          <div className="delivery-info-row">
            <Clock size={20} color="#4CAF50" />
            <span className="delivery-info-text">Delivery in 42 mins</span>
          </div>
        </>
      )}

      {orderType === 'dineIn' && (
        <>
          <div className="order-info-row">
            <span className="order-info-label">Order ID:</span>
            <span className="order-info-value">#ORD{Date.now().toString().slice(-6)}</span>
          </div>
          
          <div className="order-info-row">
            <span className="order-info-label">Order Status:</span>
            <span className="order-info-value status-pending">Pending</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerForm;