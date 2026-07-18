import api from '../api';

export const analyticsApi = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getPerformanceMetrics: (params?: any) => api.get('/analytics/performance', { params }),
  getEquityCurve: (days?: number) => api.get('/analytics/equity-curve', { params: { days } }),
  getDailyPnL: (days?: number) => api.get('/analytics/daily-pnl', { params: { days } }),
  getTradeDistribution: () => api.get('/analytics/trade-distribution'),
  getBotAnalytics: () => api.get('/analytics/bot-analytics'),
  getTradeCalendar: (month: number, year: number) => api.get('/analytics/calendar', { params: { month, year } }),
  exportReport: (format: string, params?: any) => api.get('/analytics/export', { params: { format, ...params }, responseType: 'blob' }),
};
