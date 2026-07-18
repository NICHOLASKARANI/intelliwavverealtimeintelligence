import api from '../api';

export const adminApi = {
  getSystemStats: () => api.get('/admin/stats'),
  getUsers: (params?: any) => api.get('/admin/users', { params }),
  getUserDetails: (userId: string) => api.get(`/admin/users/${userId}`),
  updateUserStatus: (userId: string, status: string) => api.put(`/admin/users/${userId}/status`, { status }),
  updateUserRole: (userId: string, role: string) => api.put(`/admin/users/${userId}/role`, { role }),
  getRevenueAnalytics: (period?: string) => api.get('/admin/analytics/revenue', { params: { period } }),
  getTradingAnalytics: (period?: string) => api.get('/admin/analytics/trading', { params: { period } }),
  getBotAnalytics: () => api.get('/admin/analytics/bots'),
  getAuditLogs: (params?: any) => api.get('/admin/audit-logs', { params }),
  getSystemHealth: () => api.get('/admin/health'),
  getFeatureFlags: () => api.get('/admin/feature-flags'),
  updateFeatureFlag: (flag: string, value: any) => api.put(`/admin/feature-flags/${flag}`, { value }),
  getSupportTickets: (params?: any) => api.get('/admin/support-tickets', { params }),
  resolveTicket: (ticketId: string) => api.post(`/admin/support-tickets/${ticketId}/resolve`),
};
