'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { PortfolioAllocation } from '../../components/dashboard/PortfolioAllocation';
import { PerformanceChart } from '../../components/dashboard/PerformanceChart';
import { AIInsights } from '../../components/dashboard/AIInsights';

const allocationData = [
  { label: 'Volatility 75', percentage: 35, color: '#3b82f6', value: '$4,357.50' },
  { label: 'Boom 300', percentage: 25, color: '#8b5cf6', value: '$3,112.50' },
  { label: 'Crash 300', percentage: 20, color: '#10b981', value: '$2,490.00' },
  { label: 'Volatility 100', percentage: 15, color: '#f59e0b', value: '$1,867.50' },
  { label: 'Cash Reserve', percentage: 5, color: '#64748b', value: '$622.50' },
];

const positions = [
  { symbol: 'Volatility 75', type: 'LONG', entry: '1,210.50', current: '1,234.56', pnl: '+$240.60', pnlPct: '+1.99%', sl: '1,190.00', tp: '1,260.00', time: '14:32' },
  { symbol: 'Boom 300', type: 'LONG', entry: '3,389.20', current: '3,456.78', pnl: '+$67.58', pnlPct: '+1.99%', sl: '3,350.00', tp: '3,500.00', time: '14:28' },
  { symbol: 'Volatility 100', type: 'SHORT', entry: '5,720.10', current: '5,678.90', pnl: '-$41.20', pnlPct: '-0.72%', sl: '5,750.00', tp: '5,650.00', time: '14:15' },
  { symbol: 'Crash 300', type: 'LONG', entry: '2,300.00', current: '2,345.67', pnl: '+$45.67', pnlPct: '+1.99%', sl: '2,250.00', tp: '2,400.00', time: '13:50' },
];

const activities = [
  { time: '14:32:15', event: 'Trade executed', detail: 'Volatility 75 - BUY', value: '+$240.60', type: 'success' },
  { time: '14:28:42', event: 'Bot started', detail: 'MA Crossover Pro on V75', value: 'Running', type: 'info' },
  { time: '14:15:08', event: 'Trade closed', detail: 'Volatility 100 - SELL', value: '-$41.20', type: 'danger' },
  { time: '13:50:22', event: 'Deposit confirmed', detail: 'Via Stripe', value: '+$500.00', type: 'success' },
  { time: '13:30:00', event: 'AI alert triggered', detail: 'V75 breakout pattern', value: '72% confidence', type: 'warning' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening');
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#0a0f1e' }} />;

  const handleLogout = () => { router.push('/logout'); };

  const navItems = [
    { label: 'Dashboard', icon: '◉', path: '/dashboard', active: true },
    { label: 'Intelligence', icon: '✦', path: '/intelligence' },
    { label: 'Trading', icon: '◆', path: '/trading' },
    { label: 'Bots', icon: '⚙', path: '/bots' },
    { label: 'Analytics', icon: '◈', path: '/analytics' },
    { label: 'Settings', icon: '◐', path: '/settings' },
  ];

  const equityData = Array.from({length: 30}, (_, i) => {
    const val = 10000 + Math.sin(i * 0.3) * 2000 + i * 50 + (Math.random() - 0.5) * 500;
    return { date: `Day ${i+1}`, value: Math.round(val) };
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0f1e', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(59,130,246,0.08)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(59,130,246,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(59,130,246,0.3)' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '18px' }}>I</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#f1f5f9', letterSpacing: '-0.02em' }}>IntelliWave</div>
              <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>ITIS Platform v2.0</div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          {navItems.map(item => (
            <button key={item.path} onClick={() => router.push(item.path)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: item.active ? 'rgba(59,130,246,0.1)' : 'transparent', border: item.active ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent', borderRadius: '10px', color: item.active ? '#3b82f6' : '#94a3b8', cursor: 'pointer', fontSize: '13px', fontWeight: 500, marginBottom: '2px', transition: 'all 150ms', fontFamily: 'inherit', textAlign: 'left' }}>
              <span style={{ fontSize: '15px', width: '22px', textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(59,130,246,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', color: 'white', flexShrink: 0 }}>AT</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '12px', color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Alex Trader</div>
              <div style={{ fontSize: '10px', color: '#10b981' }}>Professional Plan</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{ width: '100%', padding: '8px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontSize: '11px', fontWeight: 600, fontFamily: 'inherit' }}>Sign Out</button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: '260px', padding: '32px 36px', minWidth: 0 }}>
        {/* Header */}
        <header style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ color: '#64748b', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{greeting}, Alex</p>
            <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em', marginBottom: '2px' }}>
              Trading <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Command Center</span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • <span style={{ color: '#10b981' }}>Market Open</span>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ padding: '10px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', color: '#94a3b8', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit' }}>Deposit</button>
            <button style={{ padding: '10px 18px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '10px', color: 'white', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(59,130,246,0.3)' }}>+ New Trade</button>
          </div>
        </header>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <StatsCard title="Portfolio Value" value="$12,450.00" change="+15.2%" icon="◆" color="#3b82f6" subtitle="$10,800 last month" sparkline={[10,15,12,18,14,20,16,22,19,25,21,28,24,30,26,32,28,35,30,38,34,40,36,42,38,44,40,46,42,45]} />
          <StatsCard title="Today's P&L" value="+$2,345.50" change="+2.1%" icon="▲" color="#10b981" subtitle="12 winning trades" sparkline={[5,8,3,12,7,15,10,18,13,20,16,22,19,25,21,28,23,30,25,32,27,34,29,36,31,38,33,40,35,38]} />
          <StatsCard title="Active Bots" value="7" change="3 Profitable" icon="⚙" color="#8b5cf6" subtitle="2 Learning • 2 Idle" />
          <StatsCard title="Win Rate" value="71.4%" change="+5.2%" icon="◈" color="#f59e0b" subtitle="Last 100 trades" sparkline={[60,62,58,65,61,68,63,70,66,72,68,74,70,75,71,73,69,76,72,78,74,80,76,82,78,84,80,86,82,85]} />
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', marginBottom: '24px' }}>
          {/* Performance Chart */}
          <div style={{ background: 'rgba(15,23,41,0.8)', backdropFilter: 'blur(16px)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px 24px' }}>
            <PerformanceChart data={equityData} />
          </div>

          {/* AI Insights */}
          <div style={{ background: 'rgba(15,23,41,0.8)', backdropFilter: 'blur(16px)', borderRadius: '16px', border: '1px solid rgba(139,92,246,0.1)', padding: '20px' }}>
            <AIInsights />
          </div>
        </div>

        {/* Bottom Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Positions */}
          <div style={{ background: 'rgba(15,23,41,0.8)', backdropFilter: 'blur(16px)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Open Positions</h3>
              <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>{positions.length} Active</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '500px' }}>
                <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{['Symbol','Type','Entry','Current','P&L','Time'].map(h => <th key={h} style={{ padding: '8px 10px', textAlign: 'left', color: '#64748b', fontWeight: 600, fontSize: '10px', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
                <tbody>{positions.map((p,i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', cursor: 'pointer' }} onClick={() => router.push('/trading')}>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#f1f5f9' }}>{p.symbol}</td>
                    <td style={{ padding: '10px' }}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: p.type === 'LONG' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: p.type === 'LONG' ? '#10b981' : '#ef4444' }}>{p.type}</span></td>
                    <td style={{ padding: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#94a3b8' }}>{p.entry}</td>
                    <td style={{ padding: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#e2e8f0' }}>{p.current}</td>
                    <td style={{ padding: '10px', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: p.pnl.startsWith('+') ? '#10b981' : '#ef4444' }}>{p.pnl}</td>
                    <td style={{ padding: '10px', color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>{p.time}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>

          {/* Activity + Allocation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Recent Activity */}
            <div style={{ background: 'rgba(15,23,41,0.8)', backdropFilter: 'blur(16px)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', marginBottom: '12px' }}>Recent Activity</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activities.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', background: 'rgba(10,15,30,0.4)', borderRadius: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: a.type === 'success' ? '#10b981' : a.type === 'danger' ? '#ef4444' : a.type === 'warning' ? '#f59e0b' : '#3b82f6', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#f1f5f9' }}>{a.event}</div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>{a.detail}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: a.value.startsWith('+') ? '#10b981' : a.value.startsWith('-') ? '#ef4444' : '#94a3b8' }}>{a.value}</div>
                      <div style={{ fontSize: '9px', color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Allocation */}
            <div style={{ background: 'rgba(15,23,41,0.8)', backdropFilter: 'blur(16px)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px' }}>
              <PortfolioAllocation data={allocationData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
