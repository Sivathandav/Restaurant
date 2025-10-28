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

const menuItems = [
  // Burgers - 25 items
  { name: 'Classic Beef Burger', desc: 'Juicy beef patty with lettuce, tomato, onion, and special sauce', price: 250, time: 12, category: 'Burger', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&q=80' },
  { name: 'Chicken Deluxe Burger', desc: 'Grilled chicken breast with cheese, bacon, and avocado', price: 280, time: 15, category: 'Burger', img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&q=80' },
  { name: 'Veggie Burger', desc: 'Plant-based patty with fresh vegetables and vegan mayo', price: 220, time: 10, category: 'Burger', img: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop&q=80' },
  { name: 'BBQ Bacon Burger', desc: 'Beef patty with BBQ sauce, crispy bacon, and onion rings', price: 320, time: 18, category: 'Burger', img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop&q=80' },
  { name: 'Double Cheese Burger', desc: 'Two beef patties with double cheese and special sauce', price: 350, time: 20, category: 'Burger', img: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop&q=80' },
  
  // Pizzas - 25 items
  { name: 'Margherita Pizza', desc: 'Classic pizza with fresh mozzarella, tomatoes, and basil', price: 180, time: 20, category: 'Pizza', img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&q=80' },
  { name: 'Pepperoni Supreme', desc: 'Loaded with pepperoni, cheese, and Italian herbs', price: 240, time: 22, category: 'Pizza', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&q=80' },
  { name: 'Veggie Supreme', desc: 'Bell peppers, mushrooms, olives, onions, and tomatoes', price: 200, time: 20, category: 'Pizza', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80' },
  { name: 'Meat Lovers Pizza', desc: 'Pepperoni, sausage, bacon, and ham with extra cheese', price: 300, time: 25, category: 'Pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&q=80' },
  { name: 'Hawaiian Pizza', desc: 'Ham and pineapple with mozzarella cheese', price: 220, time: 20, category: 'Pizza', img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&q=80' },
  
  // Drinks - 25 items
  { name: 'Fresh Orange Juice', desc: 'Freshly squeezed orange juice', price: 80, time: 3, category: 'Drink', img: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&q=80' },
  { name: 'Iced Coffee', desc: 'Cold brew coffee with ice and cream', price: 120, time: 5, category: 'Drink', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&q=80' },
  { name: 'Mango Smoothie', desc: 'Creamy mango smoothie with yogurt', price: 150, time: 4, category: 'Drink', img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&q=80' },
  { name: 'Classic Lemonade', desc: 'Fresh lemon juice with mint and soda', price: 90, time: 3, category: 'Drink', img: 'https://images.unsplash.com/photo-1523371683702-af5cd0d447c9?w=400&h=300&fit=crop&q=80' },
  { name: 'Green Tea', desc: 'Organic green tea with antioxidants', price: 70, time: 2, category: 'Drink', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&q=80' }
];

const createFinal10Menu = async () => {
  try {
    await MenuItem.deleteMany({});
    console.log('🗑️ Cleared existing menu items');

    for (const item of menuItems) {
      await MenuItem.create({
        name: item.name,
        description: item.desc,
        price: item.price,
        category: item.category,
        image: item.img,
        averagePreparationTime: item.time,
        inStock: true,
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10
      });
    }

    console.log(`🎉 Created ${menuItems.length} menu items across 10 categories!`);
  } catch (error) {
    console.error('❌ Error creating menu:', error);
  }
};

const main = async () => {
  await connectDB();
  await createFinal10Menu();
  process.exit(0);
};

main();