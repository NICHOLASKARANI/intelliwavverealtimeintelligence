export default function AdminPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', color: '#f1f5f9', padding: '40px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Admin Dashboard</h1>
      <p style={{ color: '#94a3b8', marginTop: '8px' }}>System management and monitoring.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '32px' }}>
        <div style={{ background: 'rgba(15,23,41,0.8)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(59,130,246,0.1)' }}>
          <h3>Users</h3>
          <p style={{ fontSize: '32px', fontWeight: 800, color: '#3b82f6' }}>1,234</p>
        </div>
        <div style={{ background: 'rgba(15,23,41,0.8)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(59,130,246,0.1)' }}>
          <h3>Revenue</h3>
          <p style={{ fontSize: '32px', fontWeight: 800, color: '#10b981' }}>$45,678</p>
        </div>
      </div>
    </div>
  );
}
