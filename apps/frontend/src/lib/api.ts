import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      document.cookie = 'accessToken=; max-age=0; path=/';
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (data: any) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
  logout: () => api.post('/auth/logout'),
};

export const tradingApi = {
  getPositions: () => api.get('/trading/positions'),
  getOrders: () => api.get('/trading/orders'),
  getHistory: () => api.get('/trading/history'),
  createOrder: (data: any) => api.post('/trading/orders', data),
  closePosition: (id: string) => api.post(`/trading/positions/${id}/close`),
};

export const botApi = {
  getBots: () => api.get('/bots'),
  createBot: (data: any) => api.post('/bots', data),
  startBot: (id: string) => api.post(`/bots/${id}/start`),
  stopBot: (id: string) => api.post(`/bots/${id}/stop`),
  deleteBot: (id: string) => api.delete(`/bots/${id}`),
};

export const analyticsApi = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getPerformance: () => api.get('/analytics/performance'),
  getDailyPnL: (days = 30) => api.get('/analytics/daily-pnl', { params: { days } }),
};

export const notificationApi = {
  getNotifications: () => api.get('/notifications'),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.post('/notifications/read-all'),
};

export default api;
