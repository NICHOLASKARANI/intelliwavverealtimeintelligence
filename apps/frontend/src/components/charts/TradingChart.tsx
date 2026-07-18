'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';

interface ChartProps {
  data: any[];
  height?: number;
  symbol?: string;
}

export default function TradingChart({ data, height = 500, symbol = 'Volatility 75' }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const [timeframe, setTimeframe] = useState('1h');

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      height,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: 'rgba(59,130,246,0.06)' },
        horzLines: { color: 'rgba(59,130,246,0.06)' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: '#3b82f6', width: 1, style: 2, labelBackgroundColor: '#3b82f6' },
        horzLine: { color: '#3b82f6', width: 1, style: 2, labelBackgroundColor: '#3b82f6' },
      },
      rightPriceScale: { borderColor: 'rgba(59,130,246,0.2)', scaleMargins: { top: 0.3, bottom: 0.25 } },
      timeScale: { borderColor: 'rgba(59,130,246,0.2)', timeVisible: true, secondsVisible: false },
      handleScroll: { vertTouchDrag: false },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#10b981', downColor: '#ef4444',
      borderUpColor: '#10b981', borderDownColor: '#ef4444',
      wickUpColor: '#10b981', wickDownColor: '#ef4444',
    });

    const volumeSeries = chart.addHistogramSeries({
      color: 'rgba(59,130,246,0.3)',
      priceFormat: { type: 'volume' },
      priceScaleId: '',
    });
    volumeSeries.priceScale().applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } });

    // Generate sample data if none provided
    if (!data || data.length === 0) {
      const sampleData: any[] = [];
      let price = 1234.56;
      const now = Math.floor(Date.now() / 1000) - 3600 * 200;
      for (let i = 0; i < 200; i++) {
        const open = price + (Math.random() - 0.5) * 20;
        const high = open + Math.random() * 15;
        const low = open - Math.random() * 15;
        const close = low + Math.random() * (high - low);
        price = close;
        sampleData.push({
          time: now + i * 3600,
          open: Math.round(open * 100) / 100,
          high: Math.round(high * 100) / 100,
          low: Math.round(low * 100) / 100,
          close: Math.round(close * 100) / 100,
          value: Math.floor(Math.random() * 1000) + 500,
        });
      }
      candleSeries.setData(sampleData);
      volumeSeries.setData(sampleData.map(d => ({ time: d.time, value: d.value, color: d.close >= d.open ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)' })));
    } else {
      candleSeries.setData(data);
      volumeSeries.setData(data.map((d: any) => ({ time: d.time, value: d.volume || 100, color: d.close >= d.open ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)' })));
    }

    chart.timeScale().fitContent();
    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current) chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, height, timeframe]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>{symbol}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
            <span style={{ fontSize: '24px', fontWeight: 800, color: '#10b981', fontFamily: "'JetBrains Mono', monospace" }}>1,234.56</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '3px 10px', borderRadius: '100px' }}>+2.45%</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['1m', '5m', '15m', '1h', '4h', '1D', '1W'].map(tf => (
            <button key={tf} onClick={() => setTimeframe(tf)} style={{
              padding: '6px 14px', fontSize: '11px', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
              background: timeframe === tf ? 'rgba(59,130,246,0.15)' : 'transparent',
              border: `1px solid ${timeframe === tf ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.1)'}`,
              borderRadius: '6px', color: timeframe === tf ? '#3b82f6' : '#64748b', cursor: 'pointer'
            }}>{tf}</button>
          ))}
        </div>
      </div>
      <div ref={chartContainerRef} style={{ width: '100%', borderRadius: '12px', overflow: 'hidden' }} />
    </div>
  );
}
