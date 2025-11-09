import React, { useEffect, useState } from 'react';
import { getChefStats } from '../../services/api';
import { ChefHat } from 'lucide-react';

const ChefStats = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChefStats();
    // Auto-refresh every 30 seconds to show real-time updates
    const interval = setInterval(fetchChefStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchChefStats = async () => {
    try {
      const response = await getChefStats();
      setChefs(response.data.data);
    } catch (error) {
      console.error('Error fetching chef stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="chef-stats-section">
        <div style={{ padding: '20px', textAlign: 'center' }}>Loading chef data...</div>
      </div>
    );
  }

  return (
    <div className="chef-stats-section">
      <table className="chef-table">
        <thead>
          <tr>
            <th>Chef Name</th>
            <th>Order Taken</th>
          </tr>
        </thead>
        <tbody>
          {chefs.length === 0 ? (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                No chef data available
              </td>
            </tr>
          ) : (
            chefs.map((chef) => (
              <tr key={chef._id}>
                <td>{chef.name}</td>
                <td>{chef.currentOrderCount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChefStats;