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

// Comprehensive menu data with unique Unsplash images
const menuData = {
  'Burger': [
    { name: 'Classic Beef Burger', desc: 'Juicy beef patty with lettuce, tomato, onion, and special sauce', price: 250, time: 12, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&q=80' },
    { name: 'Chicken Deluxe Burger', desc: 'Grilled chicken breast with cheese, bacon, and avocado', price: 280, time: 15, img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&q=80' },
    { name: 'Veggie Burger', desc: 'Plant-based patty with fresh vegetables and vegan mayo', price: 220, time: 10, img: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop&q=80' },
    { name: 'BBQ Bacon Burger', desc: 'Beef patty with BBQ sauce, crispy bacon, and onion rings', price: 320, time: 18, img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop&q=80' },
    { name: 'Double Cheese Burger', desc: 'Two beef patties with double cheese and special sauce', price: 350, time: 20, img: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop&q=80' },
    { name: 'Mushroom Swiss Burger', desc: 'Beef patty with sautéed mushrooms and Swiss cheese', price: 290, time: 16, img: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop&q=80' },
    { name: 'Spicy Jalapeño Burger', desc: 'Beef patty with jalapeños, pepper jack cheese, and spicy mayo', price: 300, time: 14, img: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop&q=80' },
    { name: 'Turkey Burger', desc: 'Lean turkey patty with cranberry sauce and lettuce', price: 260, time: 13, img: 'https://images.unsplash.com/photo-1606755962773-d324e9a13086?w=400&h=300&fit=crop&q=80' },
    { name: 'Fish Burger', desc: 'Crispy fish fillet with tartar sauce and lettuce', price: 270, time: 15, img: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?w=400&h=300&fit=crop&q=80' },
    { name: 'Lamb Burger', desc: 'Seasoned lamb patty with mint yogurt sauce', price: 340, time: 18, img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop&q=80' },
    { name: 'Breakfast Burger', desc: 'Beef patty with fried egg, bacon, and hash browns', price: 330, time: 20, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80' },
    { name: 'Hawaiian Burger', desc: 'Beef patty with grilled pineapple and teriyaki sauce', price: 310, time: 16, img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop&q=80' },
    { name: 'Blue Cheese Burger', desc: 'Beef patty with blue cheese crumbles and caramelized onions', price: 320, time: 17, img: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop&q=80' },
    { name: 'Avocado Burger', desc: 'Beef patty with fresh avocado, sprouts, and chipotle mayo', price: 290, time: 14, img: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=400&h=300&fit=crop&q=80' },
    { name: 'Tex-Mex Burger', desc: 'Beef patty with salsa, guacamole, and pepper jack cheese', price: 310, time: 16, img: 'https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=400&h=300&fit=crop&q=80' },
    { name: 'Mediterranean Burger', desc: 'Beef patty with feta cheese, olives, and tzatziki', price: 300, time: 15, img: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=400&h=300&fit=crop&q=80' },
    { name: 'Buffalo Chicken Burger', desc: 'Spicy buffalo chicken with blue cheese dressing', price: 280, time: 14, img: 'https://images.unsplash.com/photo-1608767221051-2b9c18022103?w=400&h=300&fit=crop&q=80' },
    { name: 'Portobello Burger', desc: 'Grilled portobello mushroom with balsamic glaze', price: 240, time: 12, img: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=400&h=300&fit=crop&q=80' },
    { name: 'Quinoa Burger', desc: 'Healthy quinoa patty with mixed vegetables', price: 230, time: 11, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop&q=80' },
    { name: 'Black Bean Burger', desc: 'Spiced black bean patty with cilantro lime mayo', price: 220, time: 10, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&q=80' },
    { name: 'Salmon Burger', desc: 'Grilled salmon patty with dill sauce', price: 350, time: 18, img: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400&h=300&fit=crop&q=80' },
    { name: 'Bison Burger', desc: 'Lean bison patty with caramelized onions', price: 380, time: 20, img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&q=80' },
    { name: 'Elk Burger', desc: 'Wild elk patty with juniper berry sauce', price: 400, time: 22, img: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop&q=80' },
    { name: 'Wagyu Burger', desc: 'Premium wagyu beef with truffle aioli', price: 500, time: 25, img: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop&q=80' },
    { name: 'Mini Sliders', desc: 'Three mini beef burgers with different toppings', price: 280, time: 15, img: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400&h=300&fit=crop&q=80' }
  ],
  'Pizza': [
    { name: 'Margherita Pizza', desc: 'Classic pizza with fresh mozzarella, tomatoes, and basil', price: 180, time: 20, img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&q=80' },
    { name: 'Pepperoni Supreme', desc: 'Loaded with pepperoni, cheese, and Italian herbs', price: 240, time: 22, img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&q=80' },
    { name: 'Veggie Supreme', desc: 'Bell peppers, mushrooms, olives, onions, and tomatoes', price: 200, time: 20, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80' },
    { name: 'Meat Lovers Pizza', desc: 'Pepperoni, sausage, bacon, and ham with extra cheese', price: 300, time: 25, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&q=80' },
    { name: 'Hawaiian Pizza', desc: 'Ham and pineapple with mozzarella cheese', price: 220, time: 20, img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&q=80' },
    { name: 'BBQ Chicken Pizza', desc: 'BBQ sauce, grilled chicken, red onions, and cilantro', price: 260, time: 22, img: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop&q=80' },
    { name: 'White Pizza', desc: 'Ricotta, mozzarella, garlic, and fresh herbs', price: 200, time: 18, img: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop&q=80' },
    { name: 'Buffalo Chicken Pizza', desc: 'Spicy buffalo chicken with blue cheese drizzle', price: 270, time: 23, img: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400&h=300&fit=crop&q=80' },
    { name: 'Mediterranean Pizza', desc: 'Feta cheese, olives, sun-dried tomatoes, and spinach', price: 250, time: 21, img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&q=80' },
    { name: 'Mushroom Truffle Pizza', desc: 'Mixed mushrooms with truffle oil and parmesan', price: 320, time: 24, img: 'https://images.unsplash.com/photo-1571066811602-716837d681de?w=400&h=300&fit=crop&q=80' },
    { name: 'Prosciutto Arugula Pizza', desc: 'Prosciutto, arugula, and fresh mozzarella', price: 290, time: 22, img: 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=400&h=300&fit=crop&q=80' },
    { name: 'Four Cheese Pizza', desc: 'Mozzarella, parmesan, gorgonzola, and ricotta', price: 280, time: 20, img: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop&q=80' },
    { name: 'Spicy Salami Pizza', desc: 'Spicy salami with hot peppers and mozzarella', price: 260, time: 21, img: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&h=300&fit=crop&q=80' },
    { name: 'Seafood Pizza', desc: 'Shrimp, calamari, and mussels with garlic', price: 350, time: 26, img: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop&q=80' },
    { name: 'Pesto Chicken Pizza', desc: 'Pesto sauce, grilled chicken, and sun-dried tomatoes', price: 270, time: 22, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80' },
    { name: 'Mexican Pizza', desc: 'Ground beef, jalapeños, salsa, and Mexican cheese blend', price: 280, time: 23, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&q=80' },
    { name: 'Greek Pizza', desc: 'Feta, olives, tomatoes, and oregano', price: 250, time: 20, img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&q=80' },
    { name: 'Thai Chicken Pizza', desc: 'Thai-spiced chicken with peanut sauce and bean sprouts', price: 290, time: 24, img: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop&q=80' },
    { name: 'Spinach Ricotta Pizza', desc: 'Fresh spinach with ricotta and mozzarella', price: 230, time: 19, img: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop&q=80' },
    { name: 'Caramelized Onion Pizza', desc: 'Sweet caramelized onions with goat cheese', price: 240, time: 21, img: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400&h=300&fit=crop&q=80' },
    { name: 'Smoked Salmon Pizza', desc: 'Smoked salmon with capers and cream cheese', price: 380, time: 25, img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&q=80' },
    { name: 'Duck Confit Pizza', desc: 'Duck confit with cherry sauce and arugula', price: 420, time: 28, img: 'https://images.unsplash.com/photo-1571066811602-716837d681de?w=400&h=300&fit=crop&q=80' },
    { name: 'Goat Cheese Pizza', desc: 'Goat cheese with roasted red peppers and herbs', price: 260, time: 20, img: 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=400&h=300&fit=crop&q=80' },
    { name: 'Artichoke Pizza', desc: 'Marinated artichokes with sun-dried tomatoes', price: 250, time: 21, img: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop&q=80' },
    { name: 'Calzone', desc: 'Folded pizza with ricotta, mozzarella, and your choice of fillings', price: 220, time: 25, img: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&h=300&fit=crop&q=80' }
  ]
};

// Continue with more categories
const moreMenuData = {
  'Drink': [
    { name: 'Fresh Orange Juice', desc: 'Freshly squeezed orange juice', price: 80, time: 3, img: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&q=80' },
    { name: 'Iced Coffee', desc: 'Cold brew coffee with ice and cream', price: 120, time: 5, img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&q=80' },
    { name: 'Mango Smoothie', desc: 'Creamy mango smoothie with yogurt', price: 150, time: 4, img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&q=80' },
    { name: 'Classic Lemonade', desc: 'Fresh lemon juice with mint and soda', price: 90, time: 3, img: 'https://images.unsplash.com/photo-1523371683702-af5cd0d447c9?w=400&h=300&fit=crop&q=80' },
    { name: 'Green Tea', desc: 'Organic green tea with antioxidants', price: 70, time: 2, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&q=80' },
    { name: 'Chocolate Milkshake', desc: 'Rich chocolate milkshake with whipped cream', price: 160, time: 5, img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&q=80' },
    { name: 'Strawberry Smoothie', desc: 'Fresh strawberry smoothie with banana', price: 140, time: 4, img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&q=80' },
    { name: 'Coconut Water', desc: 'Natural coconut water for hydration', price: 100, time: 1, img: 'https://images.unsplash.com/photo-1523371683702-af5cd0d447c9?w=400&h=300&fit=crop&q=80' },
    { name: 'Energy Drink', desc: 'Boost your energy with natural ingredients', price: 130, time: 1, img: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&q=80' },
    { name: 'Sparkling Water', desc: 'Refreshing sparkling water with lime', price: 60, time: 1, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&q=80' },
    { name: 'Apple Juice', desc: 'Fresh apple juice from local orchards', price: 85, time: 2, img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&q=80' },
    { name: 'Cranberry Juice', desc: 'Tart cranberry juice with natural sweetness', price: 90, time: 2, img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&q=80' },
    { name: 'Pineapple Juice', desc: 'Tropical pineapple juice', price: 95, time: 2, img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&q=80' },
    { name: 'Grape Juice', desc: 'Sweet grape juice from premium grapes', price: 85, time: 2, img: 'https://images.unsplash.com/photo-1523371683702-af5cd0d447c9?w=400&h=300&fit=crop&q=80' },
    { name: 'Tomato Juice', desc: 'Fresh tomato juice with herbs', price: 75, time: 2, img: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&q=80' },
    { name: 'Hot Chocolate', desc: 'Rich hot chocolate with marshmallows', price: 110, time: 4, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&q=80' },
    { name: 'Chai Latte', desc: 'Spiced chai latte with steamed milk', price: 125, time: 5, img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&q=80' },
    { name: 'Matcha Latte', desc: 'Japanese matcha latte with foam art', price: 140, time: 5, img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&q=80' },
    { name: 'Bubble Tea', desc: 'Taiwanese bubble tea with tapioca pearls', price: 150, time: 6, img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&q=80' },
    { name: 'Kombucha', desc: 'Fermented tea with probiotics', price: 120, time: 1, img: 'https://images.unsplash.com/photo-1523371683702-af5cd0d447c9?w=400&h=300&fit=crop&q=80' },
    { name: 'Fresh Lime Soda', desc: 'Refreshing lime soda with mint', price: 80, time: 3, img: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&q=80' },
    { name: 'Virgin Mojito', desc: 'Non-alcoholic mojito with fresh mint', price: 110, time: 4, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&q=80' },
    { name: 'Iced Tea', desc: 'Refreshing iced tea with lemon', price: 70, time: 2, img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&q=80' },
    { name: 'Protein Shake', desc: 'Post-workout protein shake with fruits', price: 180, time: 5, img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&q=80' },
    { name: 'Detox Water', desc: 'Infused water with cucumber and mint', price: 90, time: 2, img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&q=80' }
  ],
  'Fries': [
    { name: 'Classic French Fries', desc: 'Golden crispy fries with salt', price: 100, time: 8, img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&q=80' },
    { name: 'Cheese Fries', desc: 'Crispy fries topped with melted cheese', price: 140, time: 10, img: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&h=300&fit=crop&q=80' },
    { name: 'Loaded Fries', desc: 'Fries with cheese, bacon bits, and sour cream', price: 180, time: 12, img: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop&q=80' },
    { name: 'Sweet Potato Fries', desc: 'Crispy sweet potato fries with herbs', price: 130, time: 10, img: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop&q=80' },
    { name: 'Curly Fries', desc: 'Seasoned curly fries with spices', price: 120, time: 9, img: 'https://images.unsplash.com/photo-1606755962773-d324e9a13086?w=400&h=300&fit=crop&q=80' },
    { name: 'Garlic Parmesan Fries', desc: 'Fries with garlic and parmesan cheese', price: 150, time: 11, img: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?w=400&h=300&fit=crop&q=80' },
    { name: 'Truffle Fries', desc: 'Gourmet fries with truffle oil', price: 200, time: 12, img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop&q=80' },
    { name: 'Chili Cheese Fries', desc: 'Fries topped with chili and cheese', price: 170, time: 13, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80' },
    { name: 'Bacon Fries', desc: 'Crispy fries with bacon bits', price: 160, time: 11, img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop&q=80' },
    { name: 'Cajun Fries', desc: 'Spicy Cajun seasoned fries', price: 130, time: 9, img: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop&q=80' },
    { name: 'Waffle Fries', desc: 'Unique waffle-shaped fries', price: 140, time: 10, img: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=400&h=300&fit=crop&q=80' },
    { name: 'Steak Fries', desc: 'Thick-cut steak fries', price: 120, time: 12, img: 'https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=400&h=300&fit=crop&q=80' },
    { name: 'Shoestring Fries', desc: 'Ultra-thin crispy fries', price: 110, time: 8, img: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=400&h=300&fit=crop&q=80' },
    { name: 'Potato Wedges', desc: 'Seasoned potato wedges', price: 130, time: 15, img: 'https://images.unsplash.com/photo-1608767221051-2b9c18022103?w=400&h=300&fit=crop&q=80' },
    { name: 'Hash Browns', desc: 'Golden hash brown patties', price: 100, time: 10, img: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=400&h=300&fit=crop&q=80' },
    { name: 'Onion Rings', desc: 'Crispy beer-battered onion rings', price: 140, time: 12, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop&q=80' },
    { name: 'Mozzarella Sticks', desc: 'Breaded mozzarella sticks with marinara', price: 160, time: 10, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&q=80' },
    { name: 'Jalapeño Poppers', desc: 'Spicy jalapeños stuffed with cheese', price: 150, time: 12, img: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400&h=300&fit=crop&q=80' },
    { name: 'Fried Pickles', desc: 'Crispy fried pickle chips', price: 120, time: 8, img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&q=80' },
    { name: 'Zucchini Fries', desc: 'Healthy breaded zucchini fries', price: 130, time: 10, img: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop&q=80' },
    { name: 'Avocado Fries', desc: 'Crispy breaded avocado slices', price: 170, time: 12, img: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop&q=80' },
    { name: 'Cauliflower Fries', desc: 'Healthy cauliflower fries with spices', price: 120, time: 10, img: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400&h=300&fit=crop&q=80' },
    { name: 'Polenta Fries', desc: 'Crispy polenta fries with herbs', price: 140, time: 12, img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&q=80' },
    { name: 'Yuca Fries', desc: 'Latin-style yuca fries', price: 130, time: 15, img: 'https://images.unsplash.com/photo-1571066811602-716837d681de?w=400&h=300&fit=crop&q=80' },
    { name: 'Plantain Fries', desc: 'Sweet plantain fries', price: 120, time: 10, img: 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=400&h=300&fit=crop&q=80' }
  ]
};

const createComprehensiveMenu = async () => {
  try {
    await MenuItem.deleteMany({});
    console.log('🗑️ Cleared existing menu items');

    let totalItems = 0;
    const allData = { ...menuData, ...moreMenuData };

    for (const [category, items] of Object.entries(allData)) {
      for (const item of items) {
        await MenuItem.create({
          name: item.name,
          description: item.desc,
          price: item.price,
          category,
          image: item.img,
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
  await createComprehensiveMenu();
  process.exit(0);
};

main();