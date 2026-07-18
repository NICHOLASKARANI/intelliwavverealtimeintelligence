'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const currencies = ['USD','EUR','GBP','JPY','KES','AUD','CAD','CHF','SGD','HKD','CNY','INR','AED','SAR','ZAR','NGN','TRY','BRL','MXN'];
const languages = [
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'AR', name: 'العربية', flag: '🇸🇦' },
  { code: 'SW', name: 'Kiswahili', flag: '🇰🇪' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'PT', name: 'Português', flag: '🇧🇷' },
];

export default function IntelligenceCenter() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div style={{ minHeight: '100vh', background: '#0a0f1e' }} />;

  const navItems = [
    { label: 'Dashboard', icon: '◉', path: '/dashboard' },
    { label: 'Intelligence', icon: '✦', path: '/intelligence' },
    { label: 'Trading', icon: '◆', path: '/trading' },
    { label: 'Bots', icon: '⚙', path: '/bots' },
    { label: 'Analytics', icon: '◈', path: '/analytics' },
    { label: 'Settings', icon: '◐', path: '/settings' },
  ];

  const worldMarkets = [
    { region: 'North America', status: 'Open', indices: ['S&P 500 +0.8%', 'NASDAQ +1.2%', 'DOW +0.5%'], color: '#10b981' },
    { region: 'Europe', status: 'Closing', indices: ['FTSE 100 -0.3%', 'DAX +0.1%', 'CAC 40 -0.2%'], color: '#f59e0b' },
    { region: 'Asia Pacific', status: 'Closed', indices: ['Nikkei 225 +1.5%', 'Hang Seng +0.9%', 'ASX 200 +0.4%'], color: '#64748b' },
    { region: 'Middle East', status: 'Open', indices: ['Tadawul +0.6%', 'DFM +0.3%', 'ADX +0.2%'], color: '#10b981' },
    { region: 'Africa', status: 'Open', indices: ['JSE +0.7%', 'NSE +0.4%', 'EGX +0.5%'], color: '#10b981' },
    { region: 'Latin America', status: 'Opening', indices: ['Bovespa +0.2%', 'IPC +0.1%', 'MERVAL +0.3%'], color: '#3b82f6' },
  ];

  const economicEvents = [
    { time: '14:30 GMT', event: 'US Non-Farm Payrolls', impact: 'High', forecast: '+180K', previous: '+150K' },
    { time: '16:00 GMT', event: 'Fed Interest Rate Decision', impact: 'High', forecast: '5.50%', previous: '5.50%' },
    { time: '08:00 GMT', event: 'EU GDP Growth Rate', impact: 'Medium', forecast: '0.3%', previous: '0.2%' },
    { time: '10:30 GMT', event: 'UK Inflation Rate', impact: 'Medium', forecast: '2.5%', previous: '2.3%' },
  ];

  const handleAIQuery = () => {
    if (!aiQuery.trim()) return;
    const responses: Record<string, string> = {
      'market': 'Based on current analysis, Volatility 75 shows strong bullish momentum with RSI at 62. Key support at 1,200 and resistance at 1,280. Probability of upward movement: 68%.',
      'risk': 'Your portfolio has a Sharpe ratio of 1.8 and maximum drawdown of 12.4%. Risk exposure is moderate. Consider reducing position sizes on correlated assets.',
      'opportunity': 'Top opportunities: 1) Boom 300 showing oversold conditions, 2) Volatility 75 breakout pattern forming, 3) Crash 300 approaching key support level.',
      'default': 'I analyze market patterns, technical indicators, and risk metrics to provide actionable insights. Ask me about market analysis, risk assessment, or trading opportunities.',
    };
    
    let response = responses.default;
    if (aiQuery.toLowerCase().includes('market')) response = responses.market;
    else if (aiQuery.toLowerCase().includes('risk')) response = responses.risk;
    else if (aiQuery.toLowerCase().includes('opportun')) response = responses.opportunity;
    
    setAiResponse(response);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0f1e', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(59,130,246,0.1)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ padding: '28px 24px 24px', borderBottom: '1px solid rgba(59,130,246,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(59,130,246,0.3)' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '20px' }}>I</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#f1f5f9' }}>IntelliWave</div>
              <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Intelligence Center</div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {navItems.map(item => (
            <button key={item.path} onClick={() => router.push(item.path)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 16px', background: item.path === '/intelligence' ? 'rgba(139,92,246,0.1)' : 'transparent', border: item.path === '/intelligence' ? '1px solid rgba(139,92,246,0.2)' : '1px solid transparent', borderRadius: '10px', color: item.path === '/intelligence' ? '#8b5cf6' : '#94a3b8', cursor: 'pointer', fontSize: '13.5px', fontWeight: 500, marginBottom: '2px', transition: 'all 150ms', fontFamily: 'inherit', textAlign: 'left' }}>
              <span style={{ fontSize: '16px', width: '24px', textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(59,130,246,0.1)' }}>
          <button onClick={() => { router.push('/logout'); }} style={{ width: '100%', padding: '10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit' }}>Sign Out</button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: '260px', padding: '36px 40px' }}>
        <header style={{ marginBottom: '36px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em' }}>
            <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>✦</span> Intelligence Center
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>Global market intelligence, AI analysis, and economic insights</p>
        </header>

        {/* Quick Settings Bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <select value={selectedCurrency} onChange={e => setSelectedCurrency(e.target.value)} style={{ padding: '8px 14px', background: 'rgba(15,23,41,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}>
            {currencies.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} style={{ padding: '8px 14px', background: 'rgba(15,23,41,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}>
            {languages.map(l => <option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
          </select>
        </div>

        {/* World Market Map */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '28px' }}>
          {worldMarkets.map((market, i) => (
            <div key={i} style={{ background: 'rgba(15,23,41,0.8)', backdropFilter: 'blur(16px)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '20px', cursor: 'pointer', transition: 'all 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9' }}>{market.region}</h3>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '100px', background: market.color === '#10b981' ? 'rgba(16,185,129,0.1)' : market.color === '#f59e0b' ? 'rgba(245,158,11,0.1)' : 'rgba(100,116,139,0.1)', color: market.color }}>{market.status}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {market.indices.map((idx, j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94a3b8' }}>
                    <span>{idx.split(' ')[0]}</span>
                    <span style={{ color: idx.includes('+') ? '#10b981' : idx.includes('-') ? '#ef4444' : '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>{idx.split(' ').slice(1).join(' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AI Assistant + Economic Calendar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* AI Copilot */}
          <div style={{ background: 'rgba(15,23,41,0.8)', backdropFilter: 'blur(16px)', borderRadius: '16px', border: '1px solid rgba(139,92,246,0.15)', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>✦</span> IntelliWave AI Copilot
            </h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input value={aiQuery} onChange={e => setAiQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAIQuery()} placeholder="Ask about markets, risk, or opportunities..." style={{ flex: 1, padding: '10px 14px', background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '10px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }} />
              <button onClick={handleAIQuery} style={{ padding: '10px 18px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', border: 'none', borderRadius: '10px', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '13px', fontFamily: 'inherit' }}>Ask</button>
            </div>
            {aiResponse && (
              <div style={{ background: 'rgba(139,92,246,0.05)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(139,92,246,0.1)', fontSize: '13px', color: '#c4b5fd', lineHeight: 1.6 }}>
                {aiResponse}
              </div>
            )}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
              {['Market analysis', 'Risk check', 'Find opportunities', 'Portfolio summary', 'Explain indicators'].map(s => (
                <span key={s} onClick={() => setAiQuery(s)} style={{ padding: '6px 12px', background: 'rgba(139,92,246,0.08)', borderRadius: '100px', fontSize: '11px', color: '#a78bfa', cursor: 'pointer', fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Economic Calendar */}
          <div style={{ background: 'rgba(15,23,41,0.8)', backdropFilter: 'blur(16px)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px' }}>📅 Economic Calendar</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {economicEvents.map((event, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(10,15,30,0.5)', borderRadius: '10px', border: '1px solid rgba(59,130,246,0.05)' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', fontFamily: "'JetBrains Mono', monospace", minWidth: '70px' }}>{event.time}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', color: '#f1f5f9', fontWeight: 500 }}>{event.event}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Forecast: {event.forecast} | Previous: {event.previous}</div>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '100px', background: event.impact === 'High' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)', color: event.impact === 'High' ? '#ef4444' : '#f59e0b' }}>{event.impact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
