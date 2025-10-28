import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getOrdersSummary } from '../../services/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderSummaryPieChart = () => {
  const [filter, setFilter] = useState('daily');
  const [data, setData] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const response = await getOrdersSummary(filter);
      const orderData = response.data.data;
      setStats(orderData);

      setData({
        labels: ['Dine In', 'Served', 'Take Away'],
        datasets: [
          {
            data: [orderData.dineIn, orderData.served, orderData.takeaway],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching orders summary:', error);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="order-summary-container">
      <div className="summary-header">
        <h3>Order Summary</h3>
        <div className="filter-buttons">
          <button className={'active'}>Daily</button>
        </div>
      </div>

      <div className="summary-stats">
        <div className="stat-item">
          <span className="stat-label">Served</span>
          <span className="stat-value">{stats.served || 0}</span>
          <span className="stat-percent">({stats.servedPercent || 0}%)</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Dine In</span>
          <span className="stat-value">{stats.dineIn || 0}</span>
          <span className="stat-percent">({stats.dineInPercent || 0}%)</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Take Away</span>
          <span className="stat-value">{stats.takeaway || 0}</span>
          <span className="stat-percent">({stats.takeawayPercent || 0}%)</span>
        </div>
      </div>

      <div className="chart-wrapper">
        {data ? (
          <Doughnut data={data} options={options} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default OrderSummaryPieChart;