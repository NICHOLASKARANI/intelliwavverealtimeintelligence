export default function AdminUsersPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', color: '#f1f5f9', padding: '40px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 800 }}>User Management</h1>
      <p style={{ color: '#94a3b8', marginTop: '8px' }}>Manage platform users, roles, and permissions.</p>
      <div style={{ marginTop: '32px', background: 'rgba(15,23,41,0.8)', borderRadius: '12px', border: '1px solid rgba(59,130,246,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(59,130,246,0.1)' }}>
              {['User', 'Email', 'Role', 'Status', 'Joined'].map(h => (
                <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Alex Trader', email: 'demo@intelliwave.com', role: 'Professional', status: 'Active', date: '2024-01-15' },
              { name: 'Sarah Chen', email: 'sarah@example.com', role: 'Enterprise', status: 'Active', date: '2024-02-20' },
              { name: 'Mike Johnson', email: 'mike@example.com', role: 'Starter', status: 'Active', date: '2024-03-10' },
            ].map((user, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <td style={{ padding: '14px 20px', fontWeight: 600, color: '#f1f5f9' }}>{user.name}</td>
                <td style={{ padding: '14px 20px', color: '#94a3b8' }}>{user.email}</td>
                <td style={{ padding: '14px 20px' }}><span style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>{user.role}</span></td>
                <td style={{ padding: '14px 20px' }}><span style={{ color: '#10b981', fontSize: '13px' }}>● {user.status}</span></td>
                <td style={{ padding: '14px 20px', color: '#64748b' }}>{user.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
