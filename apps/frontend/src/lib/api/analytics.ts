// apps/frontend/src/lib/api/analytics.ts
import { apiClient } from '../api';

export const analyticsApi = {
  getDashboard: () => apiClient.get('/analytics/dashboard'),
  
  getPerformanceMetrics: (params?: any) => 
    apiClient.get('/analytics/performance', { params }),
  
  getEquityCurve: (days?: number) => 
    apiClient.get('/analytics/equity-curve', { params: { days } }),
  
  getDailyPnL: (days?: number) => 
    apiClient.get('/analytics/daily-pnl', { params: { days } }),
  
  getTradeDistribution: () => 
    apiClient.get('/analytics/trade-distribution'),
  
  getBotAnalytics: () => 
    apiClient.get('/analytics/bot-analytics'),
  
  getTradeCalendar: (month: number, year: number) => 
    apiClient.get('/analytics/calendar', { params: { month, year } }),
  
  exportReport: (format: 'pdf' | 'csv' | 'excel', params?: any) =>
    apiClient.get('/analytics/export', { 
      params: { format, ...params },
      responseType: 'blob',
    }),
};