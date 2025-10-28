const Table = require('../models/Table');

// Get all tables
exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.find().sort('tableNumber').populate('currentOrderId');
    res.json({ success: true, data: tables });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get available tables for specific member count
exports.getAvailableTables = async (req, res) => {
  try {
    const { members } = req.query;
    
    const table = await Table.findOne({
      status: 'available',
      chairCount: { $gte: parseInt(members) },
    }).sort('chairCount');

    if (!table) {
      return res.status(404).json({ 
        success: false, 
        message: 'No available table for this party size' 
      });
    }

    res.json({ success: true, data: table });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create table
exports.createTable = async (req, res) => {
  try {
    // Get the highest table number
    const highestTable = await Table.findOne().sort('-tableNumber');
    const nextTableNumber = highestTable ? highestTable.tableNumber + 1 : 1;

    const table = await Table.create({
      ...req.body,
      tableNumber: nextTableNumber,
    });

    res.status(201).json({ success: true, data: table });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update table
exports.updateTable = async (req, res) => {
  try {
    const table = await Table.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!table) {
      return res.status(404).json({ success: false, message: 'Table not found' });
    }

    res.json({ success: true, data: table });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete table
exports.deleteTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({ success: false, message: 'Table not found' });
    }

    if (table.status === 'reserved') {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete reserved table' 
      });
    }

    await table.deleteOne();
    
    // Renumber remaining tables
    await Table.renumberTables();

    res.json({ success: true, message: 'Table deleted and tables renumbered' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reserve table
exports.reserveTable = async (req, res) => {
  try {
    const { orderId } = req.body;
    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({ success: false, message: 'Table not found' });
    }

    await table.reserve(orderId);
    res.json({ success: true, data: table });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Free table
exports.freeTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({ success: false, message: 'Table not found' });
    }

    await table.free();
    res.json({ success: true, data: table });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};