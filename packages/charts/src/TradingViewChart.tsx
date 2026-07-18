// packages/charts/src/TradingViewChart.tsx
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData, Time } from 'lightweight-charts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TradingViewChartProps {
  data: CandlestickData[];
  height?: number;
  width?: number;
  symbol?: string;
  onTimeframeChange?: (timeframe: string) => void;
  onIndicatorAdd?: (indicator: string) => void;
  className?: string;
}

const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d'];
const indicators = ['MA', 'EMA', 'RSI', 'MACD', 'Bollinger', 'Volume'];

export const TradingViewChart: React.FC<TradingViewChartProps> = ({
  data,
  height = 500,
  width,
  symbol = 'R_100',
  onTimeframeChange,
  onIndicatorAdd,
  className,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [activeTimeframe, setActiveTimeframe] = useState('1h');
  const [activeIndicators, setActiveIndicators] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!chartContainerRef.current || data.length === 0) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      width: width || chartContainerRef.current.clientWidth,
      height,
      layout: {
        background: { color: 'transparent' },
        textColor: '#9CA3AF',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: '#6B7280',
          width: 1,
          style: 3,
        },
        horzLine: {
          color: '#6B7280',
          width: 1,
          style: 3,
        },
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.2)',
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.2)',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Add candlestick series
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#10B981',
      downColor: '#EF4444',
      borderDownColor: '#EF4444',
      borderUpColor: '#10B981',
      wickDownColor: '#EF4444',
      wickUpColor: '#10B981',
    });

    candleSeries.setData(data);
    chart.timeScale().fitContent();

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, height, width]);

  const handleTimeframeChange = (timeframe: string) => {
    setActiveTimeframe(timeframe);
    onTimeframeChange?.(timeframe);
  };

  const handleIndicatorToggle = (indicator: string) => {
    const newIndicators = activeIndicators.includes(indicator)
      ? activeIndicators.filter(i => i !== indicator)
      : [...activeIndicators, indicator];
    
    setActiveIndicators(newIndicators);
    onIndicatorAdd?.(indicator);
  };

  return (
    <Card className={cn('p-4 bg-gray-900/50 backdrop-blur-xl border-gray-800', className)}>
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="text-xl font-bold text-white">{symbol}</h3>
            <p className="text-sm text-gray-400">
              {data[data.length - 1]?.close} 
              <span className="text-green-400 ml-2">+2.5%</span>
            </p>
          </div>
        </div>

        {/* Timeframes */}
        <div className="flex space-x-1">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              size="sm"
              variant={activeTimeframe === tf ? 'default' : 'ghost'}
              onClick={() => handleTimeframeChange(tf)}
              className={cn(
                'px-3 py-1 text-xs',
                activeTimeframe === tf
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        )}
        <div ref={chartContainerRef} className="w-full" style={{ height }} />
      </div>

      {/* Indicators */}
      <div className="flex items-center space-x-2 mt-4">
        <span className="text-sm text-gray-400 mr-2">Indicators:</span>
        {indicators.map((indicator) => (
          <Button
            key={indicator}
            size="sm"
            variant={activeIndicators.includes(indicator) ? 'default' : 'outline'}
            onClick={() => handleIndicatorToggle(indicator)}
            className={cn(
              'px-3 py-1 text-xs rounded-full',
              activeIndicators.includes(indicator)
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
            )}
          >
            {indicator}
          </Button>
        ))}
      </div>
    </Card>
  );
};