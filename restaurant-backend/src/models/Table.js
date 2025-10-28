const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  tableName: {
    type: String,
    trim: true,
    default: '',
  },
  chairCount: {
    type: Number,
    required: true,
    enum: [2, 4, 6, 8],
  },
  status: {
    type: String,
    enum: ['available', 'reserved'],
    default: 'available',
  },
  currentOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    default: null,
  },
}, {
  timestamps: true,
});

// Static method to renumber tables after deletion
tableSchema.statics.renumberTables = async function() {
  const tables = await this.find().sort('tableNumber');
  
  for (let i = 0; i < tables.length; i++) {
    if (tables[i].tableNumber !== i + 1) {
      tables[i].tableNumber = i + 1;
      await tables[i].save();
    }
  }
};

// Method to reserve table
tableSchema.methods.reserve = function(orderId) {
  this.status = 'reserved';
  this.currentOrderId = orderId;
  return this.save();
};

// Method to free table
tableSchema.methods.free = function() {
  this.status = 'available';
  this.currentOrderId = null;
  return this.save();
};

module.exports = mongoose.model('Table', tableSchema);
