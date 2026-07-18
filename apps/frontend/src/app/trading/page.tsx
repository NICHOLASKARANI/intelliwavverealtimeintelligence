'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import TradingChart from '../../components/charts/TradingChart';



const markets = [
  { symbol: 'Volatility 75', price: '1,234.56', change: '+2.45%', high: '1,245.00', low: '1,220.30', sentiment: 'Bullish', aiScore: 72 },
  { symbol: 'Volatility 100', price: '5,678.90', change: '-0.87%', high: '5,720.00', low: '5,650.00', sentiment: 'Bearish', aiScore: 45 },
  { symbol: 'Boom 300', price: '3,456.78', change: '+1.34%', high: '3,480.00', low: '3,420.00', sentiment: 'Bullish', aiScore: 68 },
  { symbol: 'Crash 300', price: '2,345.67', change: '+3.21%', high: '2,380.00', low: '2,300.00', sentiment: 'Bullish', aiScore: 81 },
  { symbol: 'Jump 10', price: '987.65', change: '-1.23%', high: '1,000.00', low: '980.00', sentiment: 'Neutral', aiScore: 55 },
  { symbol: 'Step Index', price: '456.78', change: '+0.45%', high: '460.00', low: '452.00', sentiment: 'Bullish', aiScore: 63 },
];

const positions = [
  { id: 1, symbol: 'Volatility 75', type: 'BUY', entry: '1,210.50', current: '1,234.56', pnl: '+$240.60', pnlPct: '+1.99%', size: '$5,000', stopLoss: '1,190.00', takeProfit: '1,260.00' },
  { id: 2, symbol: 'Boom 300', type: 'BUY', entry: '3,389.20', current: '3,456.78', pnl: '+$67.58', pnlPct: '+1.99%', size: '$3,000', stopLoss: '3,350.00', takeProfit: '3,500.00' },
  { id: 3, symbol: 'Volatility 100', type: 'SELL', entry: '5,720.10', current: '5,678.90', pnl: '-$41.20', pnlPct: '-0.72%', size: '$2,000', stopLoss: '5,750.00', takeProfit: '5,650.00' },
];

const indicators = ['RSI', 'MACD', 'EMA', 'SMA', 'Bollinger', 'ATR', 'Stochastic', 'ADX', 'VWAP', 'Ichimoku'];

export default function TradingPage() {
  const router = useRouter();
  const [selectedMarket, setSelectedMarket] = useState(markets[0]);
  const [orderSide, setOrderSide] = useState('BUY');
  const [amount, setAmount] = useState('100');
  const [duration, setDuration] = useState('5');
  const [durationUnit, setDurationUnit] = useState('ticks');
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['RSI', 'EMA']);

  const toggleIndicator = (ind: string) => {
    setActiveIndicators(prev => prev.includes(ind) ? prev.filter(i => i !== ind) : [...prev, ind]);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0f1e', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(59,130,246,0.1)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ padding: '28px 24px 24px', borderBottom: '1px solid rgba(59,130,246,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(59,130,246,0.3)' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '20px' }}>I</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#f1f5f9' }}>IntelliWave</div>
              <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, textTransform: 'uppercase' }}>Trading Terminal</div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Intelligence', path: '/intelligence' }, { label: 'Trading', path: '/trading' }, { label: 'Bots', path: '/bots' }, { label: 'Analytics', path: '/analytics' }, { label: 'Settings', path: '/settings' }].map(item => (
            <button key={item.path} onClick={() => router.push(item.path)} style={{ width: '100%', padding: '11px 16px', background: item.path === '/trading' ? 'rgba(59,130,246,0.1)' : 'transparent', border: item.path === '/trading' ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent', borderRadius: '10px', color: item.path === '/trading' ? '#3b82f6' : '#94a3b8', cursor: 'pointer', fontSize: '13.5px', fontWeight: 500, marginBottom: '2px', textAlign: 'left', fontFamily: 'inherit' }}>{item.label}</button>
          ))}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(59,130,246,0.1)' }}>
          <button onClick={() => { localStorage.clear(); router.push('/login'); }} style={{ width: '100%', padding: '10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit' }}>Sign Out</button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: '260px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px', padding: '24px' }}>
        {/* Chart + Market Watch */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Chart */}
          <div style={{ background: 'rgba(15,23,41,0.8)', backdropFilter: 'blur(16px)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px' }}>
            <TradingChart data={[]} height={500} symbol={selectedMarket.symbol} />
          </div>

          {/* Indicators Bar */}
          <div style={{ background: 'rgba(15,23,41,0.8)', borderRadius: '12px', border: '1px solid rgba(59,130,246,0.08)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginRight: '8px' }}>Indicators:</span>
            {indicators.map(ind => (
              <button key={ind} onClick={() => toggleIndicator(ind)} style={{
                padding: '6px 14px', fontSize: '11px', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
                background: activeIndicators.includes(ind) ? 'rgba(59,130,246,0.15)' : 'transparent',
                border: `1px solid ${activeIndicators.includes(ind) ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.1)'}`,
                borderRadius: '6px', color: activeIndicators.includes(ind) ? '#3b82f6' : '#64748b', cursor: 'pointer'
              }}>{ind}</button>
            ))}
          </div>

          {/* Market Watch Table */}
          <div style={{ background: 'rgba(15,23,41,0.8)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px' }}>Market Watch</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(59,130,246,0.08)' }}>
                    {['Symbol', 'Price', 'Change', 'High', 'Low', 'Sentiment', 'AI Score'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {markets.map((m, i) => (
                    <tr key={i} onClick={() => setSelectedMarket(m)} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', cursor: 'pointer', background: selectedMarket.symbol === m.symbol ? 'rgba(59,130,246,0.04)' : 'transparent' }}>
                      <td style={{ padding: '12px', fontWeight: 600, fontSize: '13px', color: '#f1f5f9' }}>{m.symbol}</td>
                      <td style={{ padding: '12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#e2e8f0' }}>{m.price}</td>
                      <td style={{ padding: '12px', fontWeight: 600, fontSize: '13px', color: m.change.startsWith('+') ? '#10b981' : '#ef4444' }}>{m.change}</td>
                      <td style={{ padding: '12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#94a3b8' }}>{m.high}</td>
                      <td style={{ padding: '12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#94a3b8' }}>{m.low}</td>
                      <td style={{ padding: '12px' }}><span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, background: m.sentiment === 'Bullish' ? 'rgba(16,185,129,0.1)' : m.sentiment === 'Bearish' ? 'rgba(239,68,68,0.1)' : 'rgba(100,116,139,0.1)', color: m.sentiment === 'Bullish' ? '#10b981' : m.sentiment === 'Bearish' ? '#ef4444' : '#64748b' }}>{m.sentiment}</span></td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ flex: 1, height: '4px', background: 'rgba(59,130,246,0.1)', borderRadius: '2px' }}>
                            <div style={{ width: `${m.aiScore}%`, height: '100%', background: m.aiScore > 60 ? '#10b981' : m.aiScore > 40 ? '#f59e0b' : '#ef4444', borderRadius: '2px' }} />
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>{m.aiScore}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Trading Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Order Panel */}
          <div style={{ background: 'rgba(15,23,41,0.8)', backdropFilter: 'blur(16px)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px' }}>New Order</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              <button onClick={() => setOrderSide('BUY')} style={{ padding: '12px', background: orderSide === 'BUY' ? '#10b981' : 'rgba(16,185,129,0.1)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}>BUY</button>
              <button onClick={() => setOrderSide('SELL')} style={{ padding: '12px', background: orderSide === 'SELL' ? '#ef4444' : 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}>SELL</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Amount (USD)</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', color: '#f1f5f9', fontSize: '14px', fontFamily: "'JetBrains Mono', monospace", outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Duration</label>
                  <input type="number" value={duration} onChange={e => setDuration(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', color: '#f1f5f9', fontSize: '14px', fontFamily: "'JetBrains Mono', monospace", outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Unit</label>
                  <select value={durationUnit} onChange={e => setDurationUnit(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', color: '#f1f5f9', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}>
                    <option value="ticks">Ticks</option>
                    <option value="seconds">Seconds</option>
                    <option value="minutes">Minutes</option>
                  </select>
                </div>
              </div>
              <div style={{ background: 'rgba(10,15,30,0.5)', borderRadius: '10px', padding: '14px', display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Potential Payout</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: '#10b981', fontSize: '14px' }}>+${(Number(amount) * 1.95).toFixed(2)}</span>
              </div>
              <button style={{ width: '100%', padding: '14px', background: orderSide === 'BUY' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit', marginTop: '4px', boxShadow: orderSide === 'BUY' ? '0 4px 16px rgba(16,185,129,0.3)' : '0 4px 16px rgba(239,68,68,0.3)' }}>
            Place {orderSide} Order
          </button>
            </div>
          </div>

          {/* Open Positions */}
          <div style={{ background: 'rgba(15,23,41,0.8)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px', flex: 1 }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9', marginBottom: '12px' }}>Open Positions ({positions.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {positions.map(pos => (
                <div key={pos.id} style={{ padding: '14px', background: 'rgba(10,15,30,0.5)', borderRadius: '10px', border: '1px solid rgba(59,130,246,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '13px', color: '#f1f5f9' }}>{pos.symbol}</span>
                      <span style={{ marginLeft: '8px', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: pos.type === 'BUY' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: pos.type === 'BUY' ? '#10b981' : '#ef4444' }}>{pos.type}</span>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '14px', color: pos.pnl.startsWith('+') ? '#10b981' : '#ef4444' }}>{pos.pnl}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '11px', color: '#64748b' }}>
                    <div>Entry: <span style={{ color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>{pos.entry}</span></div>
                    <div>SL: <span style={{ color: '#ef4444', fontFamily: "'JetBrains Mono', monospace" }}>{pos.stopLoss}</span></div>
                    <div>TP: <span style={{ color: '#10b981', fontFamily: "'JetBrains Mono', monospace" }}>{pos.takeProfit}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
