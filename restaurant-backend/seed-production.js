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

// Helper function to generate real food images using curated Unsplash collections
const generateImageUrl = (dishName, category) => {
  // Create a hash from dish name for consistent selection
  let hash = 0;
  for (let i = 0; i < dishName.length; i++) {
    const char = dishName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  // Curated collections of real food images from Unsplash (verified working URLs)
  const categoryImages = {
    'Burger': [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1615297928064-24977384d0da?w=400&h=300&fit=crop&q=80'
    ],
    'Pizza': [
      'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&q=80'
    ],
    'Pasta': [
      'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1476124369491-9d47bcaca89e?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop&q=80'
    ],
    'Beverages': [
      'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523371683702-af5cd0d447c9?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585238341710-089b3dd54c8d?w=400&h=300&fit=crop&q=80'
    ],
    'Salads': [
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592417817038-d13a4fc34266?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=300&fit=crop&q=80'
    ],
    'Sandwich': [
      'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606502281004-3a0672b37e7c?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1547584370-2cc98b8b8c5b?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=400&h=300&fit=crop&q=80'
    ],
    'Desserts': [
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533134242728-45bbf7728619?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop&q=80'
    ],
    'Appetizer': [
      'https://images.unsplash.com/photo-1571066811602-716837d681de?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1637087742041-cdbf0d8b11a0?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop&q=80'
    ]
  };
  
  // Get images for the category, fallback to burger images
  const images = categoryImages[category] || categoryImages['Burger'];
  
  // Select image based on hash for consistency
  const imageIndex = Math.abs(hash) % images.length;
  
  return images[imageIndex];
};

// Essential menu data for production
const menuData = {
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
    { name: 'Mini Sliders', desc: 'Three mini beef burgers with different toppings', price: 280, time: 15 },
    { name: 'Pulled Pork Burger', desc: 'Slow-cooked pulled pork with coleslaw', price: 310, time: 16 },
    { name: 'Cajun Chicken Burger', desc: 'Spicy Cajun chicken with ranch dressing', price: 270, time: 14 },
    { name: 'Falafel Burger', desc: 'Crispy falafel patty with tahini sauce', price: 240, time: 12 },
    { name: 'Paneer Burger', desc: 'Grilled paneer with mint chutney', price: 250, time: 13 },
    { name: 'Tofu Burger', desc: 'Marinated tofu with Asian slaw', price: 230, time: 11 },
    { name: 'Shrimp Burger', desc: 'Crispy shrimp patty with remoulade sauce', price: 340, time: 17 },
    { name: 'Crab Cake Burger', desc: 'Maryland-style crab cake with aioli', price: 380, time: 19 },
    { name: 'Korean BBQ Burger', desc: 'Korean marinated beef with kimchi', price: 330, time: 16},
    { name: 'Mac & Cheese Burger', desc: 'Beef patty topped with mac and cheese', price: 340, time: 18},
    { name: 'Ramen Burger', desc: 'Beef patty between ramen noodle buns', price: 320, time: 17}
  ],

  'Pizza': [
    { name: 'Margherita Pizza', desc: 'Classic pizza with fresh mozzarella, tomatoes, and basil', price: 180, time: 20},
    { name: 'Pepperoni Supreme', desc: 'Loaded with pepperoni, cheese, and Italian herbs', price: 240, time: 22},
    { name: 'Veggie Supreme', desc: 'Bell peppers, mushrooms, olives, onions, and tomatoes', price: 200, time: 20},
    { name: 'Meat Lovers Pizza', desc: 'Pepperoni, sausage, bacon, and ham with extra cheese', price: 300, time: 25},
    { name: 'Hawaiian Pizza', desc: 'Ham and pineapple with mozzarella cheese', price: 220, time: 20},
    { name: 'BBQ Chicken Pizza', desc: 'BBQ sauce, grilled chicken, red onions, and cilantro', price: 260, time: 22},
    { name: 'White Pizza', desc: 'Ricotta, mozzarella, garlic, and fresh herbs', price: 200, time: 18},
    { name: 'Buffalo Chicken Pizza', desc: 'Spicy buffalo chicken with blue cheese drizzle', price: 270, time: 23},
    { name: 'Mediterranean Pizza', desc: 'Feta cheese, olives, sun-dried tomatoes, and spinach', price: 250, time: 21},
    { name: 'Mushroom Truffle Pizza', desc: 'Mixed mushrooms with truffle oil and parmesan', price: 320, time: 24},
    { name: 'Prosciutto Arugula Pizza', desc: 'Prosciutto, arugula, and fresh mozzarella', price: 290, time: 22},
    { name: 'Four Cheese Pizza', desc: 'Mozzarella, parmesan, gorgonzola, and ricotta', price: 280, time: 20},
    { name: 'Spicy Salami Pizza', desc: 'Spicy salami with hot peppers and mozzarella', price: 260, time: 21},
    { name: 'Seafood Pizza', desc: 'Shrimp, calamari, and mussels with garlic', price: 350, time: 26},
    { name: 'Pesto Chicken Pizza', desc: 'Pesto sauce, grilled chicken, and sun-dried tomatoes', price: 270, time: 22},
    { name: 'Mexican Pizza', desc: 'Ground beef, jalapeños, salsa, and Mexican cheese blend', price: 280, time: 23},
    { name: 'Greek Pizza', desc: 'Feta, olives, tomatoes, and oregano', price: 250, time: 20},
    { name: 'Thai Chicken Pizza', desc: 'Thai-spiced chicken with peanut sauce and bean sprouts', price: 290, time: 24},
    { name: 'Spinach Ricotta Pizza', desc: 'Fresh spinach with ricotta and mozzarella', price: 230, time: 19},
    { name: 'Caramelized Onion Pizza', desc: 'Sweet caramelized onions with goat cheese', price: 240, time: 21},
    { name: 'Smoked Salmon Pizza', desc: 'Smoked salmon with capers and cream cheese', price: 380, time: 25},
    { name: 'Duck Confit Pizza', desc: 'Duck confit with cherry sauce and arugula', price: 420, time: 28},
    { name: 'Goat Cheese Pizza', desc: 'Goat cheese with roasted red peppers and herbs', price: 260, time: 20},
    { name: 'Artichoke Pizza', desc: 'Marinated artichokes with sun-dried tomatoes', price: 250, time: 21},
    { name: 'Calzone', desc: 'Folded pizza with ricotta, mozzarella, and your choice of fillings', price: 220, time: 25},
    { name: 'Sicilian Pizza', desc: 'Thick crust with tomato sauce, anchovies, and oregano', price: 270, time: 30},
    { name: 'Chicago Deep Dish', desc: 'Deep dish with layers of cheese, sausage, and tomato sauce', price: 320, time: 35},
    { name: 'Neapolitan Pizza', desc: 'Thin crust with San Marzano tomatoes and buffalo mozzarella', price: 260, time: 18},
    { name: 'Breakfast Pizza', desc: 'Eggs, bacon, sausage, and cheese on pizza crust', price: 280, time: 22},
    { name: 'Taco Pizza', desc: 'Seasoned beef, lettuce, tomatoes, and taco cheese', price: 270, time: 23},
    { name: 'Cheeseburger Pizza', desc: 'Ground beef, pickles, onions, and cheddar cheese', price: 290, time: 24},
    { name: 'Pear Gorgonzola Pizza', desc: 'Sliced pears with gorgonzola and walnuts', price: 310, time: 21},
    { name: 'Fig Prosciutto Pizza', desc: 'Fresh figs, prosciutto, and balsamic glaze', price: 330, time: 22},
    { name: 'Clam Pizza', desc: 'White clam pizza with garlic and parsley', price: 340, time: 26},
    { name: 'Carbonara Pizza', desc: 'Cream sauce, pancetta, eggs, and parmesan', price: 290, time: 23}
  ],

  'Pasta': [
    { name: 'Spaghetti Carbonara', desc: 'Classic Italian pasta with eggs, bacon, and parmesan', price: 240, time: 18},
    { name: 'Fettuccine Alfredo', desc: 'Creamy alfredo sauce with parmesan cheese', price: 220, time: 16},
    { name: 'Penne Arrabbiata', desc: 'Spicy tomato sauce with garlic and chili flakes', price: 200, time: 15},
    { name: 'Lasagna Bolognese', desc: 'Layered pasta with meat sauce and béchamel', price: 280, time: 35},
    { name: 'Pesto Linguine', desc: 'Fresh basil pesto with pine nuts and parmesan', price: 230, time: 14},
    { name: 'Seafood Pasta', desc: 'Mixed seafood in white wine garlic sauce', price: 320, time: 22},
    { name: 'Mushroom Risotto', desc: 'Creamy arborio rice with mixed mushrooms', price: 260, time: 25},
    { name: 'Chicken Parmesan Pasta', desc: 'Breaded chicken with marinara over spaghetti', price: 290, time: 24},
    { name: 'Aglio e Olio', desc: 'Spaghetti with garlic, olive oil, and chili flakes', price: 180, time: 12},
    { name: 'Ravioli Ricotta', desc: 'Cheese-filled ravioli in tomato cream sauce', price: 250, time: 18},
    { name: 'Tortellini Alfredo', desc: 'Cheese tortellini in creamy alfredo sauce', price: 260, time: 17},
    { name: 'Cacio e Pepe', desc: 'Spaghetti with pecorino cheese and black pepper', price: 210, time: 13},
    { name: 'Puttanesca Pasta', desc: 'Tomato sauce with olives, capers, and anchovies', price: 230, time: 16},
    { name: 'Vodka Rigatoni', desc: 'Rigatoni in creamy tomato vodka sauce', price: 240, time: 18},
    { name: 'Primavera Pasta', desc: 'Seasonal vegetables in light garlic sauce', price: 220, time: 15},
    { name: 'Bolognese Tagliatelle', desc: 'Traditional meat sauce over fresh tagliatelle', price: 270, time: 20},
    { name: 'Lobster Ravioli', desc: 'Lobster-filled ravioli in brandy cream sauce', price: 380, time: 22},
    { name: 'Gnocchi Sorrentina', desc: 'Potato gnocchi with tomato sauce and mozzarella', price: 250, time: 19},
    { name: 'Mac and Cheese', desc: 'Classic comfort pasta with cheddar cheese sauce', price: 190, time: 14},
    { name: 'Truffle Mushroom Pasta', desc: 'Fettuccine with truffle oil and wild mushrooms', price: 310, time: 20},
    { name: 'Shrimp Scampi', desc: 'Linguine with garlic butter shrimp', price: 300, time: 18},
    { name: 'Spinach Cannelloni', desc: 'Pasta tubes filled with spinach and ricotta', price: 240, time: 25},
    { name: 'Clam Linguine', desc: 'Linguine with fresh clams in white wine sauce', price: 290, time: 20},
    { name: 'Four Cheese Baked Ziti', desc: 'Ziti baked with four cheeses and marinara', price: 260, time: 28},
    { name: 'Pesto Gnocchi', desc: 'Potato gnocchi tossed in fresh basil pesto', price: 240, time: 17},
    { name: 'Sausage Rigatoni', desc: 'Rigatoni with Italian sausage in tomato sauce', price: 270, time: 19},
    { name: 'Squid Ink Pasta', desc: 'Black pasta with seafood and cherry tomatoes', price: 320, time: 21},
    { name: 'Chicken Alfredo', desc: 'Grilled chicken over fettuccine alfredo', price: 280, time: 20},
    { name: 'Orecchiette Broccoli', desc: 'Ear-shaped pasta with broccoli and garlic', price: 210, time: 15},
    { name: 'Cajun Chicken Pasta', desc: 'Spicy Cajun chicken with peppers over penne', price: 280, time: 19},
    { name: 'Bacon Carbonara', desc: 'Spaghetti with crispy bacon and egg yolk sauce', price: 250, time: 17},
    { name: 'Vegetarian Lasagna', desc: 'Layered pasta with vegetables and cheese', price: 260, time: 32},
    { name: 'Farfalle Salmon', desc: 'Bow-tie pasta with smoked salmon and cream', price: 300, time: 18},
    { name: 'Sicilian Pasta', desc: 'Pasta with eggplant, tomatoes, and ricotta salata', price: 240, time: 19},
    { name: 'Lemon Butter Pasta', desc: 'Angel hair with lemon zest and butter sauce', price: 200, time: 13}
  ],

  'Salads': [
    { name: 'Caesar Salad', desc: 'Romaine lettuce, croutons, parmesan, and Caesar dressing', price: 150, time: 8},
    { name: 'Greek Salad', desc: 'Tomatoes, cucumbers, olives, feta, and oregano', price: 160, time: 7},
    { name: 'Caprese Salad', desc: 'Fresh mozzarella, tomatoes, basil, and balsamic', price: 170, time: 6},
    { name: 'Cobb Salad', desc: 'Mixed greens, chicken, bacon, egg, avocado, and blue cheese', price: 200, time: 10},
    { name: 'Chicken Caesar Salad', desc: 'Classic Caesar with grilled chicken breast', price: 190, time: 12},
    { name: 'Quinoa Salad', desc: 'Quinoa with vegetables, feta, and lemon dressing', price: 180, time: 9},
    { name: 'Asian Chicken Salad', desc: 'Mixed greens, chicken, mandarin oranges, and sesame dressing', price: 190, time: 11},
    { name: 'Tuna Salad', desc: 'Seared tuna over mixed greens with wasabi dressing', price: 220, time: 13},
    { name: 'Spinach Strawberry Salad', desc: 'Baby spinach, strawberries, almonds, and poppy seed dressing', price: 170, time: 8},
    { name: 'Kale Salad', desc: 'Massaged kale with cranberries, nuts, and vinaigrette', price: 160, time: 7},
    { name: 'Nicoise Salad', desc: 'Tuna, potatoes, green beans, eggs, and olives', price: 210, time: 14},
    { name: 'Waldorf Salad', desc: 'Apples, celery, walnuts, grapes, and mayo dressing', price: 150, time: 9},
    { name: 'Arugula Salad', desc: 'Peppery arugula with parmesan and lemon dressing', price: 140, time: 6},
    { name: 'Taco Salad', desc: 'Seasoned beef, lettuce, tomatoes, cheese, and tortilla bowl', price: 180, time: 12},
    { name: 'Chef Salad', desc: 'Ham, turkey, cheese, eggs, and vegetables', price: 190, time: 10},
    { name: 'Mediterranean Salad', desc: 'Mixed greens, hummus, falafel, and tahini dressing', price: 180, time: 11},
    { name: 'Shrimp Salad', desc: 'Grilled shrimp over mixed greens with citrus vinaigrette', price: 220, time: 13},
    { name: 'Beet Salad', desc: 'Roasted beets, goat cheese, and candied walnuts', price: 170, time: 9},
    { name: 'Pasta Salad', desc: 'Tri-color pasta with vegetables and Italian dressing', price: 140, time: 8},
    { name: 'Watermelon Feta Salad', desc: 'Refreshing watermelon with feta and mint', price: 150, time: 7},
    { name: 'Chicken Avocado Salad', desc: 'Grilled chicken, avocado, and cilantro lime dressing', price: 200, time: 12},
    { name: 'Pear Gorgonzola Salad', desc: 'Mixed greens, pears, gorgonzola, and walnuts', price: 180, time: 9},
    { name: 'Buffalo Chicken Salad', desc: 'Spicy buffalo chicken over romaine with blue cheese', price: 190, time: 11},
    { name: 'Salmon Salad', desc: 'Grilled salmon over spring mix with dill dressing', price: 240, time: 14},
    { name: 'Antipasto Salad', desc: 'Italian meats, cheeses, olives, and vegetables', price: 200, time: 10},
    { name: 'Mexican Street Corn Salad', desc: 'Grilled corn, cotija cheese, lime, and cilantro', price: 140, time: 8},
    { name: 'Cucumber Tomato Salad', desc: 'Fresh cucumbers and tomatoes with herb dressing', price: 120, time: 6},
    { name: 'Burrata Salad', desc: 'Creamy burrata with heirloom tomatoes and basil', price: 210, time: 8},
    { name: 'Grilled Vegetable Salad', desc: 'Assorted grilled vegetables with balsamic', price: 160, time: 12},
    { name: 'Poke Bowl', desc: 'Hawaiian-style raw tuna over rice with vegetables', price: 250, time: 15},
    { name: 'Thai Beef Salad', desc: 'Sliced beef with Thai herbs and spicy dressing', price: 220, time: 13},
    { name: 'Coleslaw', desc: 'Shredded cabbage with creamy or vinegar dressing', price: 100, time: 5},
    { name: 'Edamame Salad', desc: 'Soybeans with sesame oil and Asian seasonings', price: 130, time: 7},
    { name: 'Three Bean Salad', desc: 'Mixed beans with vegetables and vinaigrette', price: 120, time: 6},
    { name: 'Potato Salad', desc: 'Classic potato salad with mayo and herbs', price: 110, time: 8}
  ],

  'Sandwich': [
    { name: 'Club Sandwich', desc: 'Triple-decker with turkey, bacon, lettuce, and tomato', price: 180, time: 10},
    { name: 'BLT Sandwich', desc: 'Bacon, lettuce, and tomato on toasted bread', price: 150, time: 8},
    { name: 'Grilled Cheese', desc: 'Classic grilled cheese with cheddar and mozzarella', price: 130, time: 7},
    { name: 'Philly Cheesesteak', desc: 'Sliced steak with peppers, onions, and cheese', price: 240, time: 14},
    { name: 'Turkey Avocado Sandwich', desc: 'Roasted turkey with avocado and sprouts', price: 170, time: 9},
    { name: 'Cuban Sandwich', desc: 'Ham, pork, Swiss cheese, pickles, and mustard', price: 200, time: 12},
    { name: 'Reuben Sandwich', desc: 'Corned beef, sauerkraut, Swiss, and Russian dressing', price: 210, time: 11},
    { name: 'Chicken Salad Sandwich', desc: 'Homemade chicken salad with lettuce', price: 160, time: 8},
    { name: 'Italian Sub', desc: 'Salami, ham, provolone, lettuce, and Italian dressing', price: 190, time: 10},
    { name: 'Caprese Sandwich', desc: 'Fresh mozzarella, tomatoes, basil, and balsamic', price: 170, time: 7},
    { name: 'Tuna Melt', desc: 'Tuna salad with melted cheese on grilled bread', price: 160, time: 9},
    { name: 'Meatball Sub', desc: 'Homemade meatballs with marinara and mozzarella', price: 200, time: 13},
    { name: 'BBQ Pulled Pork Sandwich', desc: 'Slow-cooked pulled pork with BBQ sauce', price: 190, time: 11},
    { name: 'Egg Salad Sandwich', desc: 'Creamy egg salad on whole wheat bread', price: 140, time: 7},
    { name: 'Veggie Wrap', desc: 'Grilled vegetables with hummus in a tortilla wrap', price: 150, time: 8},
    { name: 'Buffalo Chicken Sandwich', desc: 'Spicy buffalo chicken with blue cheese dressing', price: 180, time: 10},
    { name: 'Pastrami Sandwich', desc: 'Hot pastrami with mustard on rye bread', price: 200, time: 10},
    { name: 'Roast Beef Sandwich', desc: 'Thinly sliced roast beef with horseradish', price: 190, time: 9},
    { name: 'Falafel Wrap', desc: 'Crispy falafel with tahini and vegetables', price: 160, time: 9},
    { name: 'French Dip', desc: 'Roast beef on baguette with au jus for dipping', price: 210, time: 12},
    { name: 'Chicken Pesto Sandwich', desc: 'Grilled chicken with pesto and sun-dried tomatoes', price: 180, time: 10},
    { name: 'Grilled Veggie Sandwich', desc: 'Marinated grilled vegetables with goat cheese', price: 170, time: 11},
    { name: 'Banh Mi', desc: 'Vietnamese sandwich with pork, pickled vegetables, and cilantro', price: 170, time: 9},
    { name: 'Lobster Roll', desc: 'Fresh lobster salad on a toasted New England roll', price: 320, time: 12},
    { name: 'Monte Cristo', desc: 'Ham and cheese sandwich battered and fried', price: 190, time: 13},
    { name: 'Panini Chicken', desc: 'Pressed chicken panini with mozzarella and pesto', price: 180, time: 10},
    { name: 'Steak Sandwich', desc: 'Sliced steak with caramelized onions and horseradish', price: 240, time: 14},
    { name: 'Gyro Wrap', desc: 'Greek-style lamb gyro with tzatziki sauce', price: 180, time: 10},
    { name: 'Chicken Caesar Wrap', desc: 'Chicken Caesar salad wrapped in tortilla', price: 160, time: 8},
    { name: 'Sloppy Joe', desc: 'Ground beef in tangy sauce on a bun', price: 150, time: 9},
    { name: 'Fried Chicken Sandwich', desc: 'Crispy fried chicken with pickles and mayo', price: 190, time: 12},
    { name: 'Prosciutto Mozzarella Sandwich', desc: 'Italian prosciutto with fresh mozzarella', price: 200, time: 8},
    { name: 'Corned Beef Sandwich', desc: 'Sliced corned beef with mustard on rye', price: 190, time: 9},
    { name: 'Crab Cake Sandwich', desc: 'Maryland crab cake with remoulade sauce', price: 280, time: 13},
    { name: 'Ham & Cheese Croissant', desc: 'Flaky croissant with ham and Swiss cheese', price: 140, time: 7}
  ],

  'Desserts': [
    { name: 'Chocolate Lava Cake', desc: 'Warm chocolate cake with molten center', price: 140, time: 15},
    { name: 'Tiramisu', desc: 'Classic Italian coffee-flavored dessert', price: 130, time: 5},
    { name: 'Cheesecake', desc: 'New York style cheesecake with berry compote', price: 120, time: 5},
    { name: 'Crème Brûlée', desc: 'Vanilla custard with caramelized sugar top', price: 130, time: 8},
    { name: 'Chocolate Brownie', desc: 'Fudgy brownie with vanilla ice cream', price: 110, time: 10},
    { name: 'Panna Cotta', desc: 'Italian cream dessert with fruit sauce', price: 120, time: 5},
    { name: 'Apple Pie', desc: 'Classic apple pie with cinnamon and ice cream', price: 115, time: 12},
    { name: 'Ice Cream Sundae', desc: 'Three scoops with toppings and whipped cream', price: 100, time: 5},
    { name: 'Chocolate Mousse', desc: 'Light and airy chocolate mousse', price: 110, time: 5},
    { name: 'Banoffee Pie', desc: 'Banana toffee pie with whipped cream', price: 125, time: 8},
    { name: 'Profiteroles', desc: 'Cream puffs with chocolate sauce', price: 130, time: 10},
    { name: 'Fruit Tart', desc: 'Buttery tart with pastry cream and fresh fruit', price: 120, time: 7},
    { name: 'Sticky Toffee Pudding', desc: 'Warm pudding with toffee sauce', price: 115, time: 12},
    { name: 'Carrot Cake', desc: 'Moist carrot cake with cream cheese frosting', price: 110, time: 6},
    { name: 'Affogato', desc: 'Vanilla gelato drowned in espresso', price: 100, time: 3},
    { name: 'Gelato', desc: 'Artisan Italian ice cream (3 scoops)', price: 105, time: 3},
    { name: 'Sorbet', desc: 'Refreshing fruit sorbet trio', price: 95, time: 3},
    { name: 'Churros', desc: 'Crispy churros with chocolate dipping sauce', price: 100, time: 10},
    { name: 'Macarons', desc: 'Assorted French macarons (6 pieces)', price: 120, time: 2},
    { name: 'Baklava', desc: 'Middle Eastern pastry with nuts and honey', price: 110, time: 5},
    { name: 'Red Velvet Cake', desc: 'Classic red velvet with cream cheese frosting', price: 115, time: 6},
    { name: 'Lemon Meringue Pie', desc: 'Tangy lemon filling with fluffy meringue', price: 120, time: 8},
    { name: 'Chocolate Fondue', desc: 'Melted chocolate with fruit and marshmallows', price: 150, time: 15},
    { name: 'Tres Leches Cake', desc: 'Latin American sponge cake soaked in three milks', price: 110, time: 6},
    { name: 'Pecan Pie', desc: 'Sweet pecan pie with vanilla ice cream', price: 115, time: 10},
    { name: 'Mochi Ice Cream', desc: 'Japanese rice cake with ice cream filling', price: 105, time: 2},
    { name: 'Pavlova', desc: 'Meringue dessert with whipped cream and fruit', price: 125, time: 8},
    { name: 'Bread Pudding', desc: 'Warm bread pudding with whiskey sauce', price: 110, time: 12},
    { name: 'Cannoli', desc: 'Italian pastry tubes filled with sweet ricotta', price: 100, time: 4},
    { name: 'Flan', desc: 'Caramel custard dessert', price: 95, time: 5},
    { name: 'Chocolate Tart', desc: 'Rich chocolate ganache tart', price: 125, time: 7},
    { name: 'Strawberry Shortcake', desc: 'Light sponge cake with strawberries and cream', price: 110, time: 6},
    { name: 'Beignets', desc: 'New Orleans-style fried dough with powdered sugar', price: 95, time: 10},
    { name: 'Chocolate Soufflé', desc: 'Light and airy chocolate soufflé', price: 140, time: 18},
    { name: 'Key Lime Pie', desc: 'Tangy key lime pie with graham cracker crust', price: 115, time: 6}
  ],

  'Beverages': [
    { name: 'Fresh Orange Juice', desc: 'Freshly squeezed orange juice', price: 80, time: 3},
    { name: 'Iced Coffee', desc: 'Cold brew coffee with ice and cream', price: 120, time: 5},
    { name: 'Mango Smoothie', desc: 'Creamy mango smoothie with yogurt', price: 150, time: 4},
    { name: 'Classic Lemonade', desc: 'Fresh lemon juice with mint and soda', price: 90, time: 3},
    { name: 'Green Tea', desc: 'Organic green tea with antioxidants', price: 70, time: 2},
    { name: 'Chocolate Milkshake', desc: 'Rich chocolate milkshake with whipped cream', price: 160, time: 5},
    { name: 'Strawberry Smoothie', desc: 'Fresh strawberry smoothie with banana', price: 140, time: 4},
    { name: 'Coconut Water', desc: 'Natural coconut water for hydration', price: 100, time: 1},
    { name: 'Energy Drink', desc: 'Boost your energy with natural ingredients', price: 130, time: 1},
    { name: 'Sparkling Water', desc: 'Refreshing sparkling water with lime', price: 60, time: 1},
    { name: 'Apple Juice', desc: 'Fresh apple juice from local orchards', price: 85, time: 2},
    { name: 'Cranberry Juice', desc: 'Tart cranberry juice with natural sweetness', price: 90, time: 2},
    { name: 'Pineapple Juice', desc: 'Tropical pineapple juice', price: 95, time: 2},
    { name: 'Grape Juice', desc: 'Sweet grape juice from premium grapes', price: 85, time: 2},
    { name: 'Tomato Juice', desc: 'Fresh tomato juice with herbs', price: 75, time: 2},
    { name: 'Hot Chocolate', desc: 'Rich hot chocolate with marshmallows', price: 110, time: 4},
    { name: 'Chai Latte', desc: 'Spiced chai latte with steamed milk', price: 125, time: 5},
    { name: 'Matcha Latte', desc: 'Japanese matcha latte with foam art', price: 140, time: 5},
    { name: 'Bubble Tea', desc: 'Taiwanese bubble tea with tapioca pearls', price: 150, time: 6},
    { name: 'Kombucha', desc: 'Fermented tea with probiotics', price: 120, time: 1},
    { name: 'Fresh Lime Soda', desc: 'Refreshing lime soda with mint', price: 80, time: 3},
    { name: 'Virgin Mojito', desc: 'Non-alcoholic mojito with fresh mint', price: 110, time: 4},
    { name: 'Iced Tea', desc: 'Refreshing iced tea with lemon', price: 70, time: 2},
    { name: 'Protein Shake', desc: 'Post-workout protein shake with fruits', price: 180, time: 5},
    { name: 'Detox Water', desc: 'Infused water with cucumber and mint', price: 90, time: 2},
    { name: 'Espresso', desc: 'Strong Italian espresso shot', price: 80, time: 2},
    { name: 'Cappuccino', desc: 'Classic cappuccino with foam art', price: 110, time: 4},
    { name: 'Flat White', desc: 'Espresso with microfoam milk', price: 115, time: 4},
    { name: 'Caramel Macchiato', desc: 'Espresso with vanilla and caramel', price: 135, time: 5},
    { name: 'Mocha', desc: 'Espresso with chocolate and steamed milk', price: 130, time: 5},
    { name: 'Vanilla Shake', desc: 'Creamy vanilla milkshake', price: 150, time: 4},
    { name: 'Berry Smoothie', desc: 'Mixed berries smoothie with honey', price: 140, time: 4},
    { name: 'Watermelon Juice', desc: 'Fresh watermelon juice', price: 85, time: 3},
    { name: 'Peach Iced Tea', desc: 'Refreshing peach-flavored iced tea', price: 85, time: 2}
  ],

  'Appetizer': [
    { name: 'Garlic Bread', desc: 'Toasted bread with garlic butter and herbs', price: 90, time: 8},
    { name: 'Bruschetta', desc: 'Toasted bread with tomatoes, basil, and olive oil', price: 110, time: 7},
    { name: 'Mozzarella Sticks', desc: 'Breaded mozzarella with marinara sauce', price: 130, time: 10},
    { name: 'Chicken Wings', desc: 'Spicy buffalo wings with blue cheese dip', price: 170, time: 15},
    { name: 'Spring Rolls', desc: 'Crispy vegetable spring rolls with sweet chili sauce', price: 120, time: 12},
    { name: 'Calamari', desc: 'Fried squid rings with tartar sauce', price: 160, time: 12},
    { name: 'Hummus Platter', desc: 'Creamy hummus with pita bread and vegetables', price: 130, time: 5},
    { name: 'Nachos', desc: 'Tortilla chips with cheese, jalapeños, and salsa', price: 140, time: 10},
    { name: 'Stuffed Mushrooms', desc: 'Button mushrooms stuffed with cheese and herbs', price: 150, time: 14},
    { name: 'Shrimp Cocktail', desc: 'Chilled shrimp with cocktail sauce', price: 180, time: 8},
    { name: 'Cheese Platter', desc: 'Assorted cheeses with crackers and fruit', price: 200, time: 7},
    { name: 'Quesadilla', desc: 'Grilled tortilla with cheese and chicken', price: 140, time: 11},
    { name: 'Samosa', desc: 'Indian pastry filled with spiced potatoes', price: 100, time: 10},
    { name: 'Edamame', desc: 'Steamed soybeans with sea salt', price: 90, time: 5},
    { name: 'Potato Skins', desc: 'Crispy potato skins with cheese and bacon', price: 130, time: 15},
    { name: 'Deviled Eggs', desc: 'Hard-boiled eggs with creamy filling', price: 100, time: 6},
    { name: 'Caprese Skewers', desc: 'Mozzarella, tomato, and basil on skewers', price: 120, time: 7},
    { name: 'Prosciutto Melon', desc: 'Cantaloupe wrapped in Italian prosciutto', price: 150, time: 5},
    { name: 'Fried Pickles', desc: 'Breaded and fried pickle chips', price: 110, time: 10},
    { name: 'Jalapeño Poppers', desc: 'Stuffed jalapeños with cream cheese', price: 130, time: 12},
    { name: 'Pigs in a Blanket', desc: 'Mini sausages wrapped in pastry', price: 120, time: 15},
    { name: 'Crab Cakes', desc: 'Pan-seared crab cakes with remoulade', price: 190, time: 13},
    { name: 'Baked Brie', desc: 'Warm brie cheese with cranberry compote', price: 160, time: 14},
    { name: 'Spinach Artichoke Dip', desc: 'Creamy dip with tortilla chips', price: 140, time: 12},
    { name: 'Chicken Satay', desc: 'Grilled chicken skewers with peanut sauce', price: 150, time: 13},
    { name: 'Mini Tacos', desc: 'Bite-sized tacos with beef and toppings', price: 130, time: 11},
    { name: 'Arancini', desc: 'Italian rice balls with mozzarella', price: 140, time: 12},
    { name: 'Falafel Bites', desc: 'Crispy chickpea fritters with tahini', price: 120, time: 10},
    { name: 'Duck Confit Crostini', desc: 'Duck confit on toasted baguette slices', price: 180, time: 10},
    { name: 'Oysters Rockefeller', desc: 'Baked oysters with spinach and cheese', price: 220, time: 18},
    { name: 'Beef Carpaccio', desc: 'Thinly sliced raw beef with arugula', price: 190, time: 8},
    { name: 'Scallops Wrapped in Bacon', desc: 'Pan-seared scallops with crispy bacon', price: 210, time: 15},
    { name: 'Tuna Tartare', desc: 'Fresh tuna with avocado and sesame', price: 200, time: 10},
    { name: 'Antipasto Platter', desc: 'Italian cured meats and marinated vegetables', price: 180, time: 8},
    { name: 'Tempura Vegetables', desc: 'Lightly battered and fried vegetables', price: 130, time: 12}
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
          image: generateImageUrl(item.name, category),
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