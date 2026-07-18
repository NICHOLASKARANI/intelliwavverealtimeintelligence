'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import IntelliWaveChart from '../../components/charts/TradingChart';
import MarketExplorer from '../../components/trading/MarketExplorer';
import AICopilot from '../../components/trading/AICopilot';

const positions = [
  { symbol: 'Volatility 75', type: 'LONG', entry: '1,210.50', current: '1,234.56', pnl: '+$240.60', pnlPct: '+1.99%', sl: '1,190.00', tp: '1,260.00' },
  { symbol: 'Boom 300', type: 'LONG', entry: '3,389.20', current: '3,456.78', pnl: '+$67.58', pnlPct: '+1.99%', sl: '3,350.00', tp: '3,500.00' },
  { symbol: 'Volatility 100', type: 'SHORT', entry: '5,720.10', current: '5,678.90', pnl: '-$41.20', pnlPct: '-0.72%', sl: '5,750.00', tp: '5,650.00' },
];

const recentTrades = [
  { time: '14:32:15', symbol: 'Volatility 75', type: 'BUY', price: '1,210.50', pnl: '+$240.60' },
  { time: '14:28:42', symbol: 'Boom 300', type: 'BUY', price: '3,389.20', pnl: '+$67.58' },
  { time: '14:15:08', symbol: 'Volatility 100', type: 'SELL', price: '5,720.10', pnl: '-$41.20' },
];

export default function TradingPage() {
  const router = useRouter();
  const [selectedMarket, setSelectedMarket] = useState<any>(null);
  const [side, setSide] = useState('BUY');
  const [amount, setAmount] = useState('100');
  const [activeTab, setActiveTab] = useState('positions');

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0f1e', fontFamily: "'Inter', system-ui, sans-serif", overflow: 'hidden' }}>
      {/* LEFT: Market Explorer */}
      <div style={{ width: '280px', background: 'rgba(15,23,42,0.95)', borderRight: '1px solid rgba(59,130,246,0.08)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(59,130,246,0.08)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: '14px', cursor: 'pointer' }} onClick={() => router.push('/dashboard')}>I</div>
          <span style={{ fontWeight: 700, fontSize: '13px', color: '#f1f5f9' }}>IntelliWave</span>
        </div>
        <MarketExplorer onSelect={setSelectedMarket} />
      </div>

      {/* CENTER: Chart + Bottom Panels */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        {/* Top Bar */}
        <div style={{ padding: '10px 20px', borderBottom: '1px solid rgba(59,130,246,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15,23,42,0.95)', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['Dashboard','Intelligence','Trading','Bots','Analytics','Settings'].map(l => (
              <button key={l} onClick={() => router.push('/'+l.toLowerCase())} style={{ padding: '6px 14px', background: l === 'Trading' ? 'rgba(59,130,246,0.1)' : 'transparent', border: 'none', borderRadius: '6px', color: l === 'Trading' ? '#3b82f6' : '#94a3b8', cursor: 'pointer', fontSize: '12px', fontWeight: 500, fontFamily: 'inherit' }}>{l}</button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Balance:</span>
            <span style={{ fontWeight: 700, color: '#10b981', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px' }}>$12,450.00</span>
          </div>
        </div>

        {/* Chart */}
        <div style={{ flex: 1, padding: '16px', overflow: 'hidden' }}>
          <IntelliWaveChart symbol={selectedMarket?.symbol || 'Volatility 75 Index'} height={500} trades={[{time:'',price:0,type:'buy'},{time:'',price:0,type:'sell'}]} />
        </div>

        {/* Bottom Panels */}
        <div style={{ borderTop: '1px solid rgba(59,130,246,0.08)', background: 'rgba(15,23,42,0.95)', flexShrink: 0 }}>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(59,130,246,0.08)' }}>
            {['positions','orders','history','alerts'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', background: 'transparent', border: 'none', borderBottom: activeTab === tab ? '2px solid #3b82f6' : '2px solid transparent', color: activeTab === tab ? '#f1f5f9' : '#64748b', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit', textTransform: 'capitalize' }}>{tab}</button>
            ))}
          </div>
          <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '8px 16px' }}>
            {activeTab === 'positions' && (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{['Symbol','Type','Entry','Current','P&L','SL','TP'].map(h => <th key={h} style={{ padding: '8px 10px', textAlign: 'left', color: '#64748b', fontWeight: 600, fontSize: '10px', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
                <tbody>{positions.map((p,i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '8px 10px', fontWeight: 600, color: '#f1f5f9' }}>{p.symbol}</td>
                    <td style={{ padding: '8px 10px' }}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: p.type === 'LONG' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: p.type === 'LONG' ? '#10b981' : '#ef4444' }}>{p.type}</span></td>
                    <td style={{ padding: '8px 10px', fontFamily: "'JetBrains Mono', monospace", color: '#94a3b8' }}>{p.entry}</td>
                    <td style={{ padding: '8px 10px', fontFamily: "'JetBrains Mono', monospace", color: '#e2e8f0' }}>{p.current}</td>
                    <td style={{ padding: '8px 10px', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: p.pnl.startsWith('+') ? '#10b981' : '#ef4444' }}>{p.pnl}</td>
                    <td style={{ padding: '8px 10px', fontFamily: "'JetBrains Mono', monospace", color: '#ef4444' }}>{p.sl}</td>
                    <td style={{ padding: '8px 10px', fontFamily: "'JetBrains Mono', monospace", color: '#10b981' }}>{p.tp}</td>
                  </tr>
                ))}</tbody>
              </table>
            )}
            {activeTab === 'history' && (
              <div>{recentTrades.map((t,i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '12px' }}>
                  <span style={{ color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>{t.time}</span>
                  <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{t.symbol}</span>
                  <span style={{ color: t.type === 'BUY' ? '#10b981' : '#ef4444', fontWeight: 600 }}>{t.type}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#94a3b8' }}>{t.price}</span>
                  <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: t.pnl.startsWith('+') ? '#10b981' : '#ef4444' }}>{t.pnl}</span>
                </div>
              ))}</div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Order Entry + AI */}
      <div style={{ width: '320px', borderLeft: '1px solid rgba(59,130,246,0.08)', display: 'flex', flexDirection: 'column', background: 'rgba(15,23,42,0.95)', flexShrink: 0 }}>
        {/* Order Panel */}
        <div style={{ padding: '16px', borderBottom: '1px solid rgba(59,130,246,0.08)' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9', marginBottom: '12px' }}>New Order</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '12px' }}>
            <button onClick={() => setSide('BUY')} style={{ padding: '10px', background: side === 'BUY' ? '#10b981' : 'rgba(16,185,129,0.1)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit' }}>BUY</button>
            <button onClick={() => setSide('SELL')} style={{ padding: '10px', background: side === 'SELL' ? '#ef4444' : 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit' }}>SELL</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (USD)" style={{ padding: '10px', background: '#0f1729', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: "'JetBrains Mono', monospace", outline: 'none' }} />
            <select style={{ padding: '10px', background: '#0f1729', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}>
              <option>5 Ticks</option><option>1 Minute</option><option>5 Minutes</option><option>15 Minutes</option>
            </select>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(10,15,30,0.5)', borderRadius: '8px', fontSize: '12px' }}>
              <span style={{ color: '#64748b' }}>Payout</span><span style={{ fontWeight: 700, color: '#10b981', fontFamily: "'JetBrains Mono', monospace" }}>+${(Number(amount) * 1.95).toFixed(2)}</span>
            </div>
            <button style={{ padding: '12px', background: side === 'BUY' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: side === 'BUY' ? '0 4px 16px rgba(16,185,129,0.3)' : '0 4px 16px rgba(239,68,68,0.3)' }}>Place {side} Order</button>
          </div>
        </div>

        {/* AI Copilot */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <AICopilot />
        </div>
      </div>
    </div>
  );
}
