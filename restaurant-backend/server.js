require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Restaurant Management API', 
    version: '1.0.0',
    endpoints: {
      analytics: '/api/analytics',
      chefs: '/api/chefs',
      tables: '/api/tables',
      orders: '/api/orders',
      menu: '/api/menu',
      customers: '/api/customers'
    }
  });
});

// API Routes
app.use('/api/analytics', require('./src/routes/analytics'));
app.use('/api/chefs', require('./src/routes/chefs'));
app.use('/api/tables', require('./src/routes/tables'));
app.use('/api/orders', require('./src/routes/orders'));
app.use('/api/menu', require('./src/routes/menu'));
app.use('/api/customers', require('./src/routes/customers'));

// Error handling middleware
app.use(require('./src/middleware/errorHandler'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found',
    path: req.path 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}`);
});

module.exports = app;
