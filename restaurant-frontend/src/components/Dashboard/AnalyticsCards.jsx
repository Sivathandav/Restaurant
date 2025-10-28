import React, { useEffect, useState } from 'react';
import { getAnalyticsSummary } from '../../services/api';
import { Users, DollarSign, ShoppingBag, UserCheck } from 'lucide-react';

const AnalyticsCards = ({ searchTerm = '' }) => {
  const [data, setData] = useState({
    totalChefs: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalClients: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAnalyticsSummary();
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: 'TOTAL CHEF',
      value: data.totalChefs,
      icon: <Users size={24} />,
      bgColor: '#cfe8ff',
    },
    {
      title: 'TOTAL REVENUE',
      value: `₹${(data.totalRevenue / 1000).toFixed(1)}K`,
      icon: <DollarSign size={24} />,
      bgColor: '#cfe8ff',
    },
    {
      title: 'TOTAL ORDERS',
      value: data.totalOrders,
      icon: <ShoppingBag size={24} />,
      bgColor: '#cfe8ff',
    },
    {
      title: 'TOTAL CLIENTS',
      value: data.totalClients,
      icon: <UserCheck size={24} />,
      bgColor: '#cfe8ff',
    },
  ];

  if (loading) return <div className="loading">Loading...</div>;

  const term = searchTerm.toLowerCase();
  return (
    <div className="analytics-cards">
      {cards.map((card, index) => (
        <div key={index} className={`analytics-card ${term && !card.title.toLowerCase().includes(term) ? 'dimmed' : ''}`}>
          <div className="card-icon" style={{ backgroundColor: card.bgColor }}>
            {card.icon}
          </div>
          <div className="card-content">
            <h3>{card.title}</h3>
            <p className="card-value">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCards;