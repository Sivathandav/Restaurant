const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  averagePreparationTime: {
    type: Number,
    required: [true, 'Preparation time is required'],
    min: 1,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Soups', 'Seafood', 'Burger', 'Pizza', 'Pasta', 'Salads', 'Sandwich', 'Desserts', 'Beverages', 'Appetizer'],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  image: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

menuItemSchema.index({ category: 1, name: 1 });
menuItemSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('MenuItem', menuItemSchema);