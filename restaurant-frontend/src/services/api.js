import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Analytics
export const getAnalyticsSummary = () => api.get('/analytics/summary');
export const getOrdersSummary = (filter = 'daily') => api.get(`/analytics/orders-summary?filter=${filter}`);
export const getRevenueData = (filter = 'daily') => api.get(`/analytics/revenue?filter=${filter}`);
export const getChefStats = () => api.get('/analytics/chef-stats');

// Chefs
export const getAllChefs = () => api.get('/chefs');
export const getChefForAssignment = () => api.get('/chefs/assign');

// Tables
export const getAllTables = () => api.get('/tables');
export const getAvailableTables = (members) => api.get(`/tables/available?members=${members}`);
export const createTable = (data) => api.post('/tables', data);
export const updateTable = (id, data) => api.put(`/tables/${id}`, data);
export const deleteTable = (id) => api.delete(`/tables/${id}`);
export const reserveTable = (id, orderId) => api.post(`/tables/${id}/reserve`, { orderId });
export const freeTable = (id) => api.post(`/tables/${id}/free`);

// Orders
export const getAllOrders = (status = '', orderType = '') => {
  let url = '/orders?';
  if (status) url += `status=${status}&`;
  if (orderType) url += `orderType=${orderType}`;
  return api.get(url);
};
export const getActiveOrders = () => api.get('/orders/active');
export const getOrder = (id) => api.get(`/orders/${id}`);
export const createOrder = (data) => api.post('/orders', data);
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status });
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

// Menu
export const getAllMenuItems = (page = 1, limit = 20, category = '', search = '') => {
  let url = `/menu?page=${page}&limit=${limit}`;
  if (category && category !== 'all') url += `&category=${category}`;
  if (search) url += `&search=${search}`;
  return api.get(url);
};
export const getMenuByCategory = (category, page = 1, limit = 20) => 
  api.get(`/menu/category/${category}?page=${page}&limit=${limit}`);
export const getMenuItem = (id) => api.get(`/menu/${id}`);
export const createMenuItem = (data) => api.post('/menu', data);
export const updateMenuItem = (id, data) => api.put(`/menu/${id}`, data);
export const deleteMenuItem = (id) => api.delete(`/menu/${id}`);
export const toggleMenuItemStock = (id) => api.patch(`/menu/${id}/toggle-stock`);

// Customers
export const getAllCustomers = () => api.get('/customers');
export const getCustomerCount = () => api.get('/customers/count');
export const getCustomerByPhone = (phone) => api.get(`/customers/phone/${phone}`);

export default api;
