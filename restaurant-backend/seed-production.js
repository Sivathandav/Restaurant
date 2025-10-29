const mongoose = require('mongoose');
const MenuItem = require('./src/models/MenuItem');
const Chef = require('./src/models/Chef');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant');
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Essential menu data for production
const menuData = {
  'Burger': [
    { name: 'Classic Beef Burger', desc: 'Juicy beef patty with lettuce, tomato, onion, and special sauce', price: 250, time: 12, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&q=80' },
    { name: 'Chicken Deluxe Burger', desc: 'Grilled chicken breast with cheese, bacon, and avocado', price: 280, time: 15, img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&q=80' },
    { name: 'Veggie Burger', desc: 'Plant-based patty with fresh vegetables and vegan mayo', price: 220, time: 10, img: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop&q=80' },
    { name: 'BBQ Bacon Burger', desc: 'Beef patty with BBQ sauce, crispy bacon, and onion rings', price: 320, time: 18, img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop&q=80' },
    { name: 'Double Cheese Burger', desc: 'Two beef patties with double cheese and special sauce', price: 350, time: 20, img: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop&q=80' }
  ],
  'Pizza': [
    { name: 'Margherita Pizza', desc: 'Classic pizza with fresh mozzarella, tomatoes, and basil', price: 180, time: 20, img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&q=80' },
    { name: 'Pepperoni Supreme', desc: 'Loaded with pepperoni, cheese, and Italian herbs', price: 240, time: 22, img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&q=80' },
    { name: 'Veggie Supreme', desc: 'Bell peppers, mushrooms, olives, onions, and tomatoes', price: 200, time: 20, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80' },
    { name: 'Meat Lovers Pizza', desc: 'Pepperoni, sausage, bacon, and ham with extra cheese', price: 300, time: 25, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&q=80' },
    { name: 'Hawaiian Pizza', desc: 'Ham and pineapple with mozzarella cheese', price: 220, time: 20, img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&q=80' }
  ],
  'Pasta': [
    { name: 'Spaghetti Carbonara', desc: 'Classic Italian pasta with eggs, bacon, and parmesan', price: 240, time: 18, img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop&q=80' },
    { name: 'Fettuccine Alfredo', desc: 'Creamy alfredo sauce with parmesan cheese', price: 220, time: 16, img: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop&q=80' },
    { name: 'Penne Arrabbiata', desc: 'Spicy tomato sauce with garlic and chili', price: 200, time: 15, img: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop&q=80' },
    { name: 'Lasagna Bolognese', desc: 'Layered pasta with meat sauce and cheese', price: 280, time: 35, img: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop&q=80' },
    { name: 'Pesto Linguine', desc: 'Fresh basil pesto with pine nuts', price: 190, time: 14, img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&q=80' }
  ],
  'Salads': [
    { name: 'Caesar Salad', desc: 'Romaine lettuce with caesar dressing and croutons', price: 140, time: 8, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80' },
    { name: 'Greek Salad', desc: 'Mixed greens with feta, olives, and tomatoes', price: 150, time: 10, img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&q=80' },
    { name: 'Cobb Salad', desc: 'Mixed greens with bacon, egg, and blue cheese', price: 180, time: 12, img: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=300&fit=crop&q=80' },
    { name: 'Quinoa Salad', desc: 'Quinoa with roasted vegetables and vinaigrette', price: 160, time: 10, img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&q=80' },
    { name: 'Spinach Salad', desc: 'Baby spinach with strawberries and goat cheese', price: 140, time: 8, img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop&q=80' }
  ],
  'Sandwich': [
    { name: 'Club Sandwich', desc: 'Triple-decker with turkey, bacon, lettuce, and tomato', price: 180, time: 10, img: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=400&h=300&fit=crop&q=80' },
    { name: 'BLT Sandwich', desc: 'Bacon, lettuce, and tomato on toasted bread', price: 150, time: 8, img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop&q=80' },
    { name: 'Grilled Cheese', desc: 'Classic grilled cheese with cheddar and mozzarella', price: 130, time: 7, img: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&h=300&fit=crop&q=80' },
    { name: 'Philly Cheesesteak', desc: 'Sliced steak with peppers, onions, and cheese', price: 240, time: 14, img: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop&q=80' },
    { name: 'Turkey Avocado Sandwich', desc: 'Roasted turkey with avocado and sprouts', price: 170, time: 9, img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop&q=80' }
  ],
  'Desserts': [
    { name: 'Chocolate Lava Cake', desc: 'Warm chocolate cake with molten center', price: 180, time: 15, img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&q=80' },
    { name: 'Tiramisu', desc: 'Classic Italian dessert with coffee and mascarpone', price: 160, time: 5, img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&q=80' },
    { name: 'Cheesecake', desc: 'New York style cheesecake with berry compote', price: 150, time: 5, img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop&q=80' },
    { name: 'Crème Brûlée', desc: 'Vanilla custard with caramelized sugar top', price: 170, time: 8, img: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400&h=300&fit=crop&q=80' },
    { name: 'Gelato Trio', desc: 'Three scoops of artisanal gelato', price: 120, time: 3, img: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop&q=80' }
  ]
};

const chefData = [
  { name: 'Chef Mario', currentOrderCount: 0, ordersCompleted: 0, isActive: true },
  { name: 'Chef Luigi', currentOrderCount: 0, ordersCompleted: 0, isActive: true },
  { name: 'Chef Giuseppe', currentOrderCount: 0, ordersCompleted: 0, isActive: true },
  { name: 'Chef Anna', currentOrderCount: 0, ordersCompleted: 0, isActive: true }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await MenuItem.deleteMany({});
    await Chef.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Seed menu items
    let totalItems = 0;
    for (const [category, items] of Object.entries(menuData)) {
      for (const item of items) {
        await MenuItem.create({
          name: item.name,
          description: item.desc,
          price: item.price,
          category,
          image: item.img,
          averagePreparationTime: item.time,
          inStock: true,
          rating: Math.round((Math.random() * 2 + 3) * 10) / 10
        });
        totalItems++;
      }
      console.log(`✅ Created ${items.length} items for ${category}`);
    }

    // Seed chefs
    const createdChefs = await Chef.insertMany(chefData);
    console.log(`✅ Created ${createdChefs.length} chefs`);

    console.log(`🎉 Production database seeded successfully!`);
    console.log(`📊 Total menu items: ${totalItems}`);
    console.log(`👨‍🍳 Total chefs: ${createdChefs.length}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

const main = async () => {
  await connectDB();
  await seedDatabase();
  process.exit(0);
};

main();