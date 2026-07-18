'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const strategies = [
  { id: 1, name: 'MA Crossover Pro', type: 'Trend Following', symbol: 'Volatility 75', status: 'Running', profit: '+$1,245.80', trades: 234, winRate: '68.4%', capital: '$10,000', risk: 'Medium', lastRun: '2 min ago' },
  { id: 2, name: 'RSI Scalper V2', type: 'Mean Reversion', symbol: 'Volatility 100', status: 'Running', profit: '-$89.50', trades: 156, winRate: '52.1%', capital: '$5,000', risk: 'High', lastRun: '30 sec ago' },
  { id: 3, name: 'Grid Master 3000', type: 'Grid Trading', symbol: 'Boom 300', status: 'Stopped', profit: '+$3,456.20', trades: 567, winRate: '72.8%', capital: '$20,000', risk: 'Low', lastRun: '1 hour ago' },
  { id: 4, name: 'Bollinger Bounce', type: 'Volatility', symbol: 'Crash 300', status: 'Running', profit: '+$678.90', trades: 89, winRate: '64.3%', capital: '$7,500', risk: 'Medium', lastRun: '5 min ago' },
  { id: 5, name: 'DCA Accumulator', type: 'Accumulation', symbol: 'Step Index', status: 'Running', profit: '+$234.50', trades: 45, winRate: '81.2%', capital: '$3,000', risk: 'Low', lastRun: '10 min ago' },
  { id: 6, name: 'Martingale Control', type: 'Recovery', symbol: 'Jump 10', status: 'Paused', profit: '-$456.00', trades: 312, winRate: '45.8%', capital: '$2,500', risk: 'Very High', lastRun: '30 min ago' },
];

export default function BotsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredBots = strategies.filter(b => {
    if (filter !== 'All' && b.status !== filter) return false;
    if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalProfit = strategies.reduce((sum, s) => sum + parseFloat(s.profit.replace(/[^0-9.-]/g, '')), 0);
  const activeBots = strategies.filter(s => s.status === 'Running').length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0f1e', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <aside style={{ width: '260px', background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(59,130,246,0.1)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ padding: '28px 24px 24px', borderBottom: '1px solid rgba(59,130,246,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(59,130,246,0.3)' }}><span style={{ color: 'white', fontWeight: 800, fontSize: '20px' }}>I</span></div>
            <div><div style={{ fontWeight: 700, fontSize: '15px', color: '#f1f5f9' }}>IntelliWave</div><div style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, textTransform: 'uppercase' }}>Bot Manager</div></div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Intelligence', path: '/intelligence' }, { label: 'Trading', path: '/trading' }, { label: 'Bots', path: '/bots' }, { label: 'Analytics', path: '/analytics' }, { label: 'Settings', path: '/settings' }].map(item => (
            <button key={item.path} onClick={() => router.push(item.path)} style={{ width: '100%', padding: '11px 16px', background: item.path === '/bots' ? 'rgba(59,130,246,0.1)' : 'transparent', border: item.path === '/bots' ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent', borderRadius: '10px', color: item.path === '/bots' ? '#3b82f6' : '#94a3b8', cursor: 'pointer', fontSize: '13.5px', fontWeight: 500, marginBottom: '2px', textAlign: 'left', fontFamily: 'inherit' }}>{item.label}</button>
          ))}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(59,130,246,0.1)' }}>
          <button onClick={() => { router.push('/logout'); }} style={{ width: '100%', padding: '10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit' }}>Sign Out</button>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: '260px', padding: '36px 40px' }}>
        <header style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em' }}>Trading <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Bots</span></h1>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>Automated trading strategies with AI-powered execution</p>
            </div>
            <button style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(59,130,246,0.3)' }}>+ Create New Bot</button>
          </div>
        </header>

        {/* Stats Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
          <div style={{ background: 'rgba(15,23,41,0.8)', borderRadius: '14px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Active Bots</p>
            <p style={{ fontSize: '28px', fontWeight: 800, color: '#10b981' }}>{activeBots}</p>
          </div>
          <div style={{ background: 'rgba(15,23,41,0.8)', borderRadius: '14px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Total Profit</p>
            <p style={{ fontSize: '28px', fontWeight: 800, color: totalProfit >= 0 ? '#10b981' : '#ef4444' }}>${totalProfit.toLocaleString()}</p>
          </div>
          <div style={{ background: 'rgba(15,23,41,0.8)', borderRadius: '14px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Total Trades</p>
            <p style={{ fontSize: '28px', fontWeight: 800, color: '#3b82f6' }}>1,403</p>
          </div>
          <div style={{ background: 'rgba(15,23,41,0.8)', borderRadius: '14px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Avg Win Rate</p>
            <p style={{ fontSize: '28px', fontWeight: 800, color: '#f59e0b' }}>64.1%</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bots..." style={{ padding: '10px 16px', background: 'rgba(15,23,41,0.8)', border: '1px solid rgba(59,130,246,0.1)', borderRadius: '10px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', outline: 'none', width: '250px' }} />
          {['All', 'Running', 'Stopped', 'Paused'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '10px 20px', background: filter === f ? 'rgba(59,130,246,0.1)' : 'rgba(15,23,41,0.8)', border: `1px solid ${filter === f ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.08)'}`, borderRadius: '10px', color: filter === f ? '#3b82f6' : '#94a3b8', cursor: 'pointer', fontSize: '13px', fontWeight: 500, fontFamily: 'inherit' }}>{f}</button>
          ))}
        </div>

        {/* Bots Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
          {filteredBots.map(bot => (
            <div key={bot.id} style={{ background: 'rgba(15,23,41,0.8)', backdropFilter: 'blur(16px)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '24px', transition: 'all 200ms', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>{bot.name}</h3>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>{bot.type} • {bot.symbol}</p>
                </div>
                <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, background: bot.status === 'Running' ? 'rgba(16,185,129,0.15)' : bot.status === 'Stopped' ? 'rgba(100,116,139,0.15)' : 'rgba(245,158,11,0.15)', color: bot.status === 'Running' ? '#10b981' : bot.status === 'Stopped' ? '#64748b' : '#f59e0b' }}>{bot.status}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                <div><p style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Profit</p><p style={{ fontSize: '16px', fontWeight: 700, color: bot.profit.startsWith('+') ? '#10b981' : '#ef4444', fontFamily: "'JetBrains Mono', monospace" }}>{bot.profit}</p></div>
                <div><p style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Win Rate</p><p style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9' }}>{bot.winRate}</p></div>
                <div><p style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Capital</p><p style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', fontFamily: "'JetBrains Mono', monospace" }}>{bot.capital}</p></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Risk:</span>
                <span style={{ padding: '2px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 600, background: bot.risk === 'Low' ? 'rgba(16,185,129,0.1)' : bot.risk === 'Medium' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)', color: bot.risk === 'Low' ? '#10b981' : bot.risk === 'Medium' ? '#f59e0b' : '#ef4444' }}>{bot.risk}</span>
                <span style={{ fontSize: '10px', color: '#64748b', marginLeft: 'auto' }}>{bot.trades} trades • {bot.lastRun}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ flex: 1, padding: '10px', background: bot.status === 'Running' ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)', border: 'none', borderRadius: '8px', color: bot.status === 'Running' ? '#f59e0b' : '#10b981', cursor: 'pointer', fontWeight: 600, fontSize: '12px', fontFamily: 'inherit' }}>
                  {bot.status === 'Running' ? '⏸ Pause' : '▶ Start'}
                </button>
                <button style={{ padding: '10px 16px', background: 'rgba(59,130,246,0.1)', border: 'none', borderRadius: '8px', color: '#3b82f6', cursor: 'pointer', fontWeight: 600, fontSize: '12px', fontFamily: 'inherit' }}>Edit</button>
                <button style={{ padding: '10px 16px', background: 'rgba(239,68,68,0.08)', border: 'none', borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontWeight: 600, fontSize: '12px', fontFamily: 'inherit' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
