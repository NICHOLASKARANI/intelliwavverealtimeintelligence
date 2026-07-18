'use client';

import { useState } from 'react';

interface EquityPoint {
  date: string;
  value: number;
}

export function PerformanceChart({ data }: { data: EquityPoint[] }) {
  const [period, setPeriod] = useState('1M');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  if (!data || data.length === 0) {
    const sampleData = [];
    let value = 10000;
    for (let i = 0; i < 30; i++) {
      value += (Math.random() - 0.45) * 300;
      sampleData.push({ date: `Day ${i+1}`, value: Math.round(value) });
    }
    data = sampleData;
  }

  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  const width = 600; const height = 250; const padding = 40;
  const points = data.map((d, i) => ({
    x: padding + (i / (data.length - 1)) * (width - padding * 2),
    y: height - padding - ((d.value - min) / range) * (height - padding * 2),
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${points[points.length-1].x},${height-padding} L${points[0].x},${height-padding} Z`;

  const change = ((data[data.length-1].value - data[0].value) / data[0].value * 100).toFixed(2);
  const isPositive = Number(change) >= 0;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Portfolio Performance</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <span style={{ fontSize: '20px', fontWeight: 800, color: isPositive ? '#10b981' : '#ef4444', fontFamily: "'JetBrains Mono', monospace" }}>{isPositive ? '+' : ''}{change}%</span>
            <span style={{ fontSize: '11px', color: '#64748b' }}>{period} return</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {['1W','1M','3M','6M','1Y','ALL'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{ padding: '5px 10px', fontSize: '10px', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", background: period === p ? 'rgba(59,130,246,0.15)' : 'transparent', border: `1px solid ${period === p ? 'rgba(59,130,246,0.3)' : 'transparent'}`, borderRadius: '5px', color: period === p ? '#3b82f6' : '#64748b', cursor: 'pointer' }}>{p}</button>
          ))}
        </div>
      </div>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0.2"/>
            <stop offset="100%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0,0.25,0.5,0.75,1].map(ratio => {
          const y = height - padding - ratio * (height - padding * 2);
          return (
            <g key={ratio}>
              <line x1={padding} y1={y} x2={width-padding} y2={y} stroke="rgba(59,130,246,0.06)" strokeWidth="1" />
              <text x={padding-8} y={y+4} textAnchor="end" fill="#64748b" fontSize="9" fontFamily="'JetBrains Mono', monospace">
                ${Math.round(min + ratio * range).toLocaleString()}
              </text>
            </g>
          );
        })}

        {/* Area */}
        <path d={areaPath} fill="url(#areaGrad)" />
        {/* Line */}
        <path d={linePath} fill="none" stroke={isPositive ? '#10b981' : '#ef4444'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Hover point */}
        {hoveredPoint !== null && points[hoveredPoint] && (
          <g>
            <circle cx={points[hoveredPoint].x} cy={points[hoveredPoint].y} r="5" fill={isPositive ? '#10b981' : '#ef4444'} stroke="white" strokeWidth="2" />
            <rect x={points[hoveredPoint].x - 40} y={points[hoveredPoint].y - 40} width="80" height="30" rx="6" fill="#1e293b" stroke="rgba(59,130,246,0.2)" />
            <text x={points[hoveredPoint].x} y={points[hoveredPoint].y - 18} textAnchor="middle" fill="white" fontSize="11" fontWeight={600} fontFamily="'JetBrains Mono', monospace">
              ${points[hoveredPoint].value.toLocaleString()}
            </text>
          </g>
        )}

        {/* Invisible hover areas */}
        {points.map((p, i) => (
          <rect key={i} x={p.x-8} y={0} width="16" height={height} fill="transparent"
            onMouseEnter={() => setHoveredPoint(i)}
            onMouseLeave={() => setHoveredPoint(null)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </svg>
    </div>
  );
}
