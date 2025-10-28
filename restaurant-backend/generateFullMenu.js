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

const menuItems = {
  'Burger': [
    'Classic Beef Burger', 'Chicken Deluxe Burger', 'Veggie Burger', 'BBQ Bacon Burger', 'Double Cheese Burger',
    'Mushroom Swiss Burger', 'Spicy Jalapeño Burger', 'Turkey Burger', 'Fish Burger', 'Lamb Burger',
    'Breakfast Burger', 'Hawaiian Burger', 'Blue Cheese Burger', 'Avocado Burger', 'Tex-Mex Burger',
    'Mediterranean Burger', 'Buffalo Chicken Burger', 'Portobello Burger', 'Quinoa Burger', 'Black Bean Burger',
    'Salmon Burger', 'Bison Burger', 'Elk Burger', 'Wagyu Burger', 'Mini Sliders'
  ],
  'Pizza': [
    'Margherita Pizza', 'Pepperoni Supreme', 'Veggie Supreme', 'Meat Lovers Pizza', 'Hawaiian Pizza',
    'BBQ Chicken Pizza', 'White Pizza', 'Buffalo Chicken Pizza', 'Mediterranean Pizza', 'Mushroom Truffle Pizza',
    'Prosciutto Arugula Pizza', 'Four Cheese Pizza', 'Spicy Salami Pizza', 'Seafood Pizza', 'Pesto Chicken Pizza',
    'Mexican Pizza', 'Greek Pizza', 'Thai Chicken Pizza', 'Spinach Ricotta Pizza', 'Caramelized Onion Pizza',
    'Smoked Salmon Pizza', 'Duck Confit Pizza', 'Goat Cheese Pizza', 'Artichoke Pizza', 'Calzone'
  ],
  'Drink': [
    'Fresh Orange Juice', 'Iced Coffee', 'Mango Smoothie', 'Classic Lemonade', 'Green Tea',
    'Chocolate Milkshake', 'Strawberry Smoothie', 'Coconut Water', 'Energy Drink', 'Sparkling Water',
    'Apple Juice', 'Cranberry Juice', 'Pineapple Juice', 'Grape Juice', 'Tomato Juice',
    'Hot Chocolate', 'Chai Latte', 'Matcha Latte', 'Bubble Tea', 'Kombucha',
    'Fresh Lime Soda', 'Virgin Mojito', 'Iced Tea', 'Protein Shake', 'Detox Water'
  ],
  'French Fries': [
    'Classic French Fries', 'Cheese Fries', 'Loaded Fries', 'Sweet Potato Fries', 'Curly Fries',
    'Garlic Parmesan Fries', 'Truffle Fries', 'Chili Cheese Fries', 'Bacon Fries', 'Cajun Fries',
    'Waffle Fries', 'Steak Fries', 'Shoestring Fries', 'Potato Wedges', 'Hash Browns',
    'Onion Rings', 'Mozzarella Sticks', 'Jalapeño Poppers', 'Fried Pickles', 'Zucchini Fries',
    'Avocado Fries', 'Cauliflower Fries', 'Polenta Fries', 'Yuca Fries', 'Plantain Fries'
  ],
  'Veggies': [
    'Caesar Salad', 'Greek Salad', 'Grilled Vegetables', 'Avocado Toast', 'Caprese Salad',
    'Quinoa Bowl', 'Buddha Bowl', 'Roasted Beet Salad', 'Kale Salad', 'Spinach Salad',
    'Arugula Salad', 'Mixed Green Salad', 'Coleslaw', 'Potato Salad', 'Cucumber Salad',
    'Tomato Basil Salad', 'Chickpea Salad', 'Lentil Salad', 'Tabbouleh', 'Fattoush',
    'Waldorf Salad', 'Nicoise Salad', 'Cobb Salad', 'Asian Slaw', 'Fruit Salad'
  ]
};

const additionalCategories = {
  'Pasta': [
    'Spaghetti Carbonara', 'Fettuccine Alfredo', 'Penne Arrabbiata', 'Lasagna Bolognese', 'Ravioli Spinach',
    'Linguine Pesto', 'Rigatoni Vodka', 'Gnocchi Gorgonzola', 'Tortellini Cream', 'Macaroni Cheese',
    'Spaghetti Meatballs', 'Penne Puttanesca', 'Fusilli Primavera', 'Cannelloni Ricotta', 'Orecchiette Sausage',
    'Bucatini Amatriciana', 'Farfalle Salmon', 'Paccheri Seafood', 'Tagliatelle Truffle', 'Agnolotti Butter',
    'Cacio e Pepe', 'Aglio e Olio', 'Pasta e Fagioli', 'Pasta Norma', 'Pasta Vongole'
  ],
  'Sandwich': [
    'Club Sandwich', 'BLT Sandwich', 'Grilled Cheese', 'Reuben Sandwich', 'Philly Cheesesteak',
    'Cuban Sandwich', 'Panini Caprese', 'Turkey Avocado', 'Ham Swiss', 'Tuna Melt',
    'Chicken Salad Sandwich', 'Egg Salad Sandwich', 'Peanut Butter Jelly', 'Meatball Sub', 'Italian Sub',
    'Veggie Wrap', 'Caesar Wrap', 'Buffalo Chicken Wrap', 'Falafel Wrap', 'Greek Gyro',
    'Banh Mi', 'Croque Monsieur', 'Monte Cristo', 'Po Boy', 'Lobster Roll'
  ],
  'Soup': [
    'Tomato Basil Soup', 'Chicken Noodle Soup', 'Mushroom Bisque', 'Clam Chowder', 'Minestrone',
    'French Onion Soup', 'Butternut Squash Soup', 'Lentil Soup', 'Split Pea Soup', 'Vegetable Soup',
    'Beef Stew', 'Chicken Tortilla Soup', 'Corn Chowder', 'Broccoli Cheddar Soup', 'Potato Leek Soup',
    'Gazpacho', 'Pho Bo', 'Miso Soup', 'Wonton Soup', 'Hot and Sour Soup',
    'Borscht', 'Goulash', 'Ramen', 'Tom Yum', 'Mulligatawny'
  ],
  'Dessert': [
    'Chocolate Cake', 'Cheesecake', 'Tiramisu', 'Apple Pie', 'Brownie Sundae',
    'Crème Brûlée', 'Panna Cotta', 'Gelato', 'Sorbet', 'Macarons',
    'Cannoli', 'Baklava', 'Flan', 'Trifle', 'Mousse',
    'Profiteroles', 'Éclair', 'Mille-feuille', 'Tart Tatin', 'Banoffee Pie',
    'Red Velvet Cake', 'Carrot Cake', 'Lemon Bars', 'Pecan Pie', 'Bread Pudding'
  ]
};

const moreCategories = {
  'Seafood': [
    'Grilled Salmon', 'Fish and Chips', 'Shrimp Scampi', 'Lobster Thermidor', 'Crab Cakes',
    'Oysters Rockefeller', 'Mussels Marinara', 'Clam Linguine', 'Tuna Steak', 'Sea Bass',
    'Halibut Fillet', 'Cod Fish', 'Prawns Curry', 'Calamari Rings', 'Octopus Salad',
    'Swordfish Steak', 'Mackerel Grill', 'Sardines Grilled', 'Scallops Pan-seared', 'Monkfish Curry',
    'Paella Seafood', 'Bouillabaisse', 'Cioppino', 'Fish Tacos', 'Sushi Platter'
  ],
  'Chicken': [
    'Grilled Chicken Breast', 'Chicken Parmesan', 'Buffalo Wings', 'Chicken Tikka', 'Fried Chicken',
    'Chicken Teriyaki', 'BBQ Chicken', 'Chicken Fajitas', 'Chicken Curry', 'Chicken Alfredo',
    'Chicken Caesar Salad', 'Chicken Quesadilla', 'Chicken Shawarma', 'Chicken Satay', 'Chicken Marsala',
    'Chicken Piccata', 'Chicken Cacciatore', 'Chicken Cordon Bleu', 'Chicken Kiev', 'Chicken Enchiladas',
    'Chicken Biryani', 'Chicken Pad Thai', 'Chicken Stir Fry', 'Chicken Soup', 'Chicken Sandwich'
  ],
  'Beef': [
    'Ribeye Steak', 'Filet Mignon', 'T-Bone Steak', 'Sirloin Steak', 'Beef Wellington',
    'Prime Rib', 'Beef Brisket', 'Short Ribs', 'Beef Stroganoff', 'Beef Tacos',
    'Beef Stir Fry', 'Beef Curry', 'Meatloaf', 'Beef Stew', 'Corned Beef',
    'Beef Fajitas', 'Beef Enchiladas', 'Beef Chili', 'Beef Bourguignon', 'Beef Teriyaki',
    'Beef Kabobs', 'Beef Ragu', 'Beef Carpaccio', 'Beef Tartare', 'Wagyu Steak'
  ],
  'Noodles': [
    'Pad Thai', 'Lo Mein', 'Chow Mein', 'Ramen Bowl', 'Udon Soup',
    'Pho Bo', 'Laksa', 'Pad See Ew', 'Drunken Noodles', 'Singapore Noodles',
    'Dan Dan Noodles', 'Beef Noodle Soup', 'Chicken Noodle Soup', 'Sesame Noodles', 'Cold Noodles',
    'Yakisoba', 'Soba Noodles', 'Rice Noodles', 'Glass Noodles', 'Instant Noodles',
    'Spicy Noodles', 'Garlic Noodles', 'Peanut Noodles', 'Curry Noodles', 'Coconut Noodles'
  ],
  'Rice': [
    'Fried Rice', 'Chicken Biryani', 'Vegetable Biryani', 'Mutton Biryani', 'Seafood Paella',
    'Risotto Mushroom', 'Risotto Seafood', 'Jambalaya', 'Pilaf Rice', 'Coconut Rice',
    'Sushi Rice', 'Sticky Rice', 'Brown Rice', 'Wild Rice', 'Basmati Rice',
    'Jasmine Rice', 'Arborio Rice', 'Black Rice', 'Red Rice', 'Quinoa Rice',
    'Rice Bowl', 'Rice Pudding', 'Rice Salad', 'Rice Soup', 'Rice Noodles'
  ],
  'Salad': [
    'Caesar Salad', 'Greek Salad', 'Cobb Salad', 'Waldorf Salad', 'Nicoise Salad',
    'Caprese Salad', 'Spinach Salad', 'Arugula Salad', 'Kale Salad', 'Quinoa Salad',
    'Chickpea Salad', 'Lentil Salad', 'Tuna Salad', 'Chicken Salad', 'Egg Salad',
    'Potato Salad', 'Coleslaw', 'Fruit Salad', 'Pasta Salad', 'Rice Salad',
    'Bean Salad', 'Corn Salad', 'Beet Salad', 'Cucumber Salad', 'Tomato Salad'
  ],
  'Breakfast': [
    'Pancakes', 'Waffles', 'French Toast', 'Eggs Benedict', 'Scrambled Eggs',
    'Omelette', 'Breakfast Burrito', 'Avocado Toast', 'Bagel Cream Cheese', 'Cereal Bowl',
    'Oatmeal', 'Granola Bowl', 'Yogurt Parfait', 'Smoothie Bowl', 'Breakfast Sandwich',
    'Hash Browns', 'Bacon Eggs', 'Sausage Links', 'English Muffin', 'Croissant',
    'Danish Pastry', 'Muffin', 'Scone', 'Breakfast Pizza', 'Breakfast Wrap'
  ],
  'Snacks': [
    'Nachos', 'Popcorn', 'Pretzels', 'Chips Dip', 'Hummus Pita',
    'Cheese Platter', 'Fruit Platter', 'Veggie Sticks', 'Trail Mix', 'Nuts Mixed',
    'Crackers', 'Olives', 'Pickles', 'Deviled Eggs', 'Stuffed Mushrooms',
    'Bruschetta', 'Crostini', 'Canapés', 'Spring Rolls', 'Samosas',
    'Empanadas', 'Quesadilla Bites', 'Sliders Mini', 'Meatballs', 'Wings'
  ],
  'Ice Cream': [
    'Vanilla Ice Cream', 'Chocolate Ice Cream', 'Strawberry Ice Cream', 'Mint Chocolate Chip', 'Cookies Cream',
    'Rocky Road', 'Neapolitan', 'Pistachio', 'Butter Pecan', 'Caramel Swirl',
    'Chocolate Fudge', 'Berry Sorbet', 'Mango Sorbet', 'Lemon Sorbet', 'Coconut Ice Cream',
    'Banana Split', 'Sundae Special', 'Milkshake', 'Float', 'Affogato',
    'Gelato', 'Frozen Yogurt', 'Sherbet', 'Popsicle', 'Ice Cream Sandwich'
  ],
  'Coffee': [
    'Espresso', 'Americano', 'Cappuccino', 'Latte', 'Macchiato',
    'Mocha', 'Frappé', 'Cold Brew', 'Iced Coffee', 'Turkish Coffee',
    'French Press', 'Pour Over', 'Drip Coffee', 'Instant Coffee', 'Decaf Coffee',
    'Flat White', 'Cortado', 'Gibraltar', 'Breve', 'Red Eye',
    'Black Eye', 'Café au Lait', 'Café Bombón', 'Café con Leche', 'Irish Coffee'
  ]
};

const imageUrls = {
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

const allCategories = { ...menuItems, ...additionalCategories, ...moreCategories };

const generateFullMenu = async () => {
  try {
    await MenuItem.deleteMany({});
    console.log('🗑️ Cleared existing menu items');

    let totalItems = 0;

    for (const [category, items] of Object.entries(allCategories)) {
      const baseImage = imageUrls[category];
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const price = Math.floor(Math.random() * 300) + 50; // 50-350 price range
        const time = Math.floor(Math.random() * 20) + 5; // 5-25 minutes
        const rating = Math.round((Math.random() * 2 + 3) * 10) / 10; // 3.0-5.0
        
        await MenuItem.create({
          name: item,
          description: `Delicious ${item.toLowerCase()} prepared with fresh ingredients`,
          price,
          category,
          image: `${baseImage}?w=400&h=300&fit=crop&q=80&auto=format&sig=${i}`,
          averagePreparationTime: time,
          inStock: true,
          rating
        });
        
        totalItems++;
      }
      
      console.log(`✅ Created ${items.length} items for ${category}`);
    }

    console.log(`🎉 Created ${totalItems} total menu items across ${Object.keys(allCategories).length} categories!`);
  } catch (error) {
    console.error('❌ Error creating menu:', error);
  }
};

const main = async () => {
  await connectDB();
  await generateFullMenu();
  process.exit(0);
};

main();