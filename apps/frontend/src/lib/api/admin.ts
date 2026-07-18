// apps/frontend/src/lib/api/admin.ts
import { apiClient } from '../api';

export const adminApi = {
  // System Stats
  getSystemStats: () => apiClient.get('/admin/stats'),
  
  // User Management
  getUsers: (params?: any) => apiClient.get('/admin/users', { params }),
  getUserDetails: (userId: string) => apiClient.get(`/admin/users/${userId}`),
  updateUserStatus: (userId: string, status: string) =>
    apiClient.put(`/admin/users/${userId}/status`, { status }),
  updateUserRole: (userId: string, role: string) =>
    apiClient.put(`/admin/users/${userId}/role`, { role }),
  
  // Analytics
  getRevenueAnalytics: (period?: string) =>
    apiClient.get('/admin/analytics/revenue', { params: { period } }),
  getTradingAnalytics: (period?: string) =>
    apiClient.get('/admin/analytics/trading', { params: { period } }),
  getBotAnalytics: () => apiClient.get('/admin/analytics/bots'),
  
  // Audit & Monitoring
  getAuditLogs: (params?: any) => apiClient.get('/admin/audit-logs', { params }),
  getSystemHealth: () => apiClient.get('/admin/health'),
  
  // Feature Flags
  getFeatureFlags: () => apiClient.get('/admin/feature-flags'),
  updateFeatureFlag: (flag: string, value: any) =>
    apiClient.put(`/admin/feature-flags/${flag}`, { value }),
  
  // Support
  getSupportTickets: (params?: any) =>
    apiClient.get('/admin/support-tickets', { params }),
  resolveTicket: (ticketId: string) =>
    apiClient.post(`/admin/support-tickets/${ticketId}/resolve`),
};