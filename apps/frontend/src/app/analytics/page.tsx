'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const monthlyData = [
  { month: 'Jan', pnl: 1250, trades: 45, winRate: 68, drawdown: 8.2 },
  { month: 'Feb', pnl: 2340, trades: 52, winRate: 71, drawdown: 6.5 },
  { month: 'Mar', pnl: -890, trades: 38, winRate: 52, drawdown: 15.3 },
  { month: 'Apr', pnl: 3450, trades: 61, winRate: 74, drawdown: 5.1 },
  { month: 'May', pnl: 2100, trades: 55, winRate: 69, drawdown: 9.8 },
  { month: 'Jun', pnl: 4567, trades: 72, winRate: 76, drawdown: 4.2 },
  { month: 'Jul', pnl: 2345, trades: 48, winRate: 71, drawdown: 7.8 },
];

const riskMetrics = [
  { label: 'Sharpe Ratio', value: '2.45', benchmark: '>1.0 Good', status: 'excellent' },
  { label: 'Sortino Ratio', value: '3.12', benchmark: '>2.0 Good', status: 'excellent' },
  { label: 'Max Drawdown', value: '12.4%', benchmark: '<20% Good', status: 'good' },
  { label: 'Calmar Ratio', value: '1.89', benchmark: '>1.0 Good', status: 'good' },
  { label: 'Profit Factor', value: '2.34', benchmark: '>1.5 Good', status: 'excellent' },
  { label: 'Expectancy', value: '$45.20', benchmark: '>0 Good', status: 'excellent' },
  { label: 'Recovery Factor', value: '3.21', benchmark: '>2.0 Good', status: 'excellent' },
  { label: 'Volatility', value: '18.5%', benchmark: '<25% Good', status: 'good' },
];

const symbolPerformance = [
  { symbol: 'Volatility 75', trades: 234, winRate: 68, pnl: 4567, sharpe: 2.1, best: 890, worst: -340 },
  { symbol: 'Boom 300', trades: 189, winRate: 72, pnl: 3450, sharpe: 2.4, best: 670, worst: -280 },
  { symbol: 'Crash 300', trades: 156, winRate: 65, pnl: 2340, sharpe: 1.8, best: 560, worst: -420 },
  { symbol: 'Volatility 100', trades: 123, winRate: 58, pnl: -450, sharpe: 0.9, best: 340, worst: -560 },
  { symbol: 'Step Index', trades: 89, winRate: 74, pnl: 1890, sharpe: 2.6, best: 450, worst: -180 },
];

const calendarData = Array.from({length: 30}, (_, i) => ({
  day: i + 1,
  pnl: (Math.random() - 0.4) * 500,
  trades: Math.floor(Math.random() * 8) + 1,
}));

export default function AnalyticsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');

  const maxAbsPnL = Math.max(...calendarData.map(d => Math.abs(d.pnl)), 1);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0f1e', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(59,130,246,0.08)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(59,130,246,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(59,130,246,0.3)' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '18px' }}>I</span>
            </div>
            <div><div style={{ fontWeight: 700, fontSize: '14px', color: '#f1f5f9' }}>IntelliWave</div><div style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase' }}>Analytics</div></div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '12px 10px' }}>
          {[{ label: 'Dashboard', path: '/dashboard' },{ label: 'Intelligence', path: '/intelligence' },{ label: 'Trading', path: '/trading' },{ label: 'Bots', path: '/bots' },{ label: 'Analytics', path: '/analytics' },{ label: 'Settings', path: '/settings' }].map(item => (
            <button key={item.path} onClick={() => router.push(item.path)} style={{ width: '100%', padding: '10px 14px', background: item.path === '/analytics' ? 'rgba(59,130,246,0.1)' : 'transparent', border: item.path === '/analytics' ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent', borderRadius: '10px', color: item.path === '/analytics' ? '#3b82f6' : '#94a3b8', cursor: 'pointer', fontSize: '13px', fontWeight: 500, marginBottom: '2px', textAlign: 'left', fontFamily: 'inherit' }}>{item.label}</button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: '260px', padding: '32px 36px' }}>
        <header style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em' }}>
            Performance <span style={{ background: 'linear-gradient(135deg, #f59e0b, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Analytics</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>Comprehensive trading performance and risk analysis</p>
        </header>

        {/* Period Selector */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
          {['Daily','Weekly','Monthly','Yearly','All Time'].map(p => (
            <button key={p} onClick={() => setSelectedPeriod(p)} style={{ padding: '8px 16px', fontSize: '11px', fontWeight: 600, background: selectedPeriod === p ? 'rgba(59,130,246,0.1)' : 'transparent', border: `1px solid ${selectedPeriod === p ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.08)'}`, borderRadius: '8px', color: selectedPeriod === p ? '#3b82f6' : '#64748b', cursor: 'pointer', fontFamily: 'inherit' }}>{p}</button>
          ))}
        </div>

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total P&L', value: '+$12,456', color: '#10b981' },
            { label: 'Win Rate', value: '68.4%', color: '#3b82f6' },
            { label: 'Profit Factor', value: '2.34', color: '#8b5cf6' },
            { label: 'Total Trades', value: '1,456', color: '#f59e0b' },
          ].map((kpi, i) => (
            <div key={i} style={{ background: 'rgba(15,23,41,0.8)', borderRadius: '14px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px' }}>
              <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px' }}>{kpi.label}</p>
              <p style={{ fontSize: '24px', fontWeight: 800, color: kpi.color, fontFamily: "'JetBrains Mono', monospace" }}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Monthly Performance Chart */}
        <div style={{ background: 'rgba(15,23,41,0.8)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>Monthly P&L Overview</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '200px', paddingBottom: '30px' }}>
            {monthlyData.map((m, i) => {
              const maxPnl = Math.max(...monthlyData.map(d => Math.abs(d.pnl)));
              const height = (Math.abs(m.pnl) / maxPnl) * 150;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: m.pnl >= 0 ? '#10b981' : '#ef4444' }}>{m.pnl >= 0 ? '+' : ''}{m.pnl}</span>
                  <div style={{ width: '100%', maxWidth: '40px', height: `${height}px`, background: m.pnl >= 0 ? 'linear-gradient(180deg, #10b98140, #10b98110)' : 'linear-gradient(180deg, #ef444440, #ef444410)', borderRadius: '8px 8px 0 0', border: `1px solid ${m.pnl >= 0 ? '#10b98130' : '#ef444430'}`, position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: '#64748b', fontWeight: 600 }}>{m.month}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Risk Metrics + Symbol Performance */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          {/* Risk Metrics */}
          <div style={{ background: 'rgba(15,23,41,0.8)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px' }}>Risk Metrics</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {riskMetrics.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(10,15,30,0.4)', borderRadius: '8px' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#f1f5f9' }}>{m.label}</span>
                    <span style={{ fontSize: '10px', color: '#64748b', marginLeft: '8px' }}>{m.benchmark}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: m.status === 'excellent' ? '#10b981' : '#f59e0b' }}>{m.value}</span>
                    <span style={{ fontSize: '16px' }}>{m.status === 'excellent' ? '🟢' : '🟡'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Symbol Performance */}
          <div style={{ background: 'rgba(15,23,41,0.8)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px' }}>Symbol Performance</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{['Symbol','Trades','Win Rate','P&L','Sharpe','Best','Worst'].map(h => <th key={h} style={{ padding: '8px 8px', textAlign: 'left', color: '#64748b', fontWeight: 600, fontSize: '9px', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
                <tbody>{symbolPerformance.map((s, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '10px 8px', fontWeight: 600, color: '#f1f5f9' }}>{s.symbol}</td>
                    <td style={{ padding: '10px 8px', color: '#94a3b8' }}>{s.trades}</td>
                    <td style={{ padding: '10px 8px', color: s.winRate >= 65 ? '#10b981' : '#f59e0b' }}>{s.winRate}%</td>
                    <td style={{ padding: '10px 8px', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: s.pnl >= 0 ? '#10b981' : '#ef4444' }}>${s.pnl}</td>
                    <td style={{ padding: '10px 8px', color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>{s.sharpe}</td>
                    <td style={{ padding: '10px 8px', color: '#10b981', fontFamily: "'JetBrains Mono', monospace" }}>+${s.best}</td>
                    <td style={{ padding: '10px 8px', color: '#ef4444', fontFamily: "'JetBrains Mono', monospace" }}>-${Math.abs(s.worst)}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </div>

        {/* P&L Calendar Heatmap */}
        <div style={{ background: 'rgba(15,23,41,0.8)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px' }}>P&L Calendar Heatmap</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '4px' }}>
            {calendarData.map((d, i) => {
              const intensity = Math.abs(d.pnl) / maxAbsPnL;
              const bg = d.pnl >= 0 
                ? `rgba(16,185,129,${0.15 + intensity * 0.6})` 
                : `rgba(239,68,68,${0.15 + intensity * 0.6})`;
              return (
                <div key={i} title={`Day ${d.day}: ${d.pnl >= 0 ? '+' : ''}$${d.pnl.toFixed(0)} (${d.trades} trades)`} style={{
                  aspectRatio: '1', background: bg, borderRadius: '6px', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 150ms',
                  border: `1px solid ${d.pnl >= 0 ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                }}>
                  <span style={{ fontSize: '9px', color: '#64748b', fontWeight: 600 }}>{d.day}</span>
                  <span style={{ fontSize: '7px', color: d.pnl >= 0 ? '#10b981' : '#ef4444', fontWeight: 700 }}>{d.trades}T</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px', fontSize: '10px', color: '#64748b' }}>
            <span>🟢 Profit</span><span>🔴 Loss</span><span>Darker = Larger P&L</span>
          </div>
        </div>
      </main>
    </div>
  );
}
