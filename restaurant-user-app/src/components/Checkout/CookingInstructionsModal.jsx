import React, { useState } from 'react';
import { X } from 'lucide-react';

const CookingInstructionsModal = ({ isOpen, onClose, instructions, setInstructions }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay-user" onClick={onClose}>
      <div className="modal-content-user" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-user">
          <h3>Add Cooking instructions</h3>
          <button className="close-btn-user" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <p className="disclaimer">
          The restaurant will try its best to follow your request. However,
          refunds or cancellations in this regard won't be possible
        </p>

        <textarea
          className="instructions-input"
          placeholder="Enter your instructions..."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows="6"
          autoFocus
        />

        <div className="modal-actions-user">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-next" onClick={onClose}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookingInstructionsModal;