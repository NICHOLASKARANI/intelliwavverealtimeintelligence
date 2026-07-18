'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [activeNav, setActiveNav] = useState('Dashboard');

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening');
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const user = JSON.parse(localStorage.getItem('user') || '{"firstName":"Alex","lastName":"Trader","plan":"Professional"}');

  const navItems = [
    { label: 'Dashboard', icon: '⊞', path: '/dashboard', badge: null },
    { label: 'Trading', icon: '⊡', path: '/trading', badge: 'Live' },
    { label: 'Bots', icon: '⚙', path: '/bots', badge: '7 Active' },
    { label: 'Analytics', icon: '⊟', path: '/analytics', badge: null },
    { label: 'Settings', icon: '⊠', path: '/settings', badge: null },
  ];

  const stats = [
    { label: 'Portfolio Value', value: '$124,850', change: '+15.2%', sub: '$108,450 last month', color: '#3b82f6', trend: 'up' },
    { label: "Today's P&L", value: '+$2,345', change: '+2.1%', sub: '12 winning trades', color: '#10b981', trend: 'up' },
    { label: 'Active Bots', value: '7', change: '3 Profitable', sub: '2 Learning', color: '#8b5cf6', trend: 'neutral' },
    { label: 'Win Rate', value: '71.4%', change: '+5.2%', sub: 'Last 100 trades', color: '#f59e0b', trend: 'up' },
  ];

  const positions = [
    { symbol: 'Volatility 75', side: 'LONG', entry: '$1,200.50', current: '$1,234.56', pnl: '+$234.50', pnlPct: '+4.69%', size: '$5,000' },
    { symbol: 'Volatility 100', side: 'SHORT', entry: '$5,720.10', current: '$5,678.90', pnl: '-$89.00', pnlPct: '-0.72%', size: '$3,000' },
    { symbol: 'Boom 300', side: 'LONG', entry: '$3,389.20', current: '$3,456.78', pnl: '+$156.20', pnlPct: '+1.99%', size: '$2,500' },
  ];

  const aiInsights = [
    { title: 'Volatility 75 Momentum', text: 'Strong bullish signal. RSI trending up at 62 with MACD crossover. Consider increasing position size by 15%.', type: 'opportunity' },
    { title: 'Risk Management Alert', text: 'Portfolio drawdown at 8.2%. Correlation between V75 and V100 is 0.78. Reduce exposure to one to manage risk.', type: 'warning' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-primary)' }}>
      {/* Enterprise Sidebar */}
      <aside style={{ width: '272px', background: 'var(--surface-secondary)', borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="animate-glow" style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(59,130,246,0.3)' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '20px' }}>I</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.02em' }}>IntelliWave</div>
              <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>ITIS Platform v2.0</div>
            </div>
          </div>
        </div>
        
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
          <div className="stat-label" style={{ padding: '8px 16px', marginBottom: '4px' }}>Main Navigation</div>
          {navItems.map(item => (
            <button key={item.path} onClick={() => { setActiveNav(item.label); router.push(item.path); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', background: activeNav === item.label ? 'var(--info-bg)' : 'transparent', border: activeNav === item.label ? '1px solid var(--border-active)' : '1px solid transparent', borderRadius: '10px', color: activeNav === item.label ? 'var(--brand-primary)' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 500, marginBottom: '2px', transition: 'all var(--transition-fast)', fontFamily: 'Inter', textAlign: 'left' }}>
              <span style={{ fontSize: '18px', width: '24px', textAlign: 'center' }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && <span className="badge badge-info" style={{ fontSize: '10px' }}>{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', padding: '8px', borderRadius: '10px', background: 'var(--surface-tertiary)' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '15px', color: 'white', flexShrink: 0 }}>{user.firstName?.[0]}{user.lastName?.[0]}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '0.8125rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.firstName} {user.lastName}</div>
              <span className="badge badge-success" style={{ fontSize: '10px' }}>{user.plan}</span>
            </div>
          </div>
          <button onClick={() => { localStorage.clear(); document.cookie = 'accessToken=; max-age=0'; router.push('/login'); }} className="btn btn-secondary btn-sm" style={{ width: '100%', color: 'var(--danger)' }}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: '272px', padding: '36px 40px', minWidth: 0 }}>
        {/* Premium Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>{greeting}, {user.firstName}</p>
            <h1 style={{ fontSize: '34px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '4px' }}>Trading <span className="gradient-text">Command Center</span></h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • <span style={{ color: '#10b981' }}>Market Open</span></p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary btn-sm">Deposit</button>
            <button className="btn btn-primary">+ New Trade</button>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid-4" style={{ marginBottom: '28px' }}>
          {stats.map((stat, i) => (
            <div key={i} className="glass-card animate-fadeInUp" style={{ padding: '22px 24px', position: 'relative', overflow: 'hidden', animationDelay: `${i * 0.1}s` }}>
              <div style={{ position: 'absolute', top: '-30px', right: '-30px', fontSize: '100px', color: stat.color, opacity: 0.04, fontWeight: 900, lineHeight: 1, pointerEvents: 'none' }}>{stat.trend === 'up' ? '▲' : '■'}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <p className="stat-label">{stat.label}</p>
                <span className={`badge ${stat.trend === 'up' ? 'badge-success' : stat.trend === 'down' ? 'badge-danger' : 'badge-info'}`}>{stat.change}</span>
              </div>
              <p className="stat-value mono" style={{ color: stat.color }}>{stat.value}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
          {/* Positions Table */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div className="flex-between" style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Open Positions</h3>
              <span className="badge badge-info">{positions.length} Active</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    {['Symbol', 'Side', 'Entry', 'Current', 'P&L', 'Size'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {positions.map((pos, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', cursor: 'pointer' }} className="glass-card-interactive" onClick={() => router.push('/trading')}>
                      <td style={{ padding: '14px 12px', fontWeight: 600, fontSize: '0.875rem' }}>{pos.symbol}</td>
                      <td style={{ padding: '14px 12px' }}><span className={`badge ${pos.side === 'LONG' ? 'badge-success' : 'badge-danger'}`}>{pos.side}</span></td>
                      <td className="mono" style={{ padding: '14px 12px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{pos.entry}</td>
                      <td className="mono" style={{ padding: '14px 12px', fontSize: '0.8125rem' }}>{pos.current}</td>
                      <td className="mono" style={{ padding: '14px 12px', fontWeight: 700, fontSize: '0.8125rem', color: pos.pnl.startsWith('+') ? '#10b981' : '#ef4444' }}>{pos.pnl} <span style={{ fontSize: '0.6875rem', opacity: 0.8 }}>({pos.pnlPct})</span></td>
                      <td className="mono" style={{ padding: '14px 12px', fontSize: '0.8125rem' }}>{pos.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Insights Panel */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div className="flex-between" style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="gradient-text">✦</span> AI Copilot
              </h3>
              <span className="badge badge-info">Live</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {aiInsights.map((insight, i) => (
                <div key={i} style={{ background: insight.type === 'opportunity' ? 'rgba(16,185,129,0.04)' : 'rgba(245,158,11,0.04)', borderRadius: 'var(--radius-md)', padding: '16px', border: `1px solid ${insight.type === 'opportunity' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)'}` }}>
                  <div style={{ fontWeight: 600, fontSize: '0.8125rem', marginBottom: '6px', color: insight.type === 'opportunity' ? '#10b981' : '#f59e0b' }}>{insight.title}</div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{insight.text}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '16px' }}>
              <input className="input" placeholder="Ask AI about your portfolio..." style={{ marginBottom: '8px' }} />
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Analyze risk', 'Optimize bots', 'Market scan', 'Performance report'].map(s => (
                  <span key={s} style={{ padding: '5px 10px', background: 'var(--info-bg)', borderRadius: '100px', fontSize: '0.6875rem', color: 'var(--info)', cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap' }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
