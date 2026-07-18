'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  if (!mounted) {
    return <div style={{ minHeight: '100vh', background: '#0f172a' }}></div>;
  }

  const handleLogout = () => {
    localStorage.clear();
    document.cookie = 'accessToken=; max-age=0; path=/';
    router.push('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', fontFamily: 'Arial' }}>
      <div style={{ width: '220px', background: '#1e293b', borderRight: '1px solid #334155', padding: '20px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #334155', marginBottom: '20px' }}>
          <h2 style={{ color: '#3b82f6', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>IntelliWave</h2>
        </div>
        <nav style={{ flex: 1 }}>
          {['Dashboard','Trading','Bots','Analytics','Settings'].map(label => (
            <button key={label} onClick={() => router.push('/' + label.toLowerCase())} style={{ width: '100%', padding: '10px 20px', background: 'transparent', border: 'none', color: label === 'Dashboard' ? '#3b82f6' : '#94a3b8', cursor: 'pointer', fontSize: '13px', textAlign: 'left' }}>
              {label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} style={{ padding: '10px 20px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px' }}>
          Logout
        </button>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        <h1 style={{ color: 'white', fontSize: '24px', marginBottom: '8px' }}>Dashboard</h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Welcome back{user?.firstName ? ', ' + user.firstName : ''}!</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '14px' }}>Portfolio Value</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6', margin: '0 0 8px' }}>$12,450.00</p>
            <p style={{ color: '#10b981', fontSize: '13px' }}>+15.2% this month</p>
          </div>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '14px' }}>Active Bots</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#8b5cf6', margin: '0 0 8px' }}>3</p>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>Running strategies</p>
          </div>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '14px' }}>Today P&L</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981', margin: '0 0 8px' }}>+$234.50</p>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>12 trades today</p>
          </div>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '14px' }}>Win Rate</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b', margin: '0 0 8px' }}>68%</p>
            <p style={{ color: '#10b981', fontSize: '13px' }}>+5% vs last week</p>
          </div>
        </div>
      </div>
    </div>
  );
}
