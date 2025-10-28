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

const categories = [
  'Burger', 'Pizza', 'Drink', 'French Fries', 'Veggies',
  'Pasta', 'Sandwich', 'Soup', 'Dessert', 'Seafood',
  'Chicken', 'Beef', 'Noodles', 'Rice', 'Salad',
  'Breakfast', 'Snacks', 'Ice Cream', 'Coffee'
];

const menuData = {
  'Burger': [
    { name: 'Classic Beef Burger', description: 'Juicy beef patty with lettuce, tomato, onion, and special sauce', price: 250, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', time: 12 },
    { name: 'Chicken Deluxe Burger', description: 'Grilled chicken breast with cheese, bacon, and avocado', price: 280, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop', time: 15 },
    { name: 'Veggie Burger', description: 'Plant-based patty with fresh vegetables and vegan mayo', price: 220, image: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop', time: 10 },
    { name: 'BBQ Bacon Burger', description: 'Beef patty with BBQ sauce, crispy bacon, and onion rings', price: 320, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop', time: 18 },
    { name: 'Double Cheese Burger', description: 'Two beef patties with double cheese and special sauce', price: 350, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', time: 20 }
  ]
};// Continue adding more burger items
const addMoreBurgerItems = () => [
  { name: 'Mushroom Swiss Burger', description: 'Beef patty with sautéed mushrooms and Swiss cheese', price: 290, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop', time: 16 },
  { name: 'Spicy Jalapeño Burger', description: 'Beef patty with jalapeños, pepper jack cheese, and spicy mayo', price: 300, image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop', time: 14 },
  { name: 'Turkey Burger', description: 'Lean turkey patty with cranberry sauce and lettuce', price: 260, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop', time: 13 },
  { name: 'Fish Burger', description: 'Crispy fish fillet with tartar sauce and lettuce', price: 270, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop', time: 15 },
  { name: 'Lamb Burger', description: 'Seasoned lamb patty with mint yogurt sauce', price: 340, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', time: 18 },
  { name: 'Breakfast Burger', description: 'Beef patty with fried egg, bacon, and hash browns', price: 330, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', time: 20 },
  { name: 'Hawaiian Burger', description: 'Beef patty with grilled pineapple and teriyaki sauce', price: 310, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop', time: 16 },
  { name: 'Blue Cheese Burger', description: 'Beef patty with blue cheese crumbles and caramelized onions', price: 320, image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop', time: 17 },
  { name: 'Avocado Burger', description: 'Beef patty with fresh avocado, sprouts, and chipotle mayo', price: 290, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop', time: 14 },
  { name: 'Tex-Mex Burger', description: 'Beef patty with salsa, guacamole, and pepper jack cheese', price: 310, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop', time: 16 },
  { name: 'Mediterranean Burger', description: 'Beef patty with feta cheese, olives, and tzatziki', price: 300, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', time: 15 },
  { name: 'Buffalo Chicken Burger', description: 'Spicy buffalo chicken with blue cheese dressing', price: 280, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', time: 14 },
  { name: 'Portobello Burger', description: 'Grilled portobello mushroom with balsamic glaze', price: 240, image: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop', time: 12 },
  { name: 'Quinoa Burger', description: 'Healthy quinoa patty with mixed vegetables', price: 230, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop', time: 11 },
  { name: 'Black Bean Burger', description: 'Spiced black bean patty with cilantro lime mayo', price: 220, image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop', time: 10 },
  { name: 'Salmon Burger', description: 'Grilled salmon patty with dill sauce', price: 350, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop', time: 18 },
  { name: 'Bison Burger', description: 'Lean bison patty with caramelized onions', price: 380, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop', time: 20 },
  { name: 'Elk Burger', description: 'Wild elk patty with juniper berry sauce', price: 400, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', time: 22 },
  { name: 'Wagyu Burger', description: 'Premium wagyu beef with truffle aioli', price: 500, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', time: 25 },
  { name: 'Mini Sliders', description: 'Three mini beef burgers with different toppings', price: 280, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop', time: 15 }
];

const pizzaItems = [
  { name: 'Margherita Pizza', description: 'Classic pizza with fresh mozzarella, tomatoes, and basil', price: 180, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop', time: 20 },
  { name: 'Pepperoni Supreme', description: 'Loaded with pepperoni, cheese, and Italian herbs', price: 240, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop', time: 22 },
  { name: 'Veggie Supreme', description: 'Bell peppers, mushrooms, olives, onions, and tomatoes', price: 200, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', time: 20 },
  { name: 'Meat Lovers Pizza', description: 'Pepperoni, sausage, bacon, and ham with extra cheese', price: 300, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop', time: 25 },
  { name: 'Hawaiian Pizza', description: 'Ham and pineapple with mozzarella cheese', price: 220, image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop', time: 20 }
];

const addMorePizzaItems = () => [
  { name: 'BBQ Chicken Pizza', description: 'BBQ sauce, grilled chicken, red onions, and cilantro', price: 260, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop', time: 22 },
  { name: 'White Pizza', description: 'Ricotta, mozzarella, garlic, and fresh herbs', price: 200, image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop', time: 18 },
  { name: 'Buffalo Chicken Pizza', description: 'Spicy buffalo chicken with blue cheese drizzle', price: 270, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', time: 23 },
  { name: 'Mediterranean Pizza', description: 'Feta cheese, olives, sun-dried tomatoes, and spinach', price: 250, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop', time: 21 },
  { name: 'Mushroom Truffle Pizza', description: 'Mixed mushrooms with truffle oil and parmesan', price: 320, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop', time: 24 },
  { name: 'Prosciutto Arugula Pizza', description: 'Prosciutto, arugula, and fresh mozzarella', price: 290, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop', time: 22 },
  { name: 'Four Cheese Pizza', description: 'Mozzarella, parmesan, gorgonzola, and ricotta', price: 280, image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop', time: 20 },
  { name: 'Spicy Salami Pizza', description: 'Spicy salami with hot peppers and mozzarella', price: 260, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop', time: 21 },
  { name: 'Seafood Pizza', description: 'Shrimp, calamari, and mussels with garlic', price: 350, image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop', time: 26 },
  { name: 'Pesto Chicken Pizza', description: 'Pesto sauce, grilled chicken, and sun-dried tomatoes', price: 270, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', time: 22 }
];