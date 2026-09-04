import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('smartstay_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const roomAPI = {
  getAll: () => api.get('/rooms'),
  getById: (id) => api.get(`/rooms/${id}`),
  updateStatus: (id, statusData) => api.put(`/rooms/${id}/status`, statusData),
};

export const bookingAPI = {
  getAll: () => api.get('/bookings'),
  getById: (id) => api.get(`/bookings/${id}`),
  getByCustomer: (customerId) => api.get(`/bookings/customer/${customerId}`),
  create: (bookingData) => api.post('/bookings', bookingData),
  checkIn: (id) => api.put(`/bookings/${id}/check-in`),
  checkOut: (id) => api.put(`/bookings/${id}/check-out`),
};

export const customerAPI = {
  getAll: () => api.get('/customers'),
  getById: (id) => api.get(`/customers/${id}`),
  save: (customerData) => api.post('/customers', customerData),
};

export const employeeAPI = {
  getAll: () => api.get('/employees'),
  save: (employeeData) => api.post('/employees', employeeData),
};

export const restaurantAPI = {
  getCategories: () => api.get('/restaurant/categories'),
  getMenu: () => api.get('/restaurant/menu'),
  getOrders: () => api.get('/restaurant/orders'),
  placeOrder: (orderData) => api.post('/restaurant/orders', orderData),
  updateOrderStatus: (orderId, status) => api.put(`/restaurant/orders/${orderId}/status?status=${status}`),
};

export const inventoryAPI = {
  getAll: () => api.get('/inventory'),
  save: (itemData) => api.post('/inventory', itemData),
};

export const aiAPI = {
  getFoodRecommendations: (customerId) => api.get(`/ai/recommendations/${customerId || 1}`),
  getPublicRecommendations: () => api.get('/ai/public/recommendations'),
  getInventoryPredictions: () => api.get('/ai/inventory-predictions'),
  getOccupancyPrediction: () => api.get('/ai/occupancy-prediction'),
  getRevenuePrediction: () => api.get('/ai/revenue-prediction'),
  getStaffingInsights: () => api.get('/ai/staffing-insights'),
};

export const securityAPI = {
  getLogs: () => api.get('/security/logs'),
  getStats: () => api.get('/security/stats'),
};

export default api;
