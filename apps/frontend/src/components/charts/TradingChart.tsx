'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createChart, ColorType, CrosshairMode, LineStyle, IChartApi, ISeriesApi, Time } from 'lightweight-charts';

interface Trade {
  time: string; price: number; type: 'buy' | 'sell'; pnl?: number; size?: number;
}

interface ChartProps {
  symbol?: string;
  height?: number;
  theme?: 'dark' | 'light';
  trades?: Trade[];
  onTimeframeChange?: (tf: string) => void;
  onIndicatorToggle?: (ind: string) => void;
}

const TIMEFRAMES = ['1s', '1m', '5m', '15m', '30m', '1h', '4h', '1D', '1W', '1M'];
const INDICATORS = ['RSI', 'MACD', 'EMA', 'SMA', 'Bollinger', 'ATR', 'ADX', 'Stochastic', 'VWAP', 'Ichimoku'];

export default function IntelliWaveChart({ 
  symbol = 'Volatility 75 Index', 
  height = 600, 
  theme = 'dark',
  trades = [],
  onTimeframeChange,
  onIndicatorToggle 
}: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeRef = useRef<ISeriesApi<'Histogram'> | null>(null);
  const [timeframe, setTimeframe] = useState('1h');
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['EMA', 'RSI']);
  const [chartType, setChartType] = useState<'candle' | 'line' | 'area'>('candle');
  const [crosshair, setCrosshair] = useState(true);

  const colors = {
    bg: theme === 'dark' ? '#0a0f1e' : '#ffffff',
    text: theme === 'dark' ? '#94a3b8' : '#64748b',
    grid: theme === 'dark' ? 'rgba(59,130,246,0.06)' : 'rgba(0,0,0,0.06)',
    green: '#10b981', red: '#ef4444', blue: '#3b82f6',
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      height,
      layout: { background: { type: ColorType.Solid, color: colors.bg }, textColor: colors.text },
      grid: { vertLines: { color: colors.grid }, horzLines: { color: colors.grid } },
      crosshair: crosshair ? { mode: CrosshairMode.Normal, vertLine: { color: colors.blue, width: 1, style: 2, labelBackgroundColor: colors.blue }, horzLine: { color: colors.blue, width: 1, style: 2, labelBackgroundColor: colors.blue } } : { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: 'rgba(59,130,246,0.2)', scaleMargins: { top: 0.3, bottom: 0.25 }, autoScale: true },
      timeScale: { borderColor: 'rgba(59,130,246,0.2)', timeVisible: true, secondsVisible: false, barSpacing: 10 },
      handleScroll: { mouseWheel: true, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: true },
      handleScale: { axisPressedMouseMove: true, mouseWheel: true, pinch: true },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: colors.green, downColor: colors.red,
      borderUpColor: colors.green, borderDownColor: colors.red,
      wickUpColor: colors.green, wickDownColor: colors.red,
    });

    const volumeSeries = chart.addHistogramSeries({
      color: 'rgba(59,130,246,0.3)', priceFormat: { type: 'volume' }, priceScaleId: '',
    });
    volumeSeries.priceScale().applyOptions({ scaleMargins: { top: 0.85, bottom: 0 } });

    // Generate realistic sample data
    const data: any[] = [];
    let price = 1234.56; let volume = 500;
    const now = Math.floor(Date.now() / 1000) - 3600 * 500;
    for (let i = 0; i < 500; i++) {
      const volatility = 1 + (Math.sin(i * 0.05) * 0.3);
      const change = (Math.random() - 0.48) * 15 * volatility;
      const open = price; const close = open + change;
      const high = Math.max(open, close) + Math.random() * 8;
      const low = Math.min(open, close) - Math.random() * 8;
      volume = Math.max(100, volume + (Math.random() - 0.5) * 200);
      price = close;
      data.push({ time: now + i * 3600, open: +open.toFixed(2), high: +high.toFixed(2), low: +low.toFixed(2), close: +close.toFixed(2), value: +volume.toFixed(0) });
    }
    candleSeries.setData(data);
    volumeSeries.setData(data.map(d => ({ time: d.time, value: d.value, color: d.close >= d.open ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)' })));

    // Add trade markers
    if (trades.length > 0) {
      const markers: any[] = [];
      trades.forEach((trade, i) => {
        const dataIndex = Math.floor((i / trades.length) * data.length);
        if (data[dataIndex]) {
          markers.push({
            time: data[dataIndex].time, position: trade.type === 'buy' ? 'belowBar' : 'aboveBar',
            color: trade.type === 'buy' ? colors.green : colors.red,
            shape: trade.type === 'buy' ? 'arrowUp' : 'arrowDown',
            text: trade.type === 'buy' ? 'ENTRY' : 'EXIT',
            size: 2,
          });
        }
      });
      markers.length > 0 && candleSeries.setMarkers(markers);
    }

    // Add EMA line
    if (activeIndicators.includes('EMA')) {
      const emaData = calculateEMA(data.map(d => d.close), 20);
      const emaSeries = chart.addLineSeries({ color: '#f59e0b', lineWidth: 2, lineStyle: LineStyle.Solid });
      emaSeries.setData(data.slice(19).map((d, i) => ({ time: d.time, value: +emaData[i].toFixed(2) })));
    }

    chart.timeScale().fitContent();
    chartRef.current = chart;
    candleRef.current = candleSeries;
    volumeRef.current = volumeSeries;

    const handleResize = () => {
      if (containerRef.current) chart.applyOptions({ width: containerRef.current.clientWidth });
    };
    window.addEventListener('resize', handleResize);

    return () => { window.removeEventListener('resize', handleResize); chart.remove(); };
  }, [height, theme, crosshair, activeIndicators, trades]);

  const handleTimeframe = (tf: string) => { setTimeframe(tf); onTimeframeChange?.(tf); };
  const handleIndicator = (ind: string) => {
    const newList = activeIndicators.includes(ind) ? activeIndicators.filter(i => i !== ind) : [...activeIndicators, ind];
    setActiveIndicators(newList); onIndicatorToggle?.(ind);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Chart Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>{symbol}</h3>
          <span style={{ fontSize: '20px', fontWeight: 800, color: '#10b981', fontFamily: "'JetBrains Mono', monospace" }}>1,234.56</span>
          <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>+2.45%</span>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <select value={chartType} onChange={e => setChartType(e.target.value as any)} style={{ padding: '6px 10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#e2e8f0', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", cursor: 'pointer' }}>
            <option value="candle">Candles</option><option value="line">Line</option><option value="area">Area</option>
          </select>
          {TIMEFRAMES.map(tf => (
            <button key={tf} onClick={() => handleTimeframe(tf)} style={{ padding: '5px 10px', fontSize: '11px', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", background: timeframe === tf ? 'rgba(59,130,246,0.2)' : '#1e293b', border: `1px solid ${timeframe === tf ? '#3b82f6' : '#334155'}`, borderRadius: '5px', color: timeframe === tf ? '#3b82f6' : '#94a3b8', cursor: 'pointer' }}>{tf}</button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div ref={containerRef} style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(59,130,246,0.08)' }} />

      {/* Indicators Bar */}
      <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
        {INDICATORS.map(ind => (
          <button key={ind} onClick={() => handleIndicator(ind)} style={{ padding: '5px 12px', fontSize: '10px', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", background: activeIndicators.includes(ind) ? 'rgba(59,130,246,0.15)' : '#1e293b', border: `1px solid ${activeIndicators.includes(ind) ? 'rgba(59,130,246,0.4)' : '#334155'}`, borderRadius: '5px', color: activeIndicators.includes(ind) ? '#3b82f6' : '#64748b', cursor: 'pointer' }}>{ind}</button>
        ))}
        <button onClick={() => setCrosshair(!crosshair)} style={{ padding: '5px 12px', fontSize: '10px', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", background: crosshair ? 'rgba(59,130,246,0.15)' : '#1e293b', border: `1px solid ${crosshair ? 'rgba(59,130,246,0.4)' : '#334155'}`, borderRadius: '5px', color: crosshair ? '#3b82f6' : '#64748b', cursor: 'pointer', marginLeft: 'auto' }}>🎯 Crosshair</button>
      </div>
    </div>
  );
}

function calculateEMA(data: number[], period: number): number[] {
  const k = 2 / (period + 1);
  const ema: number[] = [data[0]];
  for (let i = 1; i < data.length; i++) ema.push(data[i] * k + ema[i - 1] * (1 - k));
  return ema;
}
