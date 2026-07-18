// apps/frontend/src/components/dashboard/RealTimeWidgets.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { socket } from '@/lib/socket';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Clock,
  AlertTriangle,
} from 'lucide-react';

interface LiveTrade {
  id: string;
  symbol: string;
  type: string;
  amount: number;
  profit: number;
  timestamp: Date;
}

interface MarketPrice {
  symbol: string;
  bid: number;
  ask: number;
  change: number;
  changePercent: number;
}

export const RealTimeTradeFeed = () => {
  const [trades, setTrades] = useState<LiveTrade[]>([]);

  useEffect(() => {
    socket.on('trade:new', (trade: LiveTrade) => {
      setTrades(prev => [trade, ...prev].slice(0, 20));
    });

    return () => {
      socket.off('trade:new');
    };
  }, []);

  return (
    <Card className="p-4 bg-gray-900/50 backdrop-blur-xl border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Live Trades</h3>
        <Activity className="w-4 h-4 text-green-400 animate-pulse" />
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {trades.map((trade) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  'p-2 rounded-full',
                  trade.type === 'BUY' ? 'bg-green-500/10' : 'bg-red-500/10'
                )}>
                  {trade.type === 'BUY' ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{trade.symbol}</p>
                  <p className="text-xs text-gray-400">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {new Date(trade.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">${trade.amount}</p>
                <p className={cn(
                  'text-xs font-medium',
                  trade.profit > 0 ? 'text-green-400' : 'text-red-400'
                )}>
                  {trade.profit > 0 ? '+' : ''}{trade.profit}%
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export const MarketWatch = () => {
  const [prices, setPrices] = useState<MarketPrice[]>([
    { symbol: 'Volatility 75', bid: 1234.56, ask: 1235.78, change: 15.23, changePercent: 1.25 },
    { symbol: 'Volatility 100', bid: 5678.90, ask: 5680.12, change: -23.45, changePercent: -0.41 },
    { symbol: 'Boom 300', bid: 3456.78, ask: 3458.90, change: 45.67, changePercent: 1.34 },
    { symbol: 'Crash 300', bid: 2345.67, ask: 2347.89, change: -12.34, changePercent: -0.52 },
  ]);

  useEffect(() => {
    socket.on('price:update', (update: any) => {
      setPrices(prev => prev.map(p => 
        p.symbol === update.symbol ? { ...p, ...update } : p
      ));
    });

    return () => {
      socket.off('price:update');
    };
  }, []);

  return (
    <Card className="p-4 bg-gray-900/50 backdrop-blur-xl border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-4">Market Watch</h3>
      <div className="space-y-2">
        {prices.map((price) => (
          <motion.div
            key={price.symbol}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-white">{price.symbol}</p>
              <p className="text-xs text-gray-400">
                Bid: {price.bid} / Ask: {price.ask}
              </p>
            </div>
            <div className="text-right">
              <p className={cn(
                'text-sm font-semibold',
                price.change > 0 ? 'text-green-400' : 'text-red-400'
              )}>
                {price.change > 0 ? '+' : ''}{price.change}
              </p>
              <p className={cn(
                'text-xs',
                price.changePercent > 0 ? 'text-green-400' : 'text-red-400'
              )}>
                {price.changePercent > 0 ? '+' : ''}{price.changePercent}%
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export const ActiveBotsWidget = () => {
  const [bots, setBots] = useState([
    { id: 1, name: 'MA Crossover', status: 'ACTIVE', profit: 125.50, trades: 45 },
    { id: 2, name: 'RSI Scalper', status: 'ACTIVE', profit: -23.40, trades: 32 },
    { id: 3, name: 'Grid Bot', status: 'PAUSED', profit: 340.20, trades: 89 },
  ]);

  return (
    <Card className="p-4 bg-gray-900/50 backdrop-blur-xl border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-4">Active Bots</h3>
      <div className="space-y-3">
        {bots.map((bot) => (
          <div key={bot.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={cn(
                'w-2 h-2 rounded-full',
                bot.status === 'ACTIVE' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
              )} />
              <div>
                <p className="text-sm font-medium text-white">{bot.name}</p>
                <p className="text-xs text-gray-400">{bot.trades} trades today</p>
              </div>
            </div>
            <div className="text-right">
              <p className={cn(
                'text-sm font-semibold',
                bot.profit > 0 ? 'text-green-400' : 'text-red-400'
              )}>
                {bot.profit > 0 ? '+' : ''}${bot.profit}
              </p>
              <span className={cn(
                'text-xs px-2 py-0.5 rounded-full',
                bot.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
              )}>
                {bot.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export const RiskAlertsWidget = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'DRAWDOWN', message: 'Portfolio drawdown approaching 15%', severity: 'WARNING' },
    { id: 2, type: 'LOSS_LIMIT', message: 'Daily loss limit 80% reached', severity: 'CRITICAL' },
    { id: 3, type: 'VOLATILITY', message: 'High volatility detected in Volatility 75', severity: 'INFO' },
  ]);

  return (
    <Card className="p-4 bg-gray-900/50 backdrop-blur-xl border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Risk Alerts</h3>
        <AlertTriangle className="w-4 h-4 text-yellow-400" />
      </div>
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              'p-3 rounded-lg border',
              alert.severity === 'CRITICAL' ? 'border-red-500/20 bg-red-500/5' :
              alert.severity === 'WARNING' ? 'border-yellow-500/20 bg-yellow-500/5' :
              'border-blue-500/20 bg-blue-500/5'
            )}
          >
            <div className="flex items-start space-x-2">
              <AlertTriangle className={cn(
                'w-4 h-4 mt-0.5',
                alert.severity === 'CRITICAL' ? 'text-red-400' :
                alert.severity === 'WARNING' ? 'text-yellow-400' :
                'text-blue-400'
              )} />
              <div>
                <p className="text-sm text-white">{alert.message}</p>
                <span className={cn(
                  'text-xs px-2 py-0.5 rounded-full mt-1 inline-block',
                  alert.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-400' :
                  alert.severity === 'WARNING' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-blue-500/10 text-blue-400'
                )}>
                  {alert.severity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};