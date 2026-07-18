import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (data: any) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
};

export const tradingApi = {
  getPositions: () => api.get('/trading/positions'),
  getOrders: () => api.get('/trading/orders'),
  createOrder: (data: any) => api.post('/trading/orders', data),
  closePosition: (id: string) => api.post(`/trading/positions/${id}/close`),
  getHistory: () => api.get('/trading/history'),
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
  getEquityCurve: (days = 30) => api.get('/analytics/equity-curve', { params: { days } }),
  getDailyPnL: () => api.get('/analytics/daily-pnl'),
};

export default api;
