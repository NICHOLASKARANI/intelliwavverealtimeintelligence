// apps/frontend/src/app/admin/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { adminApi } from '@/lib/api';
import { cn } from '@/lib/utils';
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Shield,
  Bot,
  BarChart3,
  Settings,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Server,
  Database,
  Wifi,
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [health, setHealth] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [statsData, usersData, logsData, healthData] = await Promise.all([
        adminApi.getSystemStats(),
        adminApi.getUsers({ limit: 50 }),
        adminApi.getAuditLogs({ limit: 50 }),
        adminApi.getSystemHealth(),
      ]);

      setStats(statsData);
      setUsers(usersData.users);
      setAuditLogs(logsData.logs);
      setHealth(healthData);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className={cn('p-2 rounded-lg', `bg-${color}-500/10`)}>
            <Icon className={cn('w-6 h-6', `text-${color}-400`)} />
          </div>
          {change && (
            <Badge className={change > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}>
              {change > 0 ? '+' : ''}{change}%
            </Badge>
          )}
        </div>
        <h3 className="text-sm text-gray-400">{title}</h3>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">System management and monitoring</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={fetchAdminData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats?.users?.total || 0}
          change={12}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Bots"
          value={stats?.bots?.active || 0}
          change={8}
          icon={Bot}
          color="green"
        />
        <StatCard
          title="Total Revenue"
          value={`$${(stats?.revenue || 0).toLocaleString()}`}
          change={23}
          icon={DollarSign}
          color="purple"
        />
        <StatCard
          title="Active Users"
          value={stats?.users?.active || 0}
          change={-3}
          icon={Activity}
          color="orange"
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="bg-gray-900/50 border border-gray-800">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-gray-800 text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Role</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Bots</th>
                    <th className="pb-3 font-medium">Trades</th>
                    <th className="pb-3 font-medium">Last Login</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-800/50 hover:bg-white/5">
                      <td className="py-3">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-3">
                        <Badge className="bg-blue-500/10 text-blue-400">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <span className={cn(
                          'inline-flex items-center px-2 py-1 rounded-full text-xs',
                          user.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400' :
                          user.status === 'SUSPENDED' ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-red-500/10 text-red-400'
                        )}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-white">{user._count.bots}</td>
                      <td className="py-3 text-sm text-white">{user._count.trades}</td>
                      <td className="py-3 text-sm text-gray-400">
                        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                            Ban
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Revenue Overview</h3>
              <div className="h-64 flex items-center justify-center text-gray-500">
                Revenue chart will be displayed here
              </div>
            </Card>
            <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Trading Volume</h3>
              <div className="h-64 flex items-center justify-center text-gray-500">
                Trading volume chart will be displayed here
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Database</h3>
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400">Healthy</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Latency</span>
                  <span className="text-white">{health?.services?.database?.latency || 'N/A'}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Redis</h3>
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400">Connected</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Memory</span>
                  <span className="text-white">256 MB / 1 GB</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">API Server</h3>
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-white">15d 12h 34m</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Requests/min</span>
                  <span className="text-white">1,234</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Audit Logs Tab */}
        <TabsContent value="audit">
          <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
                    <th className="pb-3 font-medium">Timestamp</th>
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Action</th>
                    <th className="pb-3 font-medium">Entity</th>
                    <th className="pb-3 font-medium">IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-800/50">
                      <td className="py-3 text-sm text-gray-400">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3 text-sm text-white">
                        {log.user?.email || 'System'}
                      </td>
                      <td className="py-3">
                        <Badge className="bg-blue-500/10 text-blue-400">
                          {log.action}
                        </Badge>
                      </td>
                      <td className="py-3 text-sm text-white">{log.entity}</td>
                      <td className="py-3 text-sm text-gray-400">{log.ipAddress || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Feature Flags</h3>
            <div className="space-y-4">
              {[
                { name: 'AI Trading', key: 'ENABLE_AI_TRADING', enabled: true },
                { name: 'Copy Trading', key: 'ENABLE_COPY_TRADING', enabled: true },
                { name: 'Social Features', key: 'ENABLE_SOCIAL_FEATURES', enabled: false },
                { name: 'Maintenance Mode', key: 'MAINTENANCE_MODE', enabled: false },
              ].map((flag) => (
                <div key={flag.key} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-white">{flag.name}</p>
                    <p className="text-xs text-gray-400">{flag.key}</p>
                  </div>
                  <button
                    className={cn(
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                      flag.enabled ? 'bg-blue-600' : 'bg-gray-600'
                    )}
                  >
                    <span
                      className={cn(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        flag.enabled ? 'translate-x-6' : 'translate-x-1'
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}