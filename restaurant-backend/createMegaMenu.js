const mongoose = require('mongoose');
const MenuItem = require('./src/models/MenuItem');
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

const createMegaMenu = async () => {
  try {
    // Clear existing items
    await MenuItem.deleteMany({});
    console.log('🗑️ Cleared existing menu items');

    const categories = [
      'Burger', 'Pizza', 'Drink', 'French Fries', 'Veggies',
      'Pasta', 'Sandwich', 'Soup', 'Dessert', 'Seafood',
      'Chicken', 'Beef', 'Noodles', 'Rice', 'Salad',
      'Breakfast', 'Snacks', 'Ice Cream', 'Coffee'
    ];

    let totalItems = 0;

    for (const category of categories) {
      const items = generateItemsForCategory(category);
      
      for (const itemData of items) {
        await MenuItem.create({
          ...itemData,
          category,
          inStock: true,
          rating: Math.round((Math.random() * 2 + 3) * 10) / 10 // 3.0 to 5.0
        });
        totalItems++;
      }
      
      console.log(`✅ Created ${items.length} items for ${category}`);
    }

    console.log(`🎉 Created ${totalItems} total menu items across ${categories.length} categories!`);
  } catch (error) {
    console.error('❌ Error creating mega menu:', error);
  }
};

function generateItemsForCategory(category) {
  const baseImages = {
    'Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    'Pizza': 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3',
    'Drink': 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b',
    'French Fries': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877',
    'Veggies': 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
    'Pasta': 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5',
    'Sandwich': 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586',
    'Soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    'Dessert': 'https://images.unsplash.com/photo-1551024506-0bccd828d307',
    'Seafood': 'https://images.unsplash.com/photo-1559847844-d721426d6edc',
    'Chicken': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6',
    'Beef': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d',
    'Noodles': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
    'Rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
    'Salad': 'https://images.unsplash.com/photo-1540420773420-3366772f4999',
    'Breakfast': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666',
    'Snacks': 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087',
    'Ice Cream': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
    'Coffee': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735'
  };

  const baseImage = baseImages[category] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c';
  
  return getItemsForCategory(category, baseImage);
}

function getItemsForCategory(category, baseImage) {
  const items = [];
  const variations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  switch (category) {
    case 'Burger':
      return getBurgerItems(baseImage);
    case 'Pizza':
      return getPizzaItems(baseImage);
    case 'Drink':
      return getDrinkItems(baseImage);
    case 'French Fries':
      return getFriesItems(baseImage);
    case 'Veggies':
      return getVeggieItems(baseImage);
    default:
      return getGenericItems(category, baseImage);
  }
}

function getBurgerItems(baseImage) {
  return [
    { name: 'Classic Beef Burger', description: 'Juicy beef patty with lettuce, tomato, onion, and special sauce', price: 250, image: `${baseImage}?w=400&h=300&fit=crop&q=80&auto=format`, averagePreparationTime: 12 },
    { name: 'Chicken Deluxe Burger', description: 'Grilled chicken breast with cheese, bacon, and avocado', price: 280, image: `${baseImage}?w=400&h=300&fit=crop&q=80&auto=format&sig=1`, averagePreparationTime: 15 },
    { name: 'Veggie Burger', description: 'Plant-based patty with fresh vegetables and vegan mayo', price: 220, image: `${baseImage}?w=400&h=300&fit=crop&q=80&auto=format&sig=2`, averagePreparationTime: 10 }
  ];
}