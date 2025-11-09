import React from 'react';
import { X } from 'lucide-react';

const CookingInstructionsModal = ({ isOpen, onClose, instructions, setInstructions }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay-cooking" onClick={onClose}>
      <div className="modal-content-cooking" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn-cooking" onClick={onClose}>
          <X size={24} strokeWidth={2} />
        </button>
        
        <h2 className="modal-title-cooking">Add Cooking instructions</h2>

        <textarea
          className="instructions-input-cooking"
          placeholder=""
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows="6"
          autoFocus
        />

        <p className="disclaimer-cooking">
          The restaurant will try its best to follow your request. However, refunds or cancellations in this regard won't be possible
        </p>

        <div className="modal-actions-cooking">
          <button className="btn-cancel-cooking" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-next-cooking" onClick={onClose}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookingInstructionsModal;