const Chef = require('../models/Chef');

// Get all chefs
exports.getAllChefs = async (req, res) => {
  try {
    const chefs = await Chef.find({}).sort('name');
    res.json({ success: true, data: chefs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single chef
exports.getChef = async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.id);
    if (!chef) {
      return res.status(404).json({ success: false, message: 'Chef not found' });
    }
    res.json({ success: true, data: chef });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new chef
exports.createChef = async (req, res) => {
  try {
    const { name, isActive = true } = req.body;
    
    // Check if chef with same name already exists
    const existingChef = await Chef.findOne({ name });
    if (existingChef) {
      return res.status(400).json({ 
        success: false, 
        message: 'Chef with this name already exists' 
      });
    }

    const chef = await Chef.create({
      name,
      currentOrderCount: 0,
      ordersCompleted: 0,
      isActive
    });

    res.status(201).json({ success: true, data: chef });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update chef
exports.updateChef = async (req, res) => {
  try {
    const { name, isActive } = req.body;
    
    const chef = await Chef.findByIdAndUpdate(
      req.params.id,
      { name, isActive },
      { new: true, runValidators: true }
    );

    if (!chef) {
      return res.status(404).json({ success: false, message: 'Chef not found' });
    }

    res.json({ success: true, data: chef });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Toggle chef availability
exports.toggleChefAvailability = async (req, res) => {
  try {
    const { isActive } = req.body;
    
    const chef = await Chef.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );

    if (!chef) {
      return res.status(404).json({ success: false, message: 'Chef not found' });
    }

    res.json({ 
      success: true, 
      data: chef,
      message: `Chef ${chef.name} is now ${isActive ? 'active' : 'inactive'}` 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete chef
exports.deleteChef = async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.id);
    
    if (!chef) {
      return res.status(404).json({ success: false, message: 'Chef not found' });
    }

    // Check if chef has current orders
    if (chef.currentOrderCount > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Cannot delete chef ${chef.name} who has ${chef.currentOrderCount} active orders` 
      });
    }

    await chef.deleteOne();
    res.json({ 
      success: true, 
      message: `Chef ${chef.name} deleted successfully` 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get chef statistics
exports.getChefStatistics = async (req, res) => {
  try {
    const chefs = await Chef.find({});
    
    const stats = {
      totalChefs: chefs.length,
      activeChefs: chefs.filter(c => c.isActive).length,
      inactiveChefs: chefs.filter(c => !c.isActive).length,
      totalCurrentOrders: chefs.reduce((sum, chef) => sum + chef.currentOrderCount, 0),
      totalCompletedOrders: chefs.reduce((sum, chef) => sum + chef.ordersCompleted, 0),
      chefDetails: chefs.map(chef => ({
        id: chef._id,
        name: chef.name,
        currentOrders: chef.currentOrderCount,
        completedOrders: chef.ordersCompleted,
        isActive: chef.isActive,
        workloadPercentage: chefs.length > 0 ? 
          Math.round((chef.currentOrderCount / Math.max(1, Math.max(...chefs.map(c => c.currentOrderCount)))) * 100) : 0
      }))
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};