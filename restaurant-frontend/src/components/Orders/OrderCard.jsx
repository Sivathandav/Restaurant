import React, { useState, useEffect } from 'react';
import { Utensils, MapPin, ShoppingBag, Clock, CheckCircle } from 'lucide-react';
import { updateOrderStatus } from '../../services/api';

const OrderCard = ({ order, onStatusChange, isBlurred = false }) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (order.status === 'processing' && order.startTime) {
      // Calculate remaining time only once when component mounts or order changes
      // This will NOT update in real-time - only when page is refreshed
      const elapsed = Date.now() - new Date(order.startTime).getTime();
      const totalTime = order.processingTime * 60 * 1000;
      const remaining = totalTime - elapsed;
      setRemainingTime(remaining > 0 ? Math.ceil(remaining / 60000) : 0);
    } else {
      setRemainingTime(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order._id]); // Only depend on order ID to prevent real-time updates



  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateOrderStatus(order._id, newStatus);
      onStatusChange();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getCardTheme = (status, orderType) => {
    const isTakeaway = orderType === 'takeAway' || orderType === 'takeaway';
    
    // For takeaway orders that are done, use takeaway theme
    if (isTakeaway && (status === 'done' || status === 'notPickedUp' || status === 'served')) {
      return {
        bgColor: '#C2D4D9',
        borderColor: '#C2D4D9',
        statusBg: '#C2D4D9',
        statusText: 'Not Picked up',
        buttonBg: '#9BAEB3',
        buttonText: 'Order Done',
        icon: '✅'
      };
    }

    switch (status) {
      case 'processing':
        return {
          bgColor: '#FFE3BC',
          borderColor: '#FFE3BC',
          statusBg: '#FFE3BC',
          statusText: 'Ongoing',
          buttonBg: '#FDC474',
          buttonText: 'Processing',
          icon: '⏳'
        };
      case 'done':
        return {
          bgColor: '#B9F8C9',
          borderColor: '#B9F8C9',
          statusBg: '#B9F8C9',
          statusText: 'Done',
          buttonBg: '#31FF65',
          buttonText: 'Order Done',
          icon: '✅'
        };
      case 'served':
        return {
          bgColor: '#B9F8C9',
          borderColor: '#B9F8C9',
          statusBg: '#B9F8C9',
          statusText: 'Served',
          buttonBg: '#31FF65',
          buttonText: 'Order Done',
          icon: '✅'
        };
      case 'notPickedUp':
        return {
          bgColor: '#C2D4D9',
          borderColor: '#C2D4D9',
          statusBg: '#C2D4D9',
          statusText: 'Not Picked up',
          buttonBg: '#9BAEB3',
          buttonText: 'Order Done',
          icon: '✅'
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

  const theme = getCardTheme(order.status, order.orderType);
  const createdAtStr = new Date(order.createdAt).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });

  const isProcessing = order.status === 'processing';
  const isDone = order.status === 'done' || order.status === 'served';
  const isNotPickedUp = order.status === 'notPickedUp';
  const isTakeaway = order.orderType === 'takeAway' || order.orderType === 'takeaway';
  const isTakeawayDone = isTakeaway && (isDone || isNotPickedUp);
  const isDineInDone = !isTakeaway && isDone;
  const useNewLayout = isProcessing || isDone || isNotPickedUp;

  return (
    <div 
      className={`new-order-card ${isBlurred ? 'blurred' : ''} ${useNewLayout ? 'processing-card' : ''} ${isDineInDone ? 'done-card' : ''} ${isTakeawayDone ? 'takeaway-card' : ''}`} 
      style={{ 
        backgroundColor: theme.bgColor,
        borderLeft: useNewLayout ? 'none' : `4px solid ${theme.borderColor}`
      }}
    >
      {useNewLayout ? (
        <>
          {/* Top White Rectangle */}
          <div className="processing-top-section">
            <div className="processing-header">
              <div className="processing-icon">
                <Utensils size={18} color="#0EA5E9" />
              </div>
              <div className="processing-order-number">#{order.orderId}</div>
              <div className={`processing-status-badge ${isDineInDone ? 'done-status-badge' : ''} ${isTakeawayDone ? 'takeaway-status-badge' : ''}`}>
                {isProcessing ? (
                  <>
                    <div className="processing-dine-in">
                      {isTakeaway ? 'Take Away' : 'Dine In'}
                    </div>
                    <div className="processing-ongoing">
                      Ongoing: {remainingTime} Min
                    </div>
                  </>
                ) : isTakeawayDone ? (
                  <>
                    <div className="takeaway-status-text">Take Away</div>
                    <div className="takeaway-notpicked-text">{theme.statusText}</div>
                  </>
                ) : (
                  <>
                    <div className="done-status-text">{theme.statusText}</div>
                    <div className="done-served-text">Served</div>
                  </>
                )}
              </div>
            </div>
            
            <div className="processing-info-row">
              <div className="processing-left-info">
                <div className="processing-table">
                  {isTakeaway ? 'Take Away' : `Table-${order.tableNumber}`}
                </div>
                <div className="processing-time">{createdAtStr}</div>
                <div className="processing-items-count">{order.items.length} Item</div>
              </div>
            </div>
          </div>

          {/* Bottom White Rectangle - Items List */}
          <div className="processing-items-section">
            {order.items.map((item, idx) => (
              <div key={idx} className="processing-item">
                <span className="processing-item-quantity">{item.quantity} x</span>
                <span className="processing-item-name">{item.name}</span>
              </div>
            ))}
          </div>

          {/* Processing/Done/Takeaway Button */}
          <div className="processing-footer">
            <button 
              className={`processing-button ${isDineInDone ? 'done-button' : ''} ${isTakeawayDone ? 'takeaway-button' : ''}`}
              style={{ backgroundColor: theme.buttonBg }}
              onClick={() => {
                if (isProcessing) {
                  handleStatusUpdate('done');
                } else if (order.status === 'done' && !isTakeaway) {
                  handleStatusUpdate('served');
                }
                // Takeaway orders don't change status on button click
              }}
            >
              {theme.buttonText} 
              {isTakeawayDone ? (
                <CheckCircle size={18} fill="#3B413D" color="#C2D4D9" />
              ) : isDineInDone ? (
                <CheckCircle size={18} fill="#0E912F" color="#31FF65" />
              ) : (
                theme.icon
              )}
            </button>
          </div>
        </>
      ) : (
        <>
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
            <button 
              className="status-button"
              style={{ backgroundColor: theme.buttonBg }}
              onClick={() => {
                if (order.status === 'done') {
                  handleStatusUpdate('served');
                }
              }}
            >
              {theme.buttonText} {theme.icon}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderCard;