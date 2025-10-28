const express = require('express');
const router = express.Router();

// Fallback controllers in case they're missing
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Chef = require('../models/Chef');

// Get analytics summary
router.get('/summary', async (req, res) => {
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
    console.error('Error in analytics/summary:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get orders summary with filters
router.get('/orders-summary', async (req, res) => {
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

    const served = orders.filter(o => o.status === 'served').length;
    const dineIn = orders.filter(o => o.orderType === 'dineIn').length;
    const takeaway = orders.filter(o => o.orderType === 'takeaway').length;
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
    console.error('Error in analytics/orders-summary:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get revenue data for graph
router.get('/revenue', async (req, res) => {
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
    console.error('Error in analytics/revenue:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get chef statistics
router.get('/chef-stats', async (req, res) => {
  try {
    const chefs = await Chef.find().select('name currentOrderCount ordersCompleted');

    res.json({
      success: true,
      data: chefs,
    });
  } catch (error) {
    console.error('Error in analytics/chef-stats:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
