const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true,
  },
  name: String, // Denormalized for faster access
  price: Number,
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  specialInstructions: {
    type: String,
    default: '',
  },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  orderType: {
    type: String,
    enum: ['dineIn', 'takeaway'],
    required: true,
  },
  tableNumber: {
    type: Number,
    default: null,
  },
  items: [orderItemSchema],
  customerDetails: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    numberOfMembers: {
      type: Number,
      min: 1,
    },
    deliveryAddress: {
      type: String,
      default: '',
    },
  },
  itemTotal: {
    type: Number,
    required: true,
    min: 0,
  },
  deliveryCharge: {
    type: Number,
    default: 0,
    min: 0,
  },
  taxes: {
    type: Number,
    default: 0,
    min: 0,
  },
  grandTotal: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['processing', 'done', 'served', 'notPickedUp'],
    default: 'processing',
  },
  assignedChef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chef',
    required: true,
  },
  processingTime: {
    type: Number, // Total estimated time in minutes
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ orderId: 1 });
orderSchema.index({ 'customerDetails.phone': 1 });

// Virtual to calculate remaining time
orderSchema.virtual('remainingTime').get(function() {
  if (this.status !== 'processing') return 0;
  
  const elapsed = Date.now() - this.startTime.getTime();
  const totalTime = this.processingTime * 60 * 1000; // Convert to ms
  const remaining = totalTime - elapsed;
  
  return remaining > 0 ? Math.ceil(remaining / 60000) : 0; // Return in minutes
});

// Method to check and update status based on time
orderSchema.methods.checkAndUpdateStatus = async function() {
  if (this.status === 'processing') {
    const elapsed = Date.now() - this.startTime.getTime();
    const totalTime = this.processingTime * 60 * 1000;
    
    if (elapsed >= totalTime) {
      this.status = 'done';
      this.endTime = new Date();
      await this.save();
    }
  }
  return this;
};

// Static method to generate unique order ID
orderSchema.statics.generateOrderId = async function() {
  const count = await this.countDocuments();
  return `${count + 100}`; // Start from 100
};

module.exports = mongoose.model('Order', orderSchema);
