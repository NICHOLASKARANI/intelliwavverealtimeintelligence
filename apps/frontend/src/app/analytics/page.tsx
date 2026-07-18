'use client';

import { useRouter } from 'next/navigation';

export default function AnalyticsPage() {
  const router = useRouter();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', fontFamily: 'Arial' }}>
      <div style={{ width: '220px', background: '#1e293b', borderRight: '1px solid #334155', padding: '20px 0' }}>
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #334155', marginBottom: '20px' }}>
          <h2 style={{ color: '#3b82f6', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>IntelliWave</h2>
        </div>
        <nav>
          {['Dashboard','Trading','Bots','Analytics','Settings'].map(label => (
            <button key={label} onClick={() => router.push('/' + label.toLowerCase())} style={{ width: '100%', padding: '10px 20px', background: 'transparent', border: 'none', color: label === 'Analytics' ? '#3b82f6' : '#94a3b8', cursor: 'pointer', fontSize: '13px', textAlign: 'left' }}>
              {label}
            </button>
          ))}
        </nav>
        <button onClick={() => { localStorage.clear(); router.push('/login'); }} style={{ padding: '10px 20px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px', marginTop: 'auto' }}>Logout</button>
      </div>
      <div style={{ flex: 1, padding: '32px', color: 'white' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Analytics</h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Performance metrics and insights</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155', textAlign: 'center', color: '#94a3b8', minHeight: '200px' }}>Equity Curve Chart</div>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155', textAlign: 'center', color: '#94a3b8', minHeight: '200px' }}>Win/Loss Ratio</div>
        </div>
      </div>
    </div>
  );
}
