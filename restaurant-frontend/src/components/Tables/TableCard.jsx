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
        {table.status === 'available' && (
          <button
            className="delete-btn"
            onClick={() => onDelete(table._id)}
            title="Delete Table"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        fontSize: '0.813rem', 
        fontWeight: '500', 
        color: '#000000',
        marginBottom: '2px'
      }}>
        Table
      </div>
      
      <h4 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '700', 
        color: '#000000', 
        margin: '0', 
        textAlign: 'center', 
        lineHeight: '1'
      }}>
        {String(table.tableNumber).padStart(2, '0')}
      </h4>
      
      <div className="table-info">
        <img 
          src="https://www.svgrepo.com/show/313673/chair-solid.svg" 
          alt="chair" 
          style={{ width: '12px', height: '12px' }}
        />
        <span style={{ fontSize: '0.75rem' }}>{String(table.chairCount).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default TableCard;