const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Chef = require('../models/Chef');

// Get analytics summary
exports.getAnalyticsSummary = async (req, res) => {
  try {
    const totalChefs = await Chef.countDocuments();
    
    const revenueResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$grandTotal' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    const totalOrders = await Order.countDocuments();
    const totalClients = await Customer.countDocuments();

    res.json({
      success: true,
      data: {
        totalChefs,
        totalRevenue,
        totalOrders,
        totalClients,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get orders summary with filters
exports.getOrdersSummary = async (req, res) => {
  try {
    const { filter = 'daily' } = req.query;

    let startDate;
    const endDate = new Date();

    switch (filter) {
      case 'weekly':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'monthly':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        break;
      case 'daily':
      default:
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        break;
    }

    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    // Treat all orders as served for dashboard summary per new requirement
    const served = orders.length;
    const dineIn = 0;
    const takeaway = 0;
    const totalCount = orders.length;

    const servedPercent = totalCount > 0 ? Math.round((served / totalCount) * 100) : 0;
    const dineInPercent = totalCount > 0 ? Math.round((dineIn / totalCount) * 100) : 0;
    const takeawayPercent = totalCount > 0 ? Math.round((takeaway / totalCount) * 100) : 0;

    res.json({
      success: true,
      data: {
        served,
        dineIn,
        takeaway,
        servedPercent,
        dineInPercent,
        takeawayPercent,
        totalCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get revenue data for graph
exports.getRevenueData = async (req, res) => {
  try {
    const { filter = 'daily' } = req.query;

    let startDate;
    const endDate = new Date();

    switch (filter) {
      case 'yearly':
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      case 'monthly':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        break;
      case 'weekly':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'daily':
      default:
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        break;
    }

    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).sort('createdAt');

    const revenueByPeriod = {};
    
    orders.forEach(order => {
      let key;
      const date = new Date(order.createdAt);
      
      switch (filter) {
        case 'yearly':
          key = date.toLocaleString('en-US', { month: 'short' });
          break;
        case 'monthly':
        case 'weekly':
          key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          break;
        case 'daily':
        default:
          key = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
          break;
      }
      
      revenueByPeriod[key] = (revenueByPeriod[key] || 0) + order.grandTotal;
    });

    const labels = Object.keys(revenueByPeriod);
    const revenue = Object.values(revenueByPeriod);

    res.json({
      success: true,
      data: {
        labels,
        revenue,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get chef statistics - current workload for dashboard
exports.getChefStats = async (req, res) => {
  try {
    const chefs = await Chef.find().select('name currentOrderCount ordersCompleted');

    // Format data for dashboard - prioritize current active orders
    const chefStats = chefs.map(chef => ({
      _id: chef._id,
      name: chef.name,
      currentOrders: chef.currentOrderCount,  // Current active orders (for workload chart)
      completedOrders: chef.ordersCompleted,  // Historical completed orders
      // For backward compatibility, also include the old field name
      currentOrderCount: chef.currentOrderCount,
      ordersCompleted: chef.ordersCompleted
    }));

    res.json({
      success: true,
      data: chefStats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
