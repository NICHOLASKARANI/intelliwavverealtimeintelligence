'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    firstName: 'Alex', lastName: 'Trader', email: 'demo@intelliwave.com',
    language: 'EN', currency: 'USD', timezone: 'UTC+3',
    notifications: true, emailAlerts: true, tradeConfirmations: true, botAlerts: true,
    theme: 'dark', chartStyle: 'candlestick', defaultTimeframe: '1h',
    maxDrawdown: '20', dailyLossLimit: '5', maxPositions: '10',
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'trading', label: 'Trading', icon: '◆' },
    { id: 'preferences', label: 'Preferences', icon: '⚙' },
    { id: 'risk', label: 'Risk Management', icon: '🛡' },
    { id: 'api', label: 'API Keys', icon: '🔑' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0f1e', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <aside style={{ width: '260px', background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(59,130,246,0.1)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ padding: '28px 24px 24px', borderBottom: '1px solid rgba(59,130,246,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(59,130,246,0.3)' }}><span style={{ color: 'white', fontWeight: 800, fontSize: '20px' }}>I</span></div>
            <div><div style={{ fontWeight: 700, fontSize: '15px', color: '#f1f5f9' }}>IntelliWave</div><div style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, textTransform: 'uppercase' }}>Settings</div></div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Intelligence', path: '/intelligence' }, { label: 'Trading', path: '/trading' }, { label: 'Bots', path: '/bots' }, { label: 'Analytics', path: '/analytics' }, { label: 'Settings', path: '/settings' }].map(item => (
            <button key={item.path} onClick={() => router.push(item.path)} style={{ width: '100%', padding: '11px 16px', background: item.path === '/settings' ? 'rgba(59,130,246,0.1)' : 'transparent', border: item.path === '/settings' ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent', borderRadius: '10px', color: item.path === '/settings' ? '#3b82f6' : '#94a3b8', cursor: 'pointer', fontSize: '13.5px', fontWeight: 500, marginBottom: '2px', textAlign: 'left', fontFamily: 'inherit' }}>{item.label}</button>
          ))}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(59,130,246,0.1)' }}>
          <button onClick={() => { localStorage.clear(); router.push('/login'); }} style={{ width: '100%', padding: '10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit' }}>Sign Out</button>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: '260px', padding: '36px 40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em', marginBottom: '4px' }}>Settings</h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '32px' }}>Manage your account, trading preferences, and security</p>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '12px 24px', background: activeTab === tab.id ? 'rgba(59,130,246,0.1)' : 'rgba(15,23,41,0.8)',
              border: `1px solid ${activeTab === tab.id ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.08)'}`,
              borderRadius: '12px', color: activeTab === tab.id ? '#3b82f6' : '#94a3b8', cursor: 'pointer',
              fontSize: '14px', fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '8px'
            }}>{tab.icon} {tab.label}</button>
          ))}
        </div>

        {/* Settings Content */}
        <div style={{ background: 'rgba(15,23,41,0.8)', backdropFilter: 'blur(16px)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '32px', maxWidth: '800px' }}>
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px' }}>Profile Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div><label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>First Name</label><input value={settings.firstName} onChange={e => setSettings({...settings, firstName: e.target.value})} className="input-field" style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', color: '#f1f5f9', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} /></div>
                <div><label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Last Name</label><input value={settings.lastName} onChange={e => setSettings({...settings, lastName: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', color: '#f1f5f9', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} /></div>
              </div>
              <div><label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Email</label><input value={settings.email} disabled style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,15,30,0.5)', border: '1px solid rgba(59,130,246,0.08)', borderRadius: '10px', color: '#64748b', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} /></div>
              <button style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-start', boxShadow: '0 4px 16px rgba(59,130,246,0.3)' }}>Save Changes</button>
            </div>
          )}

          {activeTab === 'trading' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9' }}>Trading Preferences</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div><label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Default Chart Style</label><select value={settings.chartStyle} onChange={e => setSettings({...settings, chartStyle: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', color: '#f1f5f9', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}><option>Candlestick</option><option>Line</option><option>Area</option><option>Heikin Ashi</option></select></div>
                <div><label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Default Timeframe</label><select value={settings.defaultTimeframe} onChange={e => setSettings({...settings, defaultTimeframe: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', color: '#f1f5f9', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}><option>1m</option><option>5m</option><option>15m</option><option>1h</option><option>4h</option><option>1D</option></select></div>
              </div>
              <button style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-start', boxShadow: '0 4px 16px rgba(59,130,246,0.3)' }}>Save Preferences</button>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9' }}>Platform Preferences</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div><label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Language</label><select value={settings.language} onChange={e => setSettings({...settings, language: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', color: '#f1f5f9', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}><option>EN</option><option>FR</option><option>AR</option><option>SW</option><option>ES</option><option>PT</option></select></div>
                <div><label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Currency</label><select value={settings.currency} onChange={e => setSettings({...settings, currency: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', color: '#f1f5f9', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}><option>USD</option><option>EUR</option><option>GBP</option><option>JPY</option><option>KES</option></select></div>
                <div><label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Timezone</label><select value={settings.timezone} onChange={e => setSettings({...settings, timezone: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', color: '#f1f5f9', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}><option>UTC-5 (EST)</option><option>UTC+0 (GMT)</option><option>UTC+3 (EAT)</option><option>UTC+8 (SGT)</option></select></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { key: 'notifications', label: 'Push Notifications' },
                  { key: 'emailAlerts', label: 'Email Alerts' },
                  { key: 'tradeConfirmations', label: 'Trade Confirmations' },
                  { key: 'botAlerts', label: 'Bot Status Alerts' },
                ].map(item => (
                  <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(10,15,30,0.5)', borderRadius: '10px' }}>
                    <span style={{ fontSize: '14px', color: '#e2e8f0' }}>{item.label}</span>
                    <div onClick={() => setSettings({...settings, [item.key]: !(settings as any)[item.key]})} style={{ width: '44px', height: '24px', borderRadius: '12px', background: (settings as any)[item.key] ? '#3b82f6' : '#334155', cursor: 'pointer', position: 'relative', transition: 'all 200ms' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: (settings as any)[item.key] ? '22px' : '2px', transition: 'all 200ms' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'risk' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9' }}>Risk Management</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div><label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Max Drawdown (%)</label><input type="number" value={settings.maxDrawdown} onChange={e => setSettings({...settings, maxDrawdown: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', color: '#f1f5f9', fontSize: '14px', fontFamily: "'JetBrains Mono', monospace", outline: 'none', boxSizing: 'border-box' }} /></div>
                <div><label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Daily Loss Limit (%)</label><input type="number" value={settings.dailyLossLimit} onChange={e => setSettings({...settings, dailyLossLimit: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', color: '#f1f5f9', fontSize: '14px', fontFamily: "'JetBrains Mono', monospace", outline: 'none', boxSizing: 'border-box' }} /></div>
                <div><label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Max Positions</label><input type="number" value={settings.maxPositions} onChange={e => setSettings({...settings, maxPositions: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', color: '#f1f5f9', fontSize: '14px', fontFamily: "'JetBrains Mono', monospace", outline: 'none', boxSizing: 'border-box' }} /></div>
              </div>
              <div style={{ padding: '16px', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '12px' }}>
                <p style={{ fontSize: '13px', color: '#f59e0b', fontWeight: 600, marginBottom: '4px' }}>⚠ Risk Warning</p>
                <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>Trading involves substantial risk of loss. Never trade with money you cannot afford to lose. Past performance does not guarantee future results.</p>
              </div>
              <button style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-start', boxShadow: '0 4px 16px rgba(59,130,246,0.3)' }}>Save Risk Settings</button>
            </div>
          )}

          {activeTab === 'api' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9' }}>API Keys</h3>
              <div style={{ padding: '16px', background: 'rgba(10,15,30,0.5)', borderRadius: '12px', border: '1px solid rgba(59,130,246,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, color: '#f1f5f9', fontSize: '14px' }}>Production API Key</p>
                    <p className="mono" style={{ color: '#64748b', fontSize: '12px', marginTop: '4px' }}>sk_live_••••••••••••••••••••••••</p>
                  </div>
                  <button style={{ padding: '8px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit' }}>Revoke</button>
                </div>
              </div>
              <button style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-start', boxShadow: '0 4px 16px rgba(59,130,246,0.3)' }}>Generate New API Key</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
