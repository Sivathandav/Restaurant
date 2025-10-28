const mongoose = require('mongoose');
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

const addMoreMenuItems = async () => {
  try {
    const newMenuItems = [
      // Burgers
      {
        name: 'Classic Beef Burger',
        description: 'Juicy beef patty with lettuce, tomato, onion, and special sauce',
        price: 250,
        category: 'Burger',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
        averagePreparationTime: 12,
        inStock: true,
        rating: 4.5
      },
      {
        name: 'Chicken Deluxe Burger',
        description: 'Grilled chicken breast with cheese, bacon, and avocado',
        price: 280,
        category: 'Burger',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
        averagePreparationTime: 15,
        inStock: true,
        rating: 4.7
      },
      {
        name: 'Veggie Burger',
        description: 'Plant-based patty with fresh vegetables and vegan mayo',
        price: 220,
        category: 'Burger',
        image: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop',
        averagePreparationTime: 10,
        inStock: true,
        rating: 4.2
      },
      {
        name: 'BBQ Bacon Burger',
        description: 'Beef patty with BBQ sauce, crispy bacon, and onion rings',
        price: 320,
        category: 'Burger',
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop',
        averagePreparationTime: 18,
        inStock: true,
        rating: 4.8
      },

      // More Pizzas
      {
        name: 'Margherita Pizza',
        description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
        price: 180,
        category: 'Pizza',
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
        averagePreparationTime: 20,
        inStock: true,
        rating: 4.6
      },
      {
        name: 'Pepperoni Supreme',
        description: 'Loaded with pepperoni, cheese, and Italian herbs',
        price: 240,
        category: 'Pizza',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
        averagePreparationTime: 22,
        inStock: true,
        rating: 4.7
      },
      {
        name: 'Veggie Supreme',
        description: 'Bell peppers, mushrooms, olives, onions, and tomatoes',
        price: 200,
        category: 'Pizza',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        averagePreparationTime: 20,
        inStock: true,
        rating: 4.4
      },
      {
        name: 'Meat Lovers Pizza',
        description: 'Pepperoni, sausage, bacon, and ham with extra cheese',
        price: 300,
        category: 'Pizza',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
        averagePreparationTime: 25,
        inStock: true,
        rating: 4.9
      },

      // Drinks
      {
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        price: 80,
        category: 'Drink',
        image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
        averagePreparationTime: 3,
        inStock: true,
        rating: 4.3
      },
      {
        name: 'Iced Coffee',
        description: 'Cold brew coffee with ice and cream',
        price: 120,
        category: 'Drink',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
        averagePreparationTime: 5,
        inStock: true,
        rating: 4.5
      },
      {
        name: 'Mango Smoothie',
        description: 'Creamy mango smoothie with yogurt',
        price: 150,
        category: 'Drink',
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop',
        averagePreparationTime: 4,
        inStock: true,
        rating: 4.6
      },
      {
        name: 'Classic Lemonade',
        description: 'Fresh lemon juice with mint and soda',
        price: 90,
        category: 'Drink',
        image: 'https://images.unsplash.com/photo-1523371683702-af5cd0d447c9?w=400&h=300&fit=crop',
        averagePreparationTime: 3,
        inStock: true,
        rating: 4.2
      },

      // French Fries
      {
        name: 'Classic French Fries',
        description: 'Golden crispy fries with salt',
        price: 100,
        category: 'French Fries',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
        averagePreparationTime: 8,
        inStock: true,
        rating: 4.4
      },
      {
        name: 'Cheese Fries',
        description: 'Crispy fries topped with melted cheese',
        price: 140,
        category: 'French Fries',
        image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&h=300&fit=crop',
        averagePreparationTime: 10,
        inStock: true,
        rating: 4.6
      },
      {
        name: 'Loaded Fries',
        description: 'Fries with cheese, bacon bits, and sour cream',
        price: 180,
        category: 'French Fries',
        image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop',
        averagePreparationTime: 12,
        inStock: true,
        rating: 4.8
      },
      {
        name: 'Sweet Potato Fries',
        description: 'Crispy sweet potato fries with herbs',
        price: 130,
        category: 'French Fries',
        image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop',
        averagePreparationTime: 10,
        inStock: true,
        rating: 4.5
      },

      // Veggies
      {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing and croutons',
        price: 160,
        category: 'Veggies',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
        averagePreparationTime: 8,
        inStock: true,
        rating: 4.3
      },
      {
        name: 'Greek Salad',
        description: 'Mixed greens with feta cheese, olives, and tomatoes',
        price: 180,
        category: 'Veggies',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
        averagePreparationTime: 10,
        inStock: true,
        rating: 4.5
      },
      {
        name: 'Grilled Vegetables',
        description: 'Seasonal vegetables grilled to perfection',
        price: 140,
        category: 'Veggies',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
        averagePreparationTime: 15,
        inStock: true,
        rating: 4.2
      },
      {
        name: 'Avocado Toast',
        description: 'Toasted bread with fresh avocado and herbs',
        price: 120,
        category: 'Veggies',
        image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
        averagePreparationTime: 6,
        inStock: true,
        rating: 4.4
      }
    ];

    // Clear existing items and add new ones
    await MenuItem.deleteMany({});
    console.log('🗑️ Cleared existing menu items');

    for (let itemData of newMenuItems) {
      const item = await MenuItem.create(itemData);
      console.log(`✅ Created ${item.name}`);
    }

    console.log(`🎉 Added ${newMenuItems.length} menu items with images!`);
  } catch (error) {
    console.error('❌ Error adding menu items:', error);
  }
};

const main = async () => {
  await connectDB();
  await addMoreMenuItems();
  process.exit(0);
};

main();