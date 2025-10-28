// const express = require('express');
// const router = express.Router();
// const {
//   getAllMenuItems,
//   getMenuByCategory,
//   getMenuItem,
//   createMenuItem,
//   updateMenuItem,
//   deleteMenuItem,
//   toggleStock,
// } = require('../controllers/menuController');

// router.get('/', getAllMenuItems);
// router.get('/category/:category', getMenuByCategory);
// router.get('/:id', getMenuItem);
// router.post('/', createMenuItem);
// router.put('/:id', updateMenuItem);
// router.delete('/:id', deleteMenuItem);
// router.patch('/:id/toggle-stock', toggleStock);

// module.exports = router;




const express = require('express');
const axios = require('axios');
const router = express.Router();

const {
  getAllMenuItems,
  getMenuByCategory,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleStock,
} = require('../controllers/menuController');

router.get('/', getAllMenuItems);
router.get('/category/:category', getMenuByCategory);
router.get('/:id', getMenuItem);
router.post('/', createMenuItem);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);
router.patch('/:id/toggle-stock', toggleStock);

// New route to fetch external menu data from Free Food Menus API
router.get('/external/all', async (req, res) => {
  try {
    // Fetch external menu data
    const response = await axios.get('https://free-food-menus-api-two.vercel.app/all');
    const externalItems = response.data;

    // Map external item structure to your local schema (adjust as needed)
    const mappedItems = externalItems.map(item => ({
      name: item.name,
      price: item.price,
      description: item.dsc,
      imageUrl: item.img,
      category: item.category || 'other',
      // add other fields if needed
    }));

    res.json({ success: true, data: mappedItems });
  } catch (error) {
    console.error('Error fetching external menu:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch external menu' });
  }
});

module.exports = router;
