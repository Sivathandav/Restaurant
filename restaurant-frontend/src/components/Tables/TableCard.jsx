import React from 'react';
import { Users, Trash2 } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';

const TableCard = ({ table, onDelete, index, moveTable, isBlurred = false }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TABLE',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TABLE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTable(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`table-card ${table.status} ${isDragging ? 'dragging' : ''} ${isBlurred ? 'blurred' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="table-header">
        <h4>#{table.tableNumber}</h4>
        {table.status === 'available' && (
          <button
            className="delete-btn"
            onClick={() => onDelete(table._id)}
            title="Delete Table"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
      
      {table.tableName && (
        <div className="table-name">{table.tableName}</div>
      )}
      
      <div className="table-info">
        <Users size={16} />
        <span>{table.chairCount}</span>
      </div>
      
      <div className={`status-badge ${table.status}`}>
        {table.status === 'reserved' ? 'Reserved' : 'Available'}
      </div>
    </div>
  );
};

export default TableCard;