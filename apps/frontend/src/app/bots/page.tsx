'use client';

import { useRouter } from 'next/navigation';

export default function BotsPage() {
  const router = useRouter();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', fontFamily: 'Arial' }}>
      <div style={{ width: '220px', background: '#1e293b', borderRight: '1px solid #334155', padding: '20px 0' }}>
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #334155', marginBottom: '20px' }}>
          <h2 style={{ color: '#3b82f6', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>IntelliWave</h2>
        </div>
        <nav>
          {['Dashboard','Trading','Bots','Analytics','Settings'].map(label => (
            <button key={label} onClick={() => router.push('/' + label.toLowerCase())} style={{ width: '100%', padding: '10px 20px', background: 'transparent', border: 'none', color: label === 'Bots' ? '#3b82f6' : '#94a3b8', cursor: 'pointer', fontSize: '13px', textAlign: 'left' }}>
              {label}
            </button>
          ))}
        </nav>
        <button onClick={() => { localStorage.clear(); router.push('/login'); }} style={{ padding: '10px 20px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px', marginTop: 'auto' }}>Logout</button>
      </div>
      <div style={{ flex: 1, padding: '32px', color: 'white' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Trading Bots</h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Manage automated trading strategies</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {['MA Crossover', 'RSI Scalper', 'Grid Master'].map(name => (
            <div key={name} style={{ background: '#1e293b', borderRadius: '12px', padding: '20px', border: '1px solid #334155' }}>
              <h3 style={{ marginBottom: '8px' }}>{name}</h3>
              <p style={{ color: '#10b981', fontSize: '14px' }}>Ready</p>
              <button style={{ marginTop: '12px', padding: '8px 16px', background: '#3b82f6', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>Start Bot</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
