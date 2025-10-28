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

// Complete menu data with 10 categories and unique images
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
    { name: 'Hawaiian Burger', desc: 'Beef patty with grilled pineapple and teriyaki sauce', price: 310, time: 16, img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop&q=80' }
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
    { name: 'Mushroom Truffle Pizza', desc: 'Mixed mushrooms with truffle oil and parmesan', price: 320, time: 24, img: 'https://images.unsplash.com/photo-1571066811602-716837d681de?w=400&h=300&fit=crop&q=80' }
  ],
  'Drink': [
    { name: 'Fresh Orange Juice', desc: 'Freshly squeezed orange juice', price: 80, time: 3, img: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&q=80' },
    { name: 'Iced Coffee', desc: 'Cold brew coffee with ice and cream', price: 120, time: 5, img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&q=80' },
    { name: 'Mango Smoothie', desc: 'Creamy mango smoothie with yogurt', price: 150, time: 4, img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&q=80' },
    { name: 'Classic Lemonade', desc: 'Fresh lemon juice with mint and soda', price: 90, time: 3, img: 'https://images.unsplash.com/photo-1523371683702-af5cd0d447c9?w=400&h=300&fit=crop&q=80' },
    { name: 'Green Tea', desc: 'Organic green tea with antioxidants', price: 70, time: 2, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&q=80' },
    { name: 'Chocolate Milkshake', desc: 'Rich chocolate milkshake with whipped cream', price: 160, time: 5, img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&q=80' },
    { name: 'Strawberry Smoothie', desc: 'Fresh strawberry smoothie with banana', price: 140, time: 4, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&q=80' },
    { name: 'Coconut Water', desc: 'Natural coconut water for hydration', price: 100, time: 1, img: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400&h=300&fit=crop&q=80' },
    { name: 'Energy Drink', desc: 'Boost your energy with natural ingredients', price: 130, time: 1, img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&q=80' },
    { name: 'Hot Chocolate', desc: 'Rich hot chocolate with marshmallows', price: 110, time: 4, img: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop&q=80' }
  ],
  'French fries': [
    { name: 'Classic French Fries', desc: 'Golden crispy fries with salt', price: 100, time: 8, img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&q=80' },
    { name: 'Cheese Fries', desc: 'Crispy fries topped with melted cheese', price: 140, time: 10, img: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&h=300&fit=crop&q=80' },
    { name: 'Loaded Fries', desc: 'Fries with cheese, bacon bits, and sour cream', price: 180, time: 12, img: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop&q=80' },
    { name: 'Sweet Potato Fries', desc: 'Crispy sweet potato fries with herbs', price: 130, time: 10, img: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop&q=80' },
    { name: 'Curly Fries', desc: 'Seasoned curly fries with spices', price: 120, time: 9, img: 'https://images.unsplash.com/photo-1606755962773-d324e9a13086?w=400&h=300&fit=crop&q=80' },
    { name: 'Garlic Parmesan Fries', desc: 'Fries with garlic and parmesan cheese', price: 150, time: 11, img: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?w=400&h=300&fit=crop&q=80' },
    { name: 'Truffle Fries', desc: 'Gourmet fries with truffle oil', price: 200, time: 12, img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop&q=80' },
    { name: 'Chili Cheese Fries', desc: 'Fries topped with chili and cheese', price: 170, time: 13, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80' },
    { name: 'Bacon Fries', desc: 'Crispy fries with bacon bits', price: 160, time: 11, img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop&q=80' },
    { name: 'Cajun Fries', desc: 'Spicy Cajun seasoned fries', price: 130, time: 9, img: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop&q=80' }
  ],
  'Veggies': [
    { name: 'Grilled Vegetable Platter', desc: 'Mixed grilled vegetables with herbs', price: 180, time: 15, img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&q=80' },
    { name: 'Stuffed Bell Peppers', desc: 'Bell peppers stuffed with quinoa and vegetables', price: 200, time: 25, img: 'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=400&h=300&fit=crop&q=80' },
    { name: 'Roasted Cauliflower', desc: 'Whole roasted cauliflower with spices', price: 160, time: 20, img: 'https://images.unsplash.com/photo-1568584711271-61c0b9b6e9b4?w=400&h=300&fit=crop&q=80' },
    { name: 'Eggplant Parmesan', desc: 'Breaded eggplant with marinara and cheese', price: 220, time: 30, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80' },
    { name: 'Zucchini Noodles', desc: 'Spiralized zucchini with pesto sauce', price: 170, time: 12, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80' },
    { name: 'Caprese Salad', desc: 'Fresh mozzarella, tomatoes, and basil', price: 150, time: 8, img: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=300&fit=crop&q=80' },
    { name: 'Vegetable Stir Fry', desc: 'Mixed vegetables stir-fried with soy sauce', price: 160, time: 10, img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&q=80' },
    { name: 'Avocado Toast', desc: 'Smashed avocado on sourdough with seeds', price: 140, time: 5, img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop&q=80' },
    { name: 'Quinoa Bowl', desc: 'Quinoa with roasted vegetables and tahini', price: 190, time: 15, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80' },
    { name: 'Mediterranean Wrap', desc: 'Hummus, vegetables, and feta in a wrap', price: 160, time: 8, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80' }
  ],
  'Pasta': [
    { name: 'Spaghetti Carbonara', desc: 'Classic carbonara with eggs, cheese, and pancetta', price: 220, time: 18, img: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&q=80' },
    { name: 'Penne Arrabbiata', desc: 'Spicy tomato sauce with garlic and chili', price: 180, time: 15, img: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop&q=80' },
    { name: 'Fettuccine Alfredo', desc: 'Creamy alfredo sauce with parmesan', price: 200, time: 16, img: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop&q=80' },
    { name: 'Lasagna Bolognese', desc: 'Layered pasta with meat sauce and cheese', price: 280, time: 35, img: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop&q=80' },
    { name: 'Pesto Linguine', desc: 'Fresh basil pesto with pine nuts', price: 190, time: 14, img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&q=80' },
    { name: 'Seafood Pasta', desc: 'Mixed seafood with white wine sauce', price: 320, time: 25, img: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop&q=80' },
    { name: 'Mushroom Risotto', desc: 'Creamy risotto with mixed mushrooms', price: 240, time: 30, img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop&q=80' },
    { name: 'Ravioli Spinach', desc: 'Spinach and ricotta filled ravioli', price: 210, time: 20, img: 'https://images.unsplash.com/photo-1587740908075-1ebe48c0b5c6?w=400&h=300&fit=crop&q=80' },
    { name: 'Gnocchi Gorgonzola', desc: 'Potato gnocchi with gorgonzola cream sauce', price: 230, time: 18, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80' },
    { name: 'Cacio e Pepe', desc: 'Simple pasta with cheese and black pepper', price: 170, time: 12, img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&q=80' }
  ],
  'Desserts': [
    { name: 'Chocolate Lava Cake', desc: 'Warm chocolate cake with molten center', price: 180, time: 15, img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&q=80' },
    { name: 'Tiramisu', desc: 'Classic Italian dessert with coffee and mascarpone', price: 160, time: 5, img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&q=80' },
    { name: 'Cheesecake', desc: 'New York style cheesecake with berry compote', price: 150, time: 5, img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop&q=80' },
    { name: 'Crème Brûlée', desc: 'Vanilla custard with caramelized sugar top', price: 170, time: 8, img: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400&h=300&fit=crop&q=80' },
    { name: 'Gelato Trio', desc: 'Three scoops of artisanal gelato', price: 120, time: 3, img: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop&q=80' },
    { name: 'Apple Pie', desc: 'Homemade apple pie with vanilla ice cream', price: 140, time: 10, img: 'https://images.unsplash.com/photo-1535920527002-b35e96722206?w=400&h=300&fit=crop&q=80' },
    { name: 'Chocolate Mousse', desc: 'Rich chocolate mousse with whipped cream', price: 130, time: 5, img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop&q=80' },
    { name: 'Panna Cotta', desc: 'Silky vanilla panna cotta with fruit coulis', price: 140, time: 5, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop&q=80' },
    { name: 'Cannoli', desc: 'Sicilian cannoli with ricotta filling', price: 110, time: 3, img: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop&q=80' },
    { name: 'Fruit Tart', desc: 'Fresh seasonal fruit tart with pastry cream', price: 150, time: 5, img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop&q=80' }
  ],
  'Seafood': [
    { name: 'Grilled Salmon', desc: 'Atlantic salmon with lemon herb butter', price: 350, time: 20, img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&q=80' },
    { name: 'Fish and Chips', desc: 'Beer-battered cod with crispy fries', price: 280, time: 18, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&q=80' },
    { name: 'Shrimp Scampi', desc: 'Garlic butter shrimp with white wine', price: 320, time: 15, img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop&q=80' },
    { name: 'Lobster Roll', desc: 'Fresh lobster meat in a toasted roll', price: 450, time: 12, img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80' },
    { name: 'Tuna Steak', desc: 'Seared tuna with sesame crust', price: 380, time: 12, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&q=80' },
    { name: 'Crab Cakes', desc: 'Maryland-style crab cakes with remoulade', price: 340, time: 15, img: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?w=400&h=300&fit=crop&q=80' },
    { name: 'Mussels Marinara', desc: 'Fresh mussels in spicy tomato broth', price: 260, time: 18, img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop&q=80' },
    { name: 'Calamari Rings', desc: 'Crispy fried squid rings with marinara', price: 200, time: 10, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&q=80' },
    { name: 'Seafood Paella', desc: 'Spanish rice with mixed seafood', price: 420, time: 35, img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80' },
    { name: 'Oysters Rockefeller', desc: 'Baked oysters with spinach and herbs', price: 300, time: 20, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&q=80' }
  ],
  'Salads': [
    { name: 'Caesar Salad', desc: 'Romaine lettuce with caesar dressing and croutons', price: 140, time: 8, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80' },
    { name: 'Greek Salad', desc: 'Mixed greens with feta, olives, and tomatoes', price: 150, time: 10, img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&q=80' },
    { name: 'Cobb Salad', desc: 'Mixed greens with bacon, egg, and blue cheese', price: 180, time: 12, img: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=300&fit=crop&q=80' },
    { name: 'Quinoa Salad', desc: 'Quinoa with roasted vegetables and vinaigrette', price: 160, time: 10, img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&q=80' },
    { name: 'Spinach Salad', desc: 'Baby spinach with strawberries and goat cheese', price: 140, time: 8, img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop&q=80' },
    { name: 'Arugula Salad', desc: 'Peppery arugula with pears and walnuts', price: 130, time: 8, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80' },
    { name: 'Kale Salad', desc: 'Massaged kale with lemon dressing', price: 120, time: 10, img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&q=80' },
    { name: 'Waldorf Salad', desc: 'Apples, celery, grapes, and walnuts', price: 130, time: 8, img: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=300&fit=crop&q=80' },
    { name: 'Nicoise Salad', desc: 'French salad with tuna, eggs, and olives', price: 200, time: 15, img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&q=80' },
    { name: 'Asian Chicken Salad', desc: 'Mixed greens with grilled chicken and sesame dressing', price: 180, time: 12, img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop&q=80' }
  ],
  'Soups': [
    { name: 'Tomato Basil Soup', desc: 'Creamy tomato soup with fresh basil', price: 100, time: 8, img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&q=80' },
    { name: 'Chicken Noodle Soup', desc: 'Classic comfort soup with tender chicken', price: 120, time: 10, img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80' },
    { name: 'Mushroom Bisque', desc: 'Rich mushroom soup with cream', price: 140, time: 12, img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&q=80' },
    { name: 'French Onion Soup', desc: 'Caramelized onions with gruyere cheese', price: 150, time: 15, img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80' },
    { name: 'Minestrone', desc: 'Italian vegetable soup with beans', price: 110, time: 10, img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&q=80' },
    { name: 'Clam Chowder', desc: 'New England style clam chowder', price: 160, time: 12, img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80' },
    { name: 'Butternut Squash Soup', desc: 'Roasted butternut squash with spices', price: 130, time: 10, img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&q=80' },
    { name: 'Lentil Soup', desc: 'Hearty lentil soup with vegetables', price: 100, time: 8, img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80' },
    { name: 'Pho Bo', desc: 'Vietnamese beef noodle soup', price: 180, time: 15, img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&q=80' },
    { name: 'Gazpacho', desc: 'Cold Spanish tomato soup', price: 120, time: 5, img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80' }
  ]
};

const createFinalMenu = async () => {
  try {
    await MenuItem.deleteMany({});
    console.log('🗑️ Cleared existing menu items');

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
          rating: Math.round((Math.random() * 2 + 3) * 10) / 10 // 3.0-5.0
        });
        totalItems++;
      }
      console.log(`✅ Created ${items.length} items for ${category}`);
    }

    console.log(`🎉 Created ${totalItems} total menu items across 10 categories!`);
  } catch (error) {
    console.error('❌ Error creating menu:', error);
  }
};

const main = async () => {
  await connectDB();
  await createFinalMenu();
  process.exit(0);
};

main();