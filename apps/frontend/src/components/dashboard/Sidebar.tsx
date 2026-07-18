'use client';

import { useRouter } from 'next/navigation';
import { LayoutDashboard, TrendingUp, Bot, BarChart3, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: TrendingUp, label: 'Trading', path: '/trading' },
    { icon: Bot, label: 'Bots', path: '/bots' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div style={{ width: '240px', minHeight: '100vh', background: '#1e293b', borderRight: '1px solid #334155', padding: '20px 0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #334155', marginBottom: '20px' }}>
        <h2 style={{ color: '#3b82f6', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>IntelliWave</h2>
        <p style={{ color: '#64748b', fontSize: '11px', margin: '4px 0 0' }}>ITIS Platform</p>
      </div>
      
      <nav style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <button key={item.path} onClick={() => router.push(item.path)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 20px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px', textAlign: 'left' }}>
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>
      
      <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 20px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px', marginTop: 'auto' }}>
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
