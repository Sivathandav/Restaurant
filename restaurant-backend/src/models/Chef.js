const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Chef name is required'],
    trim: true,
  },
  currentOrderCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  ordersCompleted: {
    type: Number,
    default: 0,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Method to increment order count
chefSchema.methods.assignOrder = function() {
  this.currentOrderCount += 1;
  return this.save();
};

// Method to complete order
chefSchema.methods.completeOrder = function() {
  if (this.currentOrderCount > 0) {
    this.currentOrderCount -= 1;
  }
  this.ordersCompleted += 1;
  return this.save();
};

module.exports = mongoose.model('Chef', chefSchema);
