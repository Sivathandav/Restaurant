import React, { useEffect, useState } from 'react';
import { getChefStats } from '../../services/api';
import { ChefHat } from 'lucide-react';

const ChefStats = () => {
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    fetchChefStats();
  }, []);

  const fetchChefStats = async () => {
    try {
      const response = await getChefStats();
      setChefs(response.data.data);
    } catch (error) {
      console.error('Error fetching chef stats:', error);
    }
  };

  return (
    <div className="chef-stats-section">
      <h3>Chef Name vs Order Taken</h3>
      <table className="chef-table">
        <thead>
          <tr>
            <th>Chef Name</th>
            <th>Order Taken</th>
          </tr>
        </thead>
        <tbody>
          {chefs.map((chef) => (
            <tr key={chef._id}>
              <td>
                <ChefHat size={16} style={{ marginRight: '8px' }} />
                {chef.name}
              </td>
              <td>{chef.ordersCompleted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChefStats;