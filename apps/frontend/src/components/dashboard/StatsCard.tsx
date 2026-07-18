'use client';

export default function StatsCard({ title, value, change, color }: { title: string; value: string; change: string; color: string }) {
  return (
    <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
      <p style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '14px' }}>{title}</p>
      <p style={{ fontSize: '28px', fontWeight: 'bold', color, margin: '0 0 8px' }}>{value}</p>
      <p style={{ color: change.startsWith('+') ? '#10b981' : '#ef4444', fontSize: '13px', margin: 0 }}>{change}</p>
    </div>
  );
}
