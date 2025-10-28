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
    type: Number, // in minutes
    required: [true, 'Preparation time is required'],
    min: 1,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Burger', 'Pizza', 'Drink', 'French fries', 'Veggies',
      'Pasta', 'Desserts', 'Seafood', 'Salads', 'Soups'
    ],
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

// Index for efficient category filtering and search
menuItemSchema.index({ category: 1, name: 1 });
menuItemSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('MenuItem', menuItemSchema);
