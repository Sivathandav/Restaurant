import React, { useState, useEffect } from 'react';
import OrderCard from '../components/Orders/OrderCard';
import { getActiveOrders } from '../services/api';
import '../styles/Orders.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    // No automatic refresh - only updates when user manually refreshes the page
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getActiveOrders();
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="orders-page">
      <main className="orders-content">
        <div className="orders-frame">
          <div className="orders-frame-header">
            <h1 className="orders-title">Orders</h1>
          </div>
          
          <div className="orders-grid">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onStatusChange={fetchOrders}
                />
              ))
            ) : (
              <div className="no-orders">No active orders</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;