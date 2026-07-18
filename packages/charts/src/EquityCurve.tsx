// packages/charts/src/EquityCurve.tsx
'use client';

import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface EquityData {
  date: string;
  equity: number;
  pnl?: number;
  drawdown?: number;
}

interface EquityCurveProps {
  data: EquityData[];
  title?: string;
  showDrawdown?: boolean;
  height?: number;
  className?: string;
}

export const EquityCurve: React.FC<EquityCurveProps> = ({
  data,
  title = 'Equity Curve',
  showDrawdown = true,
  height = 400,
  className,
}) => {
  const metrics = useMemo(() => {
    if (data.length === 0) return null;

    const returns = data.map((d, i) => {
      if (i === 0) return 0;
      return ((d.equity - data[i - 1].equity) / data[i - 1].equity) * 100;
    });

    const totalReturn = ((data[data.length - 1].equity - data[0].equity) / data[0].equity) * 100;
    const maxEquity = Math.max(...data.map(d => d.equity));
    const maxDrawdown = data.reduce((max, point) => {
      const drawdown = ((maxEquity - point.equity) / maxEquity) * 100;
      return Math.max(max, drawdown);
    }, 0);

    const positiveReturns = returns.filter(r => r > 0);
    const winRate = (positiveReturns.length / (returns.length - 1)) * 100;

    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    const sharpeRatio = Math.sqrt(variance) > 0 ? (avgReturn / Math.sqrt(variance)) * Math.sqrt(252) : 0;

    return {
      totalReturn,
      maxDrawdown,
      winRate,
      sharpeRatio,
      currentEquity: data[data.length - 1].equity,
    };
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-gray-400 text-sm">{format(new Date(label), 'MMM dd, yyyy')}</p>
          <p className="text-white font-bold">${payload[0].value.toLocaleString()}</p>
          {payload[1] && (
            <p className="text-sm text-gray-400">
              DD: {payload[1].value.toFixed(2)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn('p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800', className)}>
      {/* Header Metrics */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {metrics && (
          <div className="flex space-x-6">
            <MetricBadge label="Return" value={`${metrics.totalReturn.toFixed(2)}%`} positive={metrics.totalReturn > 0} />
            <MetricBadge label="Drawdown" value={`${metrics.maxDrawdown.toFixed(2)}%`} positive={false} />
            <MetricBadge label="Win Rate" value={`${metrics.winRate.toFixed(1)}%`} />
            <MetricBadge label="Sharpe" value={metrics.sharpeRatio.toFixed(2)} />
          </div>
        )}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <defs>
            <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), 'MMM dd')}
            stroke="#6B7280"
            fontSize={12}
          />
          <YAxis
            stroke="#6B7280"
            fontSize={12}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={data[0]?.equity} stroke="rgba(255,255,255,0.3)" strokeDasharray="3 3" />
          <Area
            type="monotone"
            dataKey="equity"
            stroke="#10B981"
            strokeWidth={2}
            fill="url(#colorEquity)"
            dot={false}
          />
          {showDrawdown && (
            <Area
              type="monotone"
              dataKey="drawdown"
              stroke="#EF4444"
              strokeWidth={1}
              fill="url(#colorDrawdown)"
              dot={false}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

const MetricBadge: React.FC<{ label: string; value: string; positive?: boolean }> = ({
  label,
  value,
  positive,
}) => (
  <div className="text-center">
    <p className="text-xs text-gray-500">{label}</p>
    <p className={cn(
      'text-sm font-semibold',
      positive === true ? 'text-green-400' :
      positive === false ? 'text-red-400' :
      'text-white'
    )}>
      {value}
    </p>
  </div>
);