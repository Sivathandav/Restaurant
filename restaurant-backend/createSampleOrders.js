const mongoose = require('mongoose');
const Order = require('./src/models/Order');
const Chef = require('./src/models/Chef');
const MenuItem = require('./src/models/MenuItem');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const createSampleOrders = async () => {
  try {
    // Get some menu items and chefs
    const menuItems = await MenuItem.find().limit(5);
    const chefs = await Chef.find();
    
    if (menuItems.length === 0 || chefs.length === 0) {
      console.log('❌ No menu items or chefs found. Please run seed script first.');
      return;
    }

    const sampleOrders = [
      {
        orderType: 'dineIn',
        tableNumber: 5,
        items: [
          {
            menuItemId: menuItems[0]._id,
            name: menuItems[0].name,
            price: menuItems[0].price,
            quantity: 1,
            specialInstructions: ''
          },
          {
            menuItemId: menuItems[1]._id,
            name: menuItems[1].name,
            price: menuItems[1].price,
            quantity: 2,
            specialInstructions: 'Extra spicy'
          }
        ],
        customerDetails: {
          name: 'John Doe',
          phone: '1234567890',
          numberOfMembers: 2
        },
        itemTotal: menuItems[0].price + (menuItems[1].price * 2),
        deliveryCharge: 0,
        taxes: 50,
        assignedChef: chefs[0]._id,
        processingTime: 15,
        status: 'processing'
      },
      {
        orderType: 'takeaway',
        items: [
          {
            menuItemId: menuItems[2]._id,
            name: menuItems[2].name,
            price: menuItems[2].price,
            quantity: 1,
            specialInstructions: ''
          }
        ],
        customerDetails: {
          name: 'Jane Smith',
          phone: '0987654321'
        },
        itemTotal: menuItems[2].price,
        deliveryCharge: 30,
        taxes: 25,
        assignedChef: chefs[1]._id,
        processingTime: 10,
        status: 'done'
      },
      {
        orderType: 'dineIn',
        tableNumber: 3,
        items: [
          {
            menuItemId: menuItems[3]._id,
            name: menuItems[3].name,
            price: menuItems[3].price,
            quantity: 3,
            specialInstructions: 'No onions'
          }
        ],
        customerDetails: {
          name: 'Bob Wilson',
          phone: '5555555555',
          numberOfMembers: 3
        },
        itemTotal: menuItems[3].price * 3,
        deliveryCharge: 0,
        taxes: 75,
        assignedChef: chefs[2]._id,
        processingTime: 20,
        status: 'processing'
      },
      {
        orderType: 'takeaway',
        items: [
          {
            menuItemId: menuItems[4]._id,
            name: menuItems[4].name,
            price: menuItems[4].price,
            quantity: 2,
            specialInstructions: ''
          }
        ],
        customerDetails: {
          name: 'Alice Brown',
          phone: '7777777777'
        },
        itemTotal: menuItems[4].price * 2,
        deliveryCharge: 30,
        taxes: 40,
        assignedChef: chefs[3]._id,
        processingTime: 12,
        status: 'notPickedUp'
      }
    ];

    // Create orders with proper order IDs
    for (let orderData of sampleOrders) {
      const orderId = await Order.generateOrderId();
      orderData.orderId = orderId;
      orderData.grandTotal = orderData.itemTotal + orderData.deliveryCharge + orderData.taxes;
      
      // Set start time for processing orders
      if (orderData.status === 'processing') {
        orderData.startTime = new Date(Date.now() - Math.random() * 10 * 60 * 1000); // Random time within last 10 minutes
      }
      
      const order = await Order.create(orderData);
      console.log(`✅ Created order ${order.orderId}`);
    }

    console.log('🎉 Sample orders created successfully!');
  } catch (error) {
    console.error('❌ Error creating sample orders:', error);
  }
};

const main = async () => {
  await connectDB();
  await createSampleOrders();
  process.exit(0);
};

main();