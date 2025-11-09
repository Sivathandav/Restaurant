import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getRevenueData } from '../../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RevenueChart = () => {
  const [filter, setFilter] = useState('daily');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchRevenueData();
  }, [filter]);

  const fetchRevenueData = async () => {
    try {
      const response = await getRevenueData(filter);
      const { labels, revenue } = response.data.data;

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Revenue',
            data: revenue,
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            fill: true,
            tension: 0.4,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="revenue-chart-container">
      <div className="chart-header">
        <h3>Revenue</h3>
        <div className="filter-buttons">
          <button 
            className={filter === 'daily' ? 'active' : ''} 
            onClick={() => handleFilterChange('daily')}
          >
            Daily
          </button>
          <button 
            className={filter === 'weekly' ? 'active' : ''} 
            onClick={() => handleFilterChange('weekly')}
          >
            Weekly
          </button>
          <button 
            className={filter === 'monthly' ? 'active' : ''} 
            onClick={() => handleFilterChange('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="chart-wrapper">
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div>Loading chart...</div>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;