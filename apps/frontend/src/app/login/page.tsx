'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (email === 'demo@intelliwave.com' && password === 'demo123') {
      const token = 'itis-jwt-' + Date.now();
      document.cookie = `accessToken=${token}; path=/; max-age=86400; SameSite=Lax`;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify({ email, username: 'demo', role: 'USER', firstName: 'Alex', lastName: 'Trader', plan: 'Professional' }));
      setTimeout(() => window.location.href = '/dashboard', 150);
    } else { setError('Invalid credentials'); setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background Orbs */}
      <div style={{ position: 'absolute', top: '-30%', left: '-15%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', animation: 'float 10s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '-40%', right: '-20%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', animation: 'float 8s ease-in-out infinite reverse' }} />
      <div style={{ position: 'absolute', top: '40%', right: '25%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(30px)', animation: 'float 12s ease-in-out infinite' }} />
      
      {/* Grid Overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)', backgroundSize: '80px 80px', mask: 'radial-gradient(ellipse at center, black 30%, transparent 70%)' }} />

      {/* Login Card */}
      <div className="glass-card animate-fadeInUp" style={{ width: '460px', padding: '48px', position: 'relative', zIndex: 1 }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="animate-glow" style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 12px 40px rgba(59,130,246,0.4)' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '6px' }}>
            <span className="gradient-text">IntelliWave</span> ITIS
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 400 }}>Enterprise AI Trading Platform</p>
        </div>

        {error && <div style={{ background: 'var(--danger-bg)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: '20px', color: 'var(--danger)', fontSize: '0.8125rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>⚠ {error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label className="stat-label" style={{ marginBottom: '8px', display: 'block' }}>Email Address</label>
            <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="demo@intelliwave.com" required autoComplete="email" autoFocus />
          </div>
          <div>
            <label className="stat-label" style={{ marginBottom: '8px', display: 'block' }}>Password</label>
            <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required autoComplete="current-password" />
          </div>
          <button className="btn btn-primary btn-lg" type="submit" disabled={loading} style={{ width: '100%', marginTop: '4px' }}>
            {loading ? 'Authenticating...' : 'Sign In to Platform'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '28px', padding: '16px', background: 'var(--surface-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Demo Credentials</p>
          <p className="mono" style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>demo@intelliwave.com / demo123</p>
        </div>
      </div>
    </div>
  );
}
