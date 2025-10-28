import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Menu Items
export const getAllMenuItems = (page = 1, limit = 20, category = '', search = '') => {
  let url = `/menu?page=${page}&limit=${limit}`;
  if (category && category !== 'All') url += `&category=${category}`;
  if (search) url += `&search=${search}`;
  return api.get(url);
};

// Orders
export const createOrder = (data) => api.post('/orders', data);

export default api;