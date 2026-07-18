'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Clear all auth data
    localStorage.clear();
    document.cookie = 'accessToken=; max-age=0; path=/';
    document.cookie = 'auth_token=; max-age=0; path=/';

    // Countdown then redirect
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 16px 48px rgba(59,130,246,0.3)' }}>
          <span style={{ color: 'white', fontSize: '36px', fontWeight: 800 }}>I</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#f1f5f9', marginBottom: '8px' }}>You have been logged out</h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '8px' }}>Thank you for using IntelliWave ITIS</p>
        <p style={{ color: '#64748b', fontSize: '13px' }}>
          Redirecting to login in <span style={{ color: '#3b82f6', fontWeight: 700 }}>{countdown}</span> seconds...
        </p>
        <button onClick={() => router.push('/login')} style={{ marginTop: '24px', padding: '12px 28px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(59,130,246,0.3)' }}>
          Go to Login Now
        </button>
      </div>
    </div>
  );
}
