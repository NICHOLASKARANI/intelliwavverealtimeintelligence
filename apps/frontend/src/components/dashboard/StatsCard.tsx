'use client';

import { useState, useEffect } from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
  sparkline?: number[];
  subtitle?: string;
}

export function StatsCard({ title, value, change, icon, color, sparkline, subtitle }: StatsCardProps) {
  const [hovered, setHovered] = useState(false);
  const isPositive = change.startsWith('+');

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(15,23,41,0.85)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        border: `1px solid ${hovered ? `${color}40` : 'rgba(59,130,246,0.08)'}`,
        padding: '22px 24px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? `0 12px 40px ${color}15` : '0 4px 16px rgba(0,0,0,0.2)',
        cursor: 'pointer',
      }}
    >
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '-30px', right: '-30px', fontSize: '100px', color, opacity: hovered ? 0.06 : 0.03, fontWeight: 900, lineHeight: 1, pointerEvents: 'none', transition: 'opacity 250ms' }}>
        {icon}
      </div>

      {/* Sparkline */}
      {sparkline && sparkline.length > 0 && (
        <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '40px', opacity: 0.3 }}>
          <svg width="100%" height="40" viewBox={`0 0 ${sparkline.length * 10} 40`} preserveAspectRatio="none">
            <defs>
              <linearGradient id={`grad-${title.replace(/\s/g,'')}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.4"/>
                <stop offset="100%" stopColor={color} stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path
              d={`M0,40 ${sparkline.map((v,i) => `L${i*10},${40-(v/Math.max(...sparkline))*35}`).join(' ')} L${(sparkline.length-1)*10},40 Z`}
              fill={`url(#grad-${title.replace(/\s/g,'')})`}
            />
            <path
              d={`M0,${40-(sparkline[0]/Math.max(...sparkline))*35} ${sparkline.map((v,i) => `L${i*10},${40-(v/Math.max(...sparkline))*35}`).join(' ')}`}
              fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>{title}</p>
          <span style={{
            padding: '3px 10px',
            borderRadius: '100px',
            fontSize: '11px',
            fontWeight: 700,
            background: isPositive ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
            color: isPositive ? '#10b981' : '#ef4444',
            border: `1px solid ${isPositive ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
          }}>{change}</span>
        </div>
        <p style={{ fontSize: '28px', fontWeight: 800, color, letterSpacing: '-0.03em', margin: '0 0 4px', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>{value}</p>
        {subtitle && <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{subtitle}</p>}
      </div>
    </div>
  );
}
