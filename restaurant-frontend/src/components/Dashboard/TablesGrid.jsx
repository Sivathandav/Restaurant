import React, { useEffect, useState } from 'react';
import { getAllTables } from '../../services/api';
import { Users } from 'lucide-react';

const TablesGrid = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await getAllTables();
      setTables(response.data.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading tables...</div>;

  return (
    <div className="tables-section">
      <div className="tables-header">
        <h3>Tables</h3>
        <div className="tables-legend">
          <span className="legend-item">
            <span className="legend-dot reserved" />Reserved
          </span>
          <span className="legend-item">
            <span className="legend-dot available" />Available
          </span>
        </div>
      </div>
      <div className="tables-grid">
        {tables.map((table) => (
          <div
            key={table._id}
            className={`table-card-mini ${table.status === 'reserved' ? 'reserved' : 'available'}`}
          >
            <div className="table-number">Table {table.tableNumber}</div>
            <div className="table-chairs">
              <Users size={16} />
              <span>{table.chairCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablesGrid;