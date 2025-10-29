import React, { useState, useEffect } from 'react';
import Header from '../components/Dashboard/Header';
import OrderCard from '../components/Orders/OrderCard';
import { getActiveOrders } from '../services/api';
import '../styles/Orders.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredOrders = orders.filter(order => 
    searchTerm === '' || 
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.assignedChef?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="orders-page">
      <Header onSearch={setSearchTerm} title="Orders" />
      
      <main className="orders-content">
        <div className="orders-grid">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onStatusChange={fetchOrders}
                isBlurred={searchTerm !== '' && 
                  !order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  !order.customerDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  !order.assignedChef?.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  !order.status.toLowerCase().includes(searchTerm.toLowerCase())
                }
              />
            ))
          ) : (
            <div className="no-orders">No active orders</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;