'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const currencies = ['USD','EUR','GBP','JPY','KES','AUD','CAD','CHF','SGD','HKD','CNY','INR','AED','SAR','ZAR','NGN','TRY','BRL','MXN'];
const languages = [
  { code: 'EN', name: 'English', flag: '🇬🇧' },{ code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'AR', name: 'العربية', flag: '🇸🇦' },{ code: 'SW', name: 'Kiswahili', flag: '🇰🇪' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },{ code: 'PT', name: 'Português', flag: '🇧🇷' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },{ code: 'ZH', name: '中文', flag: '🇨🇳' },
];

const tabs = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'trading', label: 'Trading', icon: '◆' },
  { id: 'preferences', label: 'Preferences', icon: '⚙' },
  { id: 'risk', label: 'Risk Management', icon: '🛡' },
  { id: 'api', label: 'API & Integrations', icon: '🔑' },
  { id: 'billing', label: 'Billing', icon: '💳' },
  { id: 'security', label: 'Security', icon: '🔒' },
];

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    firstName: 'Alex', lastName: 'Trader', email: 'demo@intelliwave.com',
    language: 'EN', currency: 'USD', timezone: 'UTC+3',
    theme: 'dark', chartStyle: 'candlestick', defaultTimeframe: '1h',
    maxDrawdown: '20', dailyLossLimit: '5', maxPositions: '10',
    notifications: true, emailAlerts: true, tradeConfirmations: true, botAlerts: true, newsAlerts: false,
    twoFactor: false, sessionTimeout: '30',
    plan: 'Professional', billingCycle: 'Monthly', nextPayment: '2026-08-15',
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0f1e', fontFamily: "'Inter', system-ui, sans-serif", position: 'relative', overflow: 'hidden' }}>
      {/* World Map Background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', zIndex: 0 }}>
        <svg viewBox="0 0 1000 500" style={{ width: '100%', height: '100%' }}>
          {/* Simplified world map paths */}
          <path d="M150,150 Q200,100 300,120 Q400,140 350,200 Q300,260 200,240 Q100,220 150,150Z M400,80 Q500,50 600,90 Q700,130 650,200 Q600,270 500,250 Q400,230 400,80Z M200,300 Q300,280 400,320 Q500,360 450,420 Q400,480 300,450 Q200,420 200,300Z M600,100 Q700,80 800,120 Q900,160 850,220 Q800,280 700,250 Q600,220 600,100Z M100,200 Q150,180 200,220 Q150,260 100,240Z M700,300 Q750,280 800,310 Q850,340 800,370 Q750,400 700,370Z M300,50 Q350,40 400,55 Q350,70 300,50Z" fill="#3b82f6" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5"/>
          <circle cx="250" cy="180" r="3" fill="#10b981" opacity="0.5" />
          <circle cx="500" cy="150" r="4" fill="#3b82f6" opacity="0.5" />
          <circle cx="700" cy="200" r="3" fill="#8b5cf6" opacity="0.5" />
          <circle cx="350" cy="350" r="3" fill="#f59e0b" opacity="0.5" />
          <circle cx="180" cy="280" r="2" fill="#10b981" opacity="0.5" />
          <circle cx="600" cy="300" r="2" fill="#3b82f6" opacity="0.5" />
          <circle cx="450" cy="100" r="2" fill="#8b5cf6" opacity="0.5" />
        </svg>
      </div>

      {/* Sidebar */}
      <aside style={{ width: '260px', background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(59,130,246,0.08)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(59,130,246,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(59,130,246,0.3)' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '18px' }}>I</span>
            </div>
            <div><div style={{ fontWeight: 700, fontSize: '14px', color: '#f1f5f9' }}>IntelliWave</div><div style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase' }}>Settings</div></div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          {[{ label: 'Dashboard', path: '/dashboard' },{ label: 'Intelligence', path: '/intelligence' },{ label: 'Trading', path: '/trading' },{ label: 'Bots', path: '/bots' },{ label: 'Analytics', path: '/analytics' },{ label: 'Settings', path: '/settings' }].map(item => (
            <button key={item.path} onClick={() => router.push(item.path)} style={{ width: '100%', padding: '10px 14px', background: item.path === '/settings' ? 'rgba(59,130,246,0.1)' : 'transparent', border: item.path === '/settings' ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent', borderRadius: '10px', color: item.path === '/settings' ? '#3b82f6' : '#94a3b8', cursor: 'pointer', fontSize: '13px', fontWeight: 500, marginBottom: '2px', textAlign: 'left', fontFamily: 'inherit' }}>{item.label}</button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: '260px', padding: '32px 36px', position: 'relative', zIndex: 1 }}>
        <header style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em' }}>Settings</h1>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>Manage your account, trading preferences, and platform configuration</p>
        </header>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '10px 18px', background: activeTab === tab.id ? 'rgba(59,130,246,0.1)' : 'rgba(15,23,41,0.8)',
              border: `1px solid ${activeTab === tab.id ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.08)'}`,
              borderRadius: '10px', color: activeTab === tab.id ? '#3b82f6' : '#94a3b8', cursor: 'pointer',
              fontSize: '12px', fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px'
            }}>{tab.icon} {tab.label}</button>
          ))}
        </div>

        {/* Settings Content */}
        <div style={{ background: 'rgba(15,23,41,0.85)', backdropFilter: 'blur(20px)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.08)', padding: '28px', maxWidth: '800px' }}>
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9' }}>Profile Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div><label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>First Name</label><input value={settings.firstName} onChange={e => setSettings({...settings, firstName: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: '#0f1729', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} /></div>
                <div><label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Last Name</label><input value={settings.lastName} onChange={e => setSettings({...settings, lastName: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: '#0f1729', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} /></div>
              </div>
              <div><label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Email</label><input value={settings.email} disabled style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,15,30,0.5)', border: '1px solid rgba(59,130,246,0.05)', borderRadius: '8px', color: '#64748b', fontSize: '13px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} /></div>
              <button style={{ padding: '10px 22px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-start', boxShadow: '0 4px 16px rgba(59,130,246,0.3)' }}>Save Changes</button>
            </div>
          )}

          {activeTab === 'trading' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9' }}>Trading Preferences</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div><label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Chart Style</label><select value={settings.chartStyle} onChange={e => setSettings({...settings, chartStyle: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: '#0f1729', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}><option>Candlestick</option><option>Line</option><option>Area</option></select></div>
                <div><label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Timeframe</label><select value={settings.defaultTimeframe} onChange={e => setSettings({...settings, defaultTimeframe: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: '#0f1729', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}><option>1m</option><option>5m</option><option>15m</option><option>1h</option><option>4h</option><option>1D</option></select></div>
                <div><label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Theme</label><select value={settings.theme} onChange={e => setSettings({...settings, theme: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: '#0f1729', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}><option>Dark</option><option>Light</option></select></div>
              </div>
              <button style={{ padding: '10px 22px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-start' }}>Save Preferences</button>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9' }}>Platform Preferences</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div><label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Language</label><select value={settings.language} onChange={e => setSettings({...settings, language: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: '#0f1729', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}>{languages.map(l => <option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}</select></div>
                <div><label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Currency</label><select value={settings.currency} onChange={e => setSettings({...settings, currency: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: '#0f1729', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}>{currencies.map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Timezone</label><select value={settings.timezone} onChange={e => setSettings({...settings, timezone: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: '#0f1729', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}><option>UTC-5 (EST)</option><option>UTC+0 (GMT)</option><option>UTC+3 (EAT)</option><option>UTC+8 (SGT)</option></select></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { key: 'notifications', label: 'Push Notifications' },
                  { key: 'emailAlerts', label: 'Email Alerts' },
                  { key: 'tradeConfirmations', label: 'Trade Confirmations' },
                  { key: 'botAlerts', label: 'Bot Status Alerts' },
                  { key: 'newsAlerts', label: 'Market News Alerts' },
                ].map(item => (
                  <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(10,15,30,0.5)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#e2e8f0' }}>{item.label}</span>
                    <div onClick={() => setSettings({...settings, [item.key]: !(settings as any)[item.key]})} style={{ width: '40px', height: '22px', borderRadius: '11px', background: (settings as any)[item.key] ? '#3b82f6' : '#334155', cursor: 'pointer', position: 'relative', transition: 'all 200ms' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: (settings as any)[item.key] ? '20px' : '2px', transition: 'all 200ms' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'risk' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9' }}>Risk Management</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div><label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Max Drawdown (%)</label><input type="number" value={settings.maxDrawdown} onChange={e => setSettings({...settings, maxDrawdown: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: '#0f1729', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} /></div>
                <div><label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Daily Loss Limit (%)</label><input type="number" value={settings.dailyLossLimit} onChange={e => setSettings({...settings, dailyLossLimit: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: '#0f1729', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} /></div>
                <div><label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Max Positions</label><input type="number" value={settings.maxPositions} onChange={e => setSettings({...settings, maxPositions: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: '#0f1729', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} /></div>
              </div>
              <div style={{ padding: '14px', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '10px' }}>
                <p style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 600, marginBottom: '4px' }}>⚠ Risk Warning</p>
                <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>Trading involves substantial risk. Never trade with money you cannot afford to lose.</p>
              </div>
              <button style={{ padding: '10px 22px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-start' }}>Save Risk Settings</button>
            </div>
          )}

          {activeTab === 'security' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9' }}>Security Settings</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'rgba(10,15,30,0.5)', borderRadius: '8px' }}>
                <div><div style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>Two-Factor Authentication</div><div style={{ fontSize: '11px', color: '#64748b' }}>Add an extra layer of security</div></div>
                <div onClick={() => setSettings({...settings, twoFactor: !settings.twoFactor})} style={{ width: '40px', height: '22px', borderRadius: '11px', background: settings.twoFactor ? '#10b981' : '#334155', cursor: 'pointer', position: 'relative' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: settings.twoFactor ? '20px' : '2px' }} />
                </div>
              </div>
              <div><label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Session Timeout (minutes)</label><input type="number" value={settings.sessionTimeout} onChange={e => setSettings({...settings, sessionTimeout: e.target.value})} style={{ width: '100%', padding: '10px 14px', background: '#0f1729', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} /></div>
              <button style={{ padding: '10px 22px', background: '#ef4444', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-start' }}>Change Password</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
