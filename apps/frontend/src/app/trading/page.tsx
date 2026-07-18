'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TradingPage() {
  const router = useRouter();
  const [orderType, setOrderType] = useState('market');
  const [side, setSide] = useState('BUY');

  const markets = [
    { symbol: 'Volatility 75', price: '1,234.56', change: '+2.45%', volume: '12.4K' },
    { symbol: 'Volatility 100', price: '5,678.90', change: '-0.87%', volume: '8.2K' },
    { symbol: 'Boom 300', price: '3,456.78', change: '+1.34%', volume: '15.1K' },
    { symbol: 'Crash 300', price: '2,345.67', change: '+3.21%', volume: '9.8K' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <div style={{ width: '260px', background: 'rgba(17,25,40,0.95)', borderRight: '1px solid var(--border)', padding: '40px 24px', position: 'fixed', top: 0, left: 0, bottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', cursor: 'pointer' }} onClick={() => router.push('/dashboard')}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: '16px' }}>I</div>
          <span style={{ fontWeight: 700, fontSize: '15px' }}>IntelliWave</span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {['Dashboard','Trading','Bots','Analytics','Settings'].map(label => (
            <button key={label} onClick={() => router.push('/' + label.toLowerCase())} style={{ padding: '12px 16px', background: label === 'Trading' ? 'rgba(59,130,246,0.1)' : 'transparent', border: 'none', borderRadius: '10px', color: label === 'Trading' ? '#3b82f6' : 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontSize: '13.5px', fontWeight: 500, fontFamily: 'Inter', transition: 'all 150ms' }}>{label}</button>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div style={{ flex: 1, marginLeft: '260px', padding: '40px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        {/* Chart Area */}
        <div>
          <div className="glass-card" style={{ padding: '24px', minHeight: '500px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h1 style={{ fontSize: '20px', fontWeight: 700 }}>Volatility 75 Index</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                  <span className="mono" style={{ fontSize: '24px', fontWeight: 700, color: '#10b981' }}>1,234.56</span>
                  <span className="badge badge-success">+2.45%</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {['1m','5m','15m','1h','4h','1D'].map(tf => (
                  <button key={tf} style={{ padding: '6px 12px', background: tf === '1h' ? 'rgba(59,130,246,0.15)' : 'transparent', border: '1px solid var(--border)', borderRadius: '6px', color: tf === '1h' ? '#3b82f6' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '11px', fontWeight: 600, fontFamily: 'JetBrains Mono' }}>{tf}</button>
                ))}
              </div>
            </div>
            <div style={{ height: '400px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>TradingView Chart Integration</p>
            </div>
          </div>

          {/* Market Watch */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>Market Watch</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Symbol', 'Price', 'Change', 'Volume'].map(h => (
                    <th key={h} style={{ padding: '10px 8px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {markets.map((m, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', cursor: 'pointer' }} onClick={() => {}}>
                    <td style={{ padding: '12px 8px', fontWeight: 600, fontSize: '13px' }}>{m.symbol}</td>
                    <td style={{ padding: '12px 8px', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>{m.price}</td>
                    <td style={{ padding: '12px 8px' }}><span className={`badge ${m.change.startsWith('+') ? 'badge-success' : 'badge-warning'}`}>{m.change}</span></td>
                    <td style={{ padding: '12px 8px', fontSize: '12px', color: 'var(--text-muted)' }}>{m.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trading Panel */}
        <div>
          <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '20px' }}>New Order</h3>
            
            {/* Buy/Sell Toggle */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
              <button onClick={() => setSide('BUY')} style={{ padding: '12px', background: side === 'BUY' ? '#10b981' : 'rgba(16,185,129,0.1)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter', fontSize: '14px' }}>BUY</button>
              <button onClick={() => setSide('SELL')} style={{ padding: '12px', background: side === 'SELL' ? '#ef4444' : 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter', fontSize: '14px' }}>SELL</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className="stat-label" style={{ marginBottom: '6px', display: 'block' }}>Amount (USD)</label>
                <input className="input-field" type="number" placeholder="100" defaultValue="100" />
              </div>
              <div>
                <label className="stat-label" style={{ marginBottom: '6px', display: 'block' }}>Duration</label>
                <select className="input-field">
                  <option>5 Ticks</option>
                  <option>1 Minute</option>
                  <option>5 Minutes</option>
                </select>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Potential Payout</span>
                <span className="mono" style={{ fontWeight: 700, color: '#10b981' }}>+$195.00</span>
              </div>
              <button className="btn-primary" style={{ width: '100%', marginTop: '8px', background: side === 'BUY' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                Place {side} Order
              </button>
            </div>
          </div>

          {/* AI Assistant Preview */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="gradient-text">✦</span> AI Copilot
            </h3>
            <input className="input-field" placeholder="Ask AI about this trade..." style={{ marginBottom: '12px' }} />
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Should I buy?', 'Risk analysis', 'Market sentiment', 'Set stop loss'].map(s => (
                <span key={s} style={{ padding: '6px 12px', background: 'rgba(59,130,246,0.08)', borderRadius: '20px', fontSize: '11px', color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
