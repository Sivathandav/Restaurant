import { useState, useEffect } from 'react';

const CreateTableModal = ({ isOpen, onClose, onCreate, nextTableNumber }) => {
  const [tableNumber, setTableNumber] = useState('');
  const [chairCount, setChairCount] = useState('2');

  useEffect(() => {
    if (isOpen) {
      setTableNumber(nextTableNumber?.toString() || '');
      setChairCount('2');
    }
  }, [isOpen, nextTableNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ 
      tableName: tableNumber, 
      chairCount: parseInt(chairCount) 
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="create-table-card visible">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-label-center">Table name (optional)</div>
          <input
            type="text"
            className="table-name-input-box"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            autoFocus
          />
          <div className="dotted-line"></div>
        </div>

        <div className="form-group">
          <div className="form-label-left">Chair</div>
          <select 
            className="chair-select"
            value={chairCount}
            onChange={(e) => setChairCount(e.target.value)}
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
        </div>

        <button type="submit" className="create-btn">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTableModal;