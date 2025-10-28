const Chef = require('../models/Chef');

// Get all chefs
exports.getAllChefs = async (req, res) => {
  try {
    const chefs = await Chef.find().sort('name');
    res.json({ success: true, data: chefs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get chef with fewest orders for assignment
exports.getChefForAssignment = async (req, res) => {
  try {
    const chefs = await Chef.find({ isActive: true }).sort('currentOrderCount');
    
    if (chefs.length === 0) {
      return res.status(404).json({ success: false, message: 'No active chefs available' });
    }

    const minOrders = chefs[0].currentOrderCount;
    const eligibleChefs = chefs.filter(c => c.currentOrderCount === minOrders);
    
    // Random selection if multiple have same count
    const selectedChef = eligibleChefs[Math.floor(Math.random() * eligibleChefs.length)];

    res.json({ success: true, data: selectedChef });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create chef (admin use)
exports.createChef = async (req, res) => {
  try {
    const chef = await Chef.create(req.body);
    res.status(201).json({ success: true, data: chef });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update chef
exports.updateChef = async (req, res) => {
  try {
    const chef = await Chef.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!chef) {
      return res.status(404).json({ success: false, message: 'Chef not found' });
    }

    res.json({ success: true, data: chef });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};