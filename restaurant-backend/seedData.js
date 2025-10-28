const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./src/config/db');
const Chef = require('./src/models/Chef');
const Table = require('./src/models/Table');
const MenuItem = require('./src/models/MenuItem');

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await Chef.deleteMany({});
    await Table.deleteMany({});
    await MenuItem.deleteMany({});

    // Seed 4 chefs
    console.log('👨‍🍳 Seeding chefs...');
    const chefs = await Chef.create([
      { name: 'Manesh', currentOrderCount: 0, ordersCompleted: 0 },
      { name: 'Pritam', currentOrderCount: 0, ordersCompleted: 0 },
      { name: 'Yash', currentOrderCount: 0, ordersCompleted: 0 },
      { name: 'Tenzen', currentOrderCount: 0, ordersCompleted: 0 },
    ]);
    console.log(`✅ Created ${chefs.length} chefs`);

    // Seed 30 tables
    console.log('🪑 Seeding tables...');
    const tables = [];
    for (let i = 1; i <= 30; i++) {
      const chairOptions = [2, 4, 6, 8];
      tables.push({
        tableNumber: i,
        chairCount: chairOptions[Math.floor(Math.random() * chairOptions.length)],
        status: 'available',
      });
    }
    await Table.create(tables);
    console.log(`✅ Created ${tables.length} tables`);

    // Seed menu items
    console.log('🍔 Seeding menu items...');
    const menuItems = [
      // Burgers
      {
        name: 'Classic Burger',
        description: 'Juicy beef patty with lettuce, tomato, and special sauce',
        price: 199,
        averagePreparationTime: 15,
        category: 'Burger',
        inStock: true,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      },
      {
        name: 'Cheese Burger',
        description: 'Double cheese with crispy bacon',
        price: 249,
        averagePreparationTime: 18,
        category: 'Burger',
        inStock: true,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400',
      },
      {
        name: 'Chicken Burger',
        description: 'Grilled chicken breast with mayo',
        price: 189,
        averagePreparationTime: 15,
        category: 'Burger',
        inStock: true,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
      },
      {
        name: 'Veggie Burger',
        description: 'Plant-based patty with fresh veggies',
        price: 169,
        averagePreparationTime: 12,
        category: 'Burger',
        inStock: true,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400',
      },

      // Pizzas
      {
        name: 'Margherita Pizza',
        description: 'Classic tomato sauce, mozzarella, and basil',
        price: 299,
        averagePreparationTime: 20,
        category: 'Pizza',
        inStock: true,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
      },
      {
        name: 'Pepperoni Pizza',
        description: 'Loaded with pepperoni and extra cheese',
        price: 349,
        averagePreparationTime: 22,
        category: 'Pizza',
        inStock: true,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
      },
      {
        name: 'Veggie Supreme',
        description: 'Bell peppers, onions, mushrooms, and olives',
        price: 329,
        averagePreparationTime: 20,
        category: 'Pizza',
        inStock: true,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=400',
      },

      // Drinks
      {
        name: 'Coca-Cola',
        description: 'Chilled Coca-Cola 500ml',
        price: 60,
        averagePreparationTime: 2,
        category: 'Drink',
        inStock: true,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
      },
      {
        name: 'Fresh Lemonade',
        description: 'Freshly squeezed lemon juice',
        price: 80,
        averagePreparationTime: 5,
        category: 'Drink',
        inStock: true,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1523677011781-c91d1ebb6a0e?w=400',
      },
      {
        name: 'Mango Smoothie',
        description: 'Fresh mango blended with yogurt',
        price: 120,
        averagePreparationTime: 5,
        category: 'Drink',
        inStock: true,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400',
      },
      {
        name: 'Iced Coffee',
        description: 'Cold brew coffee with ice',
        price: 100,
        averagePreparationTime: 3,
        category: 'Drink',
        inStock: true,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
      },

      // French Fries
      {
        name: 'Classic Fries',
        description: 'Golden crispy french fries',
        price: 99,
        averagePreparationTime: 8,
        category: 'French Fries',
        inStock: true,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
      },
      {
        name: 'Cheese Fries',
        description: 'Fries topped with melted cheese',
        price: 149,
        averagePreparationTime: 10,
        category: 'French Fries',
        inStock: true,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1630384082147-4c7e17cd7a91?w=400',
      },
      {
        name: 'Loaded Fries',
        description: 'Fries with cheese, bacon, and sour cream',
        price: 199,
        averagePreparationTime: 12,
        category: 'French Fries',
        inStock: true,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400',
      },

      // Veggies
      {
        name: 'Garden Salad',
        description: 'Fresh mixed greens with vinaigrette',
        price: 129,
        averagePreparationTime: 5,
        category: 'Veggies',
        inStock: true,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      },
      {
        name: 'Grilled Vegetables',
        description: 'Seasonal vegetables grilled to perfection',
        price: 159,
        averagePreparationTime: 10,
        category: 'Veggies',
        inStock: true,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400',
      },
      {
        name: 'Veggie Wrap',
        description: 'Whole wheat wrap with hummus and veggies',
        price: 149,
        averagePreparationTime: 8,
        category: 'Veggies',
        inStock: true,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400',
      },
    ];

    await MenuItem.create(menuItems);
    console.log(`✅ Created ${menuItems.length} menu items`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();