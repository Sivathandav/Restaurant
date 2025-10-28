import React from 'react';
import { Clock, Star, Package } from 'lucide-react';

const MenuItemCard = ({ item, onToggleStock, onEdit, onDelete, isBlurred = false }) => {
  return (
    <div className={`menu-item-card ${!item.inStock ? 'out-of-stock' : ''} ${isBlurred ? 'blurred' : ''}`}>
      <div className="menu-item-image">
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
        <div className={`stock-badge ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
          <Package size={14} />
          {item.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>

      <div className="menu-item-content">
        <h3>{item.name}</h3>
        <p className="description">{item.description}</p>

        <div className="menu-item-details">
          <div className="detail">
            <span className="label">Price:</span>
            <span className="value">₹{item.price}</span>
          </div>
          <div className="detail">
            <Clock size={14} />
            <span>{item.averagePreparationTime} mins</span>
          </div>
          <div className="detail">
            <span className="category-badge">{item.category}</span>
          </div>
        </div>

        {item.rating > 0 && (
          <div className="rating">
            <Star size={14} fill="#FFD700" color="#FFD700" />
            <span>{item.rating}</span>
          </div>
        )}

        <div className="menu-item-actions">
          <button className="btn-toggle" onClick={() => onToggleStock(item._id)}>
            {item.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;