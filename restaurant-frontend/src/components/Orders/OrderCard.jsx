import React, { useState, useEffect } from 'react';
import { Utensils, MapPin, ShoppingBag, Clock } from 'lucide-react';
import { updateOrderStatus } from '../../services/api';

const OrderCard = ({ order, onStatusChange, isBlurred = false }) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (order.status === 'processing' && order.startTime) {
      // Calculate remaining time only once when component mounts or order changes
      const elapsed = Date.now() - new Date(order.startTime).getTime();
      const totalTime = order.processingTime * 60 * 1000;
      const remaining = totalTime - elapsed;
      setRemainingTime(remaining > 0 ? Math.ceil(remaining / 60000) : 0);
    }
  }, [order.startTime, order.processingTime, order.status]);



  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateOrderStatus(order._id, newStatus);
      onStatusChange();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getCardTheme = (status) => {
    switch (status) {
      case 'processing':
        return {
          bgColor: '#FEF3C7', // Light amber
          borderColor: '#F59E0B', // Amber
          statusBg: '#F59E0B',
          statusText: 'Ongoing',
          buttonBg: '#F59E0B',
          buttonText: 'Processing',
          icon: '⏱️'
        };
      case 'done':
        return {
          bgColor: '#D1FAE5', // Light green
          borderColor: '#10B981', // Green
          statusBg: '#10B981',
          statusText: 'Done',
          buttonBg: '#10B981',
          buttonText: 'Order Done',
          icon: '✅'
        };
      case 'served':
        return {
          bgColor: '#D1FAE5', // Light green
          borderColor: '#10B981', // Green
          statusBg: '#10B981',
          statusText: 'Served',
          buttonBg: '#10B981',
          buttonText: 'Order Done',
          icon: '✅'
        };
      case 'notPickedUp':
        return {
          bgColor: '#E5E7EB', // Light gray
          borderColor: '#6B7280', // Gray
          statusBg: '#6B7280',
          statusText: 'Not Picked up',
          buttonBg: '#6B7280',
          buttonText: 'Order Done',
          icon: '⏰'
        };
      default:
        return {
          bgColor: '#F3F4F6',
          borderColor: '#9CA3AF',
          statusBg: '#9CA3AF',
          statusText: 'Unknown',
          buttonBg: '#9CA3AF',
          buttonText: 'Order Done',
          icon: '❓'
        };
    }
  };

  const theme = getCardTheme(order.status);
  const createdAtStr = new Date(order.createdAt).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });

  return (
    <div 
      className={`new-order-card ${isBlurred ? 'blurred' : ''}`} 
      style={{ 
        backgroundColor: theme.bgColor,
        borderLeft: `4px solid ${theme.borderColor}`
      }}
    >
      {/* Header */}
      <div className="order-header">
        <div className="order-icon">
          <Utensils size={16} />
        </div>
        <div className="order-number">#{order.orderId}</div>
        <div 
          className="order-status-badge"
          style={{ backgroundColor: theme.statusBg }}
        >
          {theme.statusText}
        </div>
      </div>

      {/* Order Info */}
      <div className="order-info">
        <div className="order-location">
          {order.orderType === 'dineIn' ? (
            <>
              <MapPin size={12} />
              <span>Table-{order.tableNumber}</span>
            </>
          ) : (
            <>
              <ShoppingBag size={12} />
              <span>Take Away</span>
            </>
          )}
        </div>
        <div className="order-time">{createdAtStr}</div>
      </div>

      <div className="order-items-count">{order.items.length} Item</div>

      {/* Items List */}
      <div className="order-items-list">
        {order.items.map((item, idx) => (
          <div key={idx} className="order-item">
            <span className="item-quantity">{item.quantity} x</span>
            <span className="item-name">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="order-footer">
        {order.status === 'processing' && (
          <div className="cooking-time">
            <Clock size={12} />
            <span>Ongoing: {remainingTime} Min</span>
          </div>
        )}
        
        <button 
          className="status-button"
          style={{ backgroundColor: theme.buttonBg }}
          onClick={() => {
            if (order.status === 'processing') {
              handleStatusUpdate('done');
            } else if (order.status === 'done') {
              handleStatusUpdate('served');
            }
          }}
        >
          {theme.buttonText} {theme.icon}
        </button>
      </div>
    </div>
  );
};

export default OrderCard;