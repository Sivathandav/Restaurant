const axios = require('axios');
const MenuItem = require('../models/MenuItem'); // ✅ adjust path if needed

// Fetch and insert external menu items
exports.importExternalMenuItems = async (req, res) => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const meals = response.data.meals;

    if (!meals || meals.length === 0) {
      return res.status(404).json({ success: false, message: 'No meals found in external API' });
    }

    const formattedItems = meals.map(meal => ({
      name: meal.strMeal,
      description: meal.strInstructions?.substring(0, 120) || 'Delicious meal',
      price: (Math.random() * (500 - 120) + 120).toFixed(2),
      averagePreparationTime: Math.floor(Math.random() * (45 - 10) + 10),
      category: mapCategory(meal.strCategory),
      inStock: true,
      rating: Math.floor(Math.random() * 5) + 1,
      image: meal.strMealThumb,
    }));

    // Prevent duplicates
    const existingNames = (await MenuItem.find({}, 'name')).map(i => i.name);
    const newItems = formattedItems.filter(i => !existingNames.includes(i.name));

    const inserted = await MenuItem.insertMany(newItems);
    res.json({ success: true, insertedCount: inserted.length, data: inserted });
  } catch (error) {
    console.error('Error importing menu:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching external menu' });
  }
};

// Helper
function mapCategory(category) {
  const map = {
    'Beef': 'Burger',
    'Chicken': 'Burger',
    'Seafood': 'Veggies',
    'Dessert': 'French Fries',
    'Breakfast': 'Drink',
    'Pasta': 'Pizza',
  };
  return map[category] || 'Veggies';
}
