const Order = require('../models/Order');
const Chef = require('../models/Chef');
const Table = require('../models/Table');
const Customer = require('../models/Customer');
const MenuItem = require('../models/MenuItem');

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const { status, orderType } = req.query;
    let query = {};

    if (status) query.status = status;
    if (orderType) query.orderType = orderType;

    const orders = await Order.find(query)
      .populate('assignedChef', 'name')
      .populate('items.menuItemId', 'name')
      .sort('-createdAt');

    // Update processing orders status if time elapsed
    for (let order of orders) {
      if (order.status === 'processing') {
        await order.checkAndUpdateStatus();
      }
    }

    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get active orders (processing or done)
exports.getActiveOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ['processing', 'done'] },
    })
      .populate('assignedChef', 'name')
      .sort('-createdAt');

    // Update status and calculate remaining time
    const ordersWithTime = await Promise.all(
      orders.map(async (order) => {
        await order.checkAndUpdateStatus();
        const orderObj = order.toObject({ virtuals: true });
        return orderObj;
      })
    );

    res.json({ success: true, data: ordersWithTime });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('assignedChef', 'name')
      .populate('items.menuItemId');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    await order.checkAndUpdateStatus();
    const orderObj = order.toObject({ virtuals: true });

    res.json({ success: true, data: orderObj });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const {
      orderType,
      items,
      customerDetails,
      itemTotal,
      deliveryCharge = 0,
      taxes = 0,
    } = req.body;

    // Generate unique order ID
    const orderId = await Order.generateOrderId();

    // Assign chef with fewest orders
    const chefs = await Chef.find({ isActive: true }).sort('currentOrderCount');
    if (chefs.length === 0) {
      return res.status(400).json({ success: false, message: 'No chefs available' });
    }

    const minOrders = chefs[0].currentOrderCount;
    const eligibleChefs = chefs.filter(c => c.currentOrderCount === minOrders);
    const assignedChef = eligibleChefs[Math.floor(Math.random() * eligibleChefs.length)];

    // Calculate total preparation time
    let totalPrepTime = 0;
    const populatedItems = [];

    for (let item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem) {
        return res.status(400).json({ 
          success: false, 
          message: `Menu item ${item.menuItemId} not found` 
        });
      }

      totalPrepTime = Math.max(totalPrepTime, menuItem.averagePreparationTime);
      
      populatedItems.push({
        menuItemId: item.menuItemId,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions || '',
      });
    }

    const grandTotal = itemTotal + deliveryCharge + taxes;

    let tableNumber = null;
    let assignedTable = null;

    // Assign table for dine-in orders
    if (orderType === 'dineIn' && customerDetails.numberOfMembers) {
      assignedTable = await Table.findOne({
        status: 'available',
        chairCount: { $gte: customerDetails.numberOfMembers },
      }).sort('chairCount');

      if (!assignedTable) {
        return res.status(400).json({ 
          success: false, 
          message: 'No available table for this party size' 
        });
      }

      tableNumber = assignedTable.tableNumber;
    }

    // Create order
    const order = await Order.create({
      orderId,
      orderType,
      tableNumber,
      items: populatedItems,
      customerDetails,
      itemTotal,
      deliveryCharge,
      taxes,
      grandTotal,
      assignedChef: assignedChef._id,
      processingTime: totalPrepTime,
    });

    // Update chef order count
    await assignedChef.assignOrder();

    // Reserve table if dine-in
    if (assignedTable) {
      await assignedTable.reserve(order._id);
    }

    // Create or update customer
    let customer = await Customer.findOne({ phone: customerDetails.phone });
    if (customer) {
      customer.name = customerDetails.name;
      customer.orderHistory.push(order._id);
      await customer.save();
    } else {
      await Customer.create({
        name: customerDetails.name,
        phone: customerDetails.phone,
        orderHistory: [order._id],
      });
    }

    const populatedOrder = await Order.findById(order._id)
      .populate('assignedChef', 'name');

    res.status(201).json({ success: true, data: populatedOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id).populate('assignedChef');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const oldStatus = order.status;
    order.status = status;

    if (status === 'done' || status === 'served' || status === 'notPickedUp') {
      order.endTime = new Date();
      
      // Decrease chef's current order count and increase completed count
      if (order.assignedChef) {
        await order.assignedChef.completeOrder();
      }

      // Free table if dine-in and status is served
      if (order.orderType === 'dineIn' && status === 'served' && order.tableNumber) {
        const table = await Table.findOne({ tableNumber: order.tableNumber });
        if (table) {
          await table.free();
        }
      }
    }

    await order.save();

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete order (admin only)
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    await order.deleteOne();
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};