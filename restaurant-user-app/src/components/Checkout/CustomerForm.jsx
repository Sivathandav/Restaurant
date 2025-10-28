import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

const CustomerForm = ({ customerData, setCustomerData }) => {
  const { orderType } = useCart();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="customer-form">
      <h3 className="form-title">Your details</h3>
      
      <div className="form-group-user">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="full name"
          value={customerData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group-user">
        <label>Contact</label>
        <input
          type="tel"
          name="phone"
          placeholder="phone"
          value={customerData.phone}
          onChange={handleChange}
          required
        />
      </div>

      {orderType === 'dineIn' && (
        <div className="form-group-user">
          <label>Number of Persons</label>
          <div className="person-selector">
            {[2, 4, 6, 8].map((num) => (
              <button
                key={num}
                type="button"
                className={`person-btn ${
                  customerData.numberOfMembers === num ? 'selected' : ''
                }`}
                onClick={() =>
                  setCustomerData((prev) => ({
                    ...prev,
                    numberOfMembers: num,
                  }))
                }
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {orderType === 'takeaway' && (
        <div className="form-group-user">
          <label>Address</label>
          <textarea
            name="deliveryAddress"
            placeholder="Flat no, Street, Area, City..."
            value={customerData.deliveryAddress}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>
      )}
    </div>
  );
};

export default CustomerForm;