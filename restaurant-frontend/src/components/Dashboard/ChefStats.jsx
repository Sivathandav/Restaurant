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
        <h3>Chef Name vs Current Orders</h3>
        <div style={{ padding: '20px', textAlign: 'center' }}>Loading chef data...</div>
      </div>
    );
  }

  return (
    <div className="chef-stats-section">
      <h3>Chef Name vs Current Orders</h3>
      <table className="chef-table">
        <thead>
          <tr>
            <th>Chef Name</th>
            <th>Current Orders</th>
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
                <td>
                  <ChefHat size={16} style={{ marginRight: '8px' }} />
                  {chef.name}
                </td>
                <td>
                  <span style={{ 
                    fontWeight: 'bold',
                    color: chef.currentOrderCount === 0 ? '#10b981' : chef.currentOrderCount > 2 ? '#ef4444' : '#f59e0b'
                  }}>
                    {chef.currentOrderCount}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChefStats;