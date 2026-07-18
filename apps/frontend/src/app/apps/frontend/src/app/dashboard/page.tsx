'use client';

import React from 'react';

export default function DashboardPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      color: 'white',
      padding: '40px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
        Welcome to IntelliWave ITIS
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '40px' }}>
        AI-Powered Trading Platform
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
      }}>
        {/* Portfolio Card */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          padding: '24px',
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>📊 Portfolio Value</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#3b82f6' }}>$12,450.00</p>
          <p style={{ color: '#10b981', fontSize: '14px' }}>+15.2% this month</p>
        </div>

        {/* Active Bots Card */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          padding: '24px',
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>🤖 Active Bots</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#8b5cf6' }}>3</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>Running strategies</p>
        </div>

        {/* Today P&L Card */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          padding: '24px',
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>💰 Today P&L</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#10b981' }}>+$234.50</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>12 trades today</p>
        </div>

        {/* Win Rate Card */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          padding: '24px',
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>🎯 Win Rate</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#f59e0b' }}>68%</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>+5% vs last week</p>
        </div>
      </div>

      {/* Status Section */}
      <div style={{
        marginTop: '32px',
        padding: '16px',
        background: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        borderRadius: '12px',
        color: '#10b981',
        fontSize: '14px',
      }}>
        ✅ Backend API: Connected | ✅ Database: Online | ✅ Redis: Connected
      </div>
    </div>
  );
}
