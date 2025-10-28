import React, { useState } from 'react';
import { X } from 'lucide-react';

const CreateTableModal = ({ isOpen, onClose, onCreate }) => {
  const [tableName, setTableName] = useState('');
  const [chairCount, setChairCount] = useState(4);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ tableName, chairCount });
    setTableName('');
    setChairCount(4);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Table</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Table Name (Optional)</label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="e.g., Window Side"
            />
          </div>

          <div className="form-group">
            <label>Number of Chairs *</label>
            <div className="chair-options">
              {[2, 4, 6, 8].map((count) => (
                <button
                  key={count}
                  type="button"
                  className={`chair-option ${chairCount === count ? 'selected' : ''}`}
                  onClick={() => setChairCount(count)}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTableModal;