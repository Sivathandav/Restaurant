import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState('takeaway'); // 'dineIn' or 'takeaway'

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
      
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      
      return [...prevCart, { ...item, quantity: 1, specialInstructions: '' }];
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === itemId);
      
      if (existingItem.quantity === 1) {
        return prevCart.filter((cartItem) => cartItem._id !== itemId);
      }
      
      return prevCart.map((cartItem) =>
        cartItem._id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    });
  };

  // Remove item completely from cart
  const removeItemCompletely = (itemId) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem._id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate totals
  const itemTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = orderType === 'takeaway' ? 50 : 0;
  const taxes = Math.round((itemTotal + deliveryCharge) * 0.05); // 5% tax
  const grandTotal = itemTotal + deliveryCharge + taxes;

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeItemCompletely,
        updateQuantity,
        clearCart,
        itemTotal,
        deliveryCharge,
        taxes,
        grandTotal,
        cartCount,
        orderType,
        setOrderType,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};