const axios = require('axios');

async function testFetch() {
  try {
    const res = await axios.get('https://free-food-menus-api-two.vercel.app/all');
    console.log(res.data);
  } catch (error) {
    console.error('Error fetching:', error.message);
  }
}

testFetch();
