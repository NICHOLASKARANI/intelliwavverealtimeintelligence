'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001/api' });

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', username: '', password: '', firstName: '', lastName: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/register', form);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', fontFamily: 'Arial' }}>
      <div style={{ background: '#1e293b', borderRadius: '16px', padding: '40px', width: '400px', border: '1px solid #334155' }}>
        <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '8px' }}>Create Account</h1>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '24px', fontSize: '14px' }}>Join IntelliWave ITIS</p>
        
        {error && <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px', textAlign: 'center', background: 'rgba(239,68,68,0.1)', padding: '10px', borderRadius: '8px' }}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="Email" required style={{ width: '100%', padding: '12px', marginBottom: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} type="text" placeholder="Username" required style={{ width: '100%', padding: '12px', marginBottom: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" placeholder="Password (min 8 chars)" required style={{ width: '100%', padding: '12px', marginBottom: '20px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: loading ? '#2563eb' : '#3b82f6', border: 'none', borderRadius: '8px', color: 'white', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? 'Creating...' : 'Sign Up'}</button>
        </form>
        
        <p style={{ color: '#64748b', textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
          Already have an account? <Link href="/login" style={{ color: '#3b82f6' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}