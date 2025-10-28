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

// Better approach: Use different image services and techniques
const getUniqueImage = (category, index) => {
  const imageServices = [
    'https://images.unsplash.com',
    'https://source.unsplash.com',
    'https://picsum.photos'
  ];
  
  const categoryKeywords = {
    'Burger': ['burger', 'hamburger', 'cheeseburger', 'sandwich'],
    'Pizza': ['pizza', 'margherita', 'pepperoni', 'italian'],
    'Drink': ['drink', 'beverage', 'juice', 'smoothie'],
    'French Fries': ['fries', 'potato', 'chips', 'snack'],
    'Veggies': ['salad', 'vegetables', 'healthy', 'greens'],
    'Pasta': ['pasta', 'spaghetti', 'noodles', 'italian'],
    'Sandwich': ['sandwich', 'sub', 'panini', 'wrap'],
    'Soup': ['soup', 'bowl', 'broth', 'warm'],
    'Dessert': ['dessert', 'cake', 'sweet', 'chocolate'],
    'Seafood': ['fish', 'seafood', 'salmon', 'shrimp'],
    'Chicken': ['chicken', 'poultry', 'grilled', 'fried'],
    'Beef': ['beef', 'steak', 'meat', 'grilled'],
    'Noodles': ['noodles', 'ramen', 'asian', 'bowl'],
    'Rice': ['rice', 'grain', 'bowl', 'asian'],
    'Salad': ['salad', 'fresh', 'healthy', 'bowl'],
    'Breakfast': ['breakfast', 'morning', 'eggs', 'pancakes'],
    'Snacks': ['snacks', 'appetizer', 'finger', 'small'],
    'Ice Cream': ['ice-cream', 'dessert', 'cold', 'sweet'],
    'Coffee': ['coffee', 'espresso', 'latte', 'hot']
  };

  const keywords = categoryKeywords[category] || ['food'];
  const keyword = keywords[index % keywords.length];
  
  // Use different approaches for variety
  const approaches = [
    `https://images.unsplash.com/photo-${1500000000000 + (index * 1000)}?w=400&h=300&fit=crop&q=80`,
    `https://source.unsplash.com/400x300/?${keyword}&${index}`,
    `https://picsum.photos/400/300?random=${category}-${index}`,
    `https://images.unsplash.com/search/photos?query=${keyword}&w=400&h=300&fit=crop&q=80&sig=${index}`
  ];
  
  return approaches[index % approaches.length];
};

// Real food data with better variety
const realMenuData = {
  'Burger': [
    { name: 'Classic Beef Burger', desc: 'Juicy beef patty with lettuce, tomato, onion, and special sauce', price: 250, time: 12 },
    { name: 'Chicken Deluxe Burger', desc: 'Grilled chicken breast with cheese, bacon, and avocado', price: 280, time: 15 },
    { name: 'Veggie Burger', desc: 'Plant-based patty with fresh vegetables and vegan mayo', price: 220, time: 10 },
    { name: 'BBQ Bacon Burger', desc: 'Beef patty with BBQ sauce, crispy bacon, and onion rings', price: 320, time: 18 },
    { name: 'Double Cheese Burger', desc: 'Two beef patties with double cheese and special sauce', price: 350, time: 20 },
    { name: 'Mushroom Swiss Burger', desc: 'Beef patty with sautéed mushrooms and Swiss cheese', price: 290, time: 16 },
    { name: 'Spicy Jalapeño Burger', desc: 'Beef patty with jalapeños, pepper jack cheese, and spicy mayo', price: 300, time: 14 },
    { name: 'Turkey Burger', desc: 'Lean turkey patty with cranberry sauce and lettuce', price: 260, time: 13 },
    { name: 'Fish Burger', desc: 'Crispy fish fillet with tartar sauce and lettuce', price: 270, time: 15 },
    { name: 'Lamb Burger', desc: 'Seasoned lamb patty with mint yogurt sauce', price: 340, time: 18 },
    { name: 'Breakfast Burger', desc: 'Beef patty with fried egg, bacon, and hash browns', price: 330, time: 20 },
    { name: 'Hawaiian Burger', desc: 'Beef patty with grilled pineapple and teriyaki sauce', price: 310, time: 16 },
    { name: 'Blue Cheese Burger', desc: 'Beef patty with blue cheese crumbles and caramelized onions', price: 320, time: 17 },
    { name: 'Avocado Burger', desc: 'Beef patty with fresh avocado, sprouts, and chipotle mayo', price: 290, time: 14 },
    { name: 'Tex-Mex Burger', desc: 'Beef patty with salsa, guacamole, and pepper jack cheese', price: 310, time: 16 },
    { name: 'Mediterranean Burger', desc: 'Beef patty with feta cheese, olives, and tzatziki', price: 300, time: 15 },
    { name: 'Buffalo Chicken Burger', desc: 'Spicy buffalo chicken with blue cheese dressing', price: 280, time: 14 },
    { name: 'Portobello Burger', desc: 'Grilled portobello mushroom with balsamic glaze', price: 240, time: 12 },
    { name: 'Quinoa Burger', desc: 'Healthy quinoa patty with mixed vegetables', price: 230, time: 11 },
    { name: 'Black Bean Burger', desc: 'Spiced black bean patty with cilantro lime mayo', price: 220, time: 10 },
    { name: 'Salmon Burger', desc: 'Grilled salmon patty with dill sauce', price: 350, time: 18 },
    { name: 'Bison Burger', desc: 'Lean bison patty with caramelized onions', price: 380, time: 20 },
    { name: 'Elk Burger', desc: 'Wild elk patty with juniper berry sauce', price: 400, time: 22 },
    { name: 'Wagyu Burger', desc: 'Premium wagyu beef with truffle aioli', price: 500, time: 25 },
    { name: 'Mini Sliders', desc: 'Three mini beef burgers with different toppings', price: 280, time: 15 }
  ],
  'Pizza': [
    { name: 'Margherita Pizza', desc: 'Classic pizza with fresh mozzarella, tomatoes, and basil', price: 180, time: 20 },
    { name: 'Pepperoni Supreme', desc: 'Loaded with pepperoni, cheese, and Italian herbs', price: 240, time: 22 },
    { name: 'Veggie Supreme', desc: 'Bell peppers, mushrooms, olives, onions, and tomatoes', price: 200, time: 20 },
    { name: 'Meat Lovers Pizza', desc: 'Pepperoni, sausage, bacon, and ham with extra cheese', price: 300, time: 25 },
    { name: 'Hawaiian Pizza', desc: 'Ham and pineapple with mozzarella cheese', price: 220, time: 20 },
    { name: 'BBQ Chicken Pizza', desc: 'BBQ sauce, grilled chicken, red onions, and cilantro', price: 260, time: 22 },
    { name: 'White Pizza', desc: 'Ricotta, mozzarella, garlic, and fresh herbs', price: 200, time: 18 },
    { name: 'Buffalo Chicken Pizza', desc: 'Spicy buffalo chicken with blue cheese drizzle', price: 270, time: 23 },
    { name: 'Mediterranean Pizza', desc: 'Feta cheese, olives, sun-dried tomatoes, and spinach', price: 250, time: 21 },
    { name: 'Mushroom Truffle Pizza', desc: 'Mixed mushrooms with truffle oil and parmesan', price: 320, time: 24 },
    { name: 'Prosciutto Arugula Pizza', desc: 'Prosciutto, arugula, and fresh mozzarella', price: 290, time: 22 },
    { name: 'Four Cheese Pizza', desc: 'Mozzarella, parmesan, gorgonzola, and ricotta', price: 280, time: 20 },
    { name: 'Spicy Salami Pizza', desc: 'Spicy salami with hot peppers and mozzarella', price: 260, time: 21 },
    { name: 'Seafood Pizza', desc: 'Shrimp, calamari, and mussels with garlic', price: 350, time: 26 },
    { name: 'Pesto Chicken Pizza', desc: 'Pesto sauce, grilled chicken, and sun-dried tomatoes', price: 270, time: 22 },
    { name: 'Mexican Pizza', desc: 'Ground beef, jalapeños, salsa, and Mexican cheese blend', price: 280, time: 23 },
    { name: 'Greek Pizza', desc: 'Feta, olives, tomatoes, and oregano', price: 250, time: 20 },
    { name: 'Thai Chicken Pizza', desc: 'Thai-spiced chicken with peanut sauce and bean sprouts', price: 290, time: 24 },
    { name: 'Spinach Ricotta Pizza', desc: 'Fresh spinach with ricotta and mozzarella', price: 230, time: 19 },
    { name: 'Caramelized Onion Pizza', desc: 'Sweet caramelized onions with goat cheese', price: 240, time: 21 },
    { name: 'Smoked Salmon Pizza', desc: 'Smoked salmon with capers and cream cheese', price: 380, time: 25 },
    { name: 'Duck Confit Pizza', desc: 'Duck confit with cherry sauce and arugula', price: 420, time: 28 },
    { name: 'Goat Cheese Pizza', desc: 'Goat cheese with roasted red peppers and herbs', price: 260, time: 20 },
    { name: 'Artichoke Pizza', desc: 'Marinated artichokes with sun-dried tomatoes', price: 250, time: 21 },
    { name: 'Calzone', desc: 'Folded pizza with ricotta, mozzarella, and your choice of fillings', price: 220, time: 25 }
  ]
};

const generateBetterMenu = async () => {
  try {
    await MenuItem.deleteMany({});
    console.log('🗑️ Cleared existing menu items');

    let totalItems = 0;
    const categories = Object.keys(realMenuData);

    for (const category of categories) {
      const items = realMenuData[category];
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        await MenuItem.create({
          name: item.name,
          description: item.desc,
          price: item.price,
          category,
          image: getUniqueImage(category, i),
          averagePreparationTime: item.time,
          inStock: true,
          rating: Math.round((Math.random() * 2 + 3) * 10) / 10 // 3.0-5.0
        });
        
        totalItems++;
      }
      
      console.log(`✅ Created ${items.length} items for ${category}`);
    }

    console.log(`🎉 Created ${totalItems} total menu items with unique images!`);
  } catch (error) {
    console.error('❌ Error creating menu:', error);
  }
};

const main = async () => {
  await connectDB();
  await generateBetterMenu();
  process.exit(0);
};

main();