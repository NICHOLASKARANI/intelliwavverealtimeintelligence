'use client';

interface AllocationItem {
  label: string;
  percentage: number;
  color: string;
  value: string;
}

export function PortfolioAllocation({ data }: { data: AllocationItem[] }) {
  const total = data.reduce((sum, item) => sum + item.percentage, 0);
  let cumulativePercent = 0;

  return (
    <div>
      <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px' }}>Portfolio Allocation</h3>
      
      {/* Donut Chart */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          {data.map((item, i) => {
            const startAngle = (cumulativePercent / 100) * 360;
            cumulativePercent += item.percentage;
            const endAngle = (cumulativePercent / 100) * 360;
            const startRad = ((startAngle - 90) * Math.PI) / 180;
            const endRad = ((endAngle - 90) * Math.PI) / 180;
            const r = 60;
            const cx = 80, cy = 80;
            const x1 = cx + r * Math.cos(startRad);
            const y1 = cy + r * Math.sin(startRad);
            const x2 = cx + r * Math.cos(endRad);
            const y2 = cy + r * Math.sin(endRad);
            const largeArc = item.percentage > 50 ? 1 : 0;
            return (
              <path key={i}
                d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`}
                fill={item.color}
                stroke="#0a0f1e"
                strokeWidth="2"
                style={{ transition: 'all 300ms', cursor: 'pointer' }}
              />
            );
          })}
          <circle cx="80" cy="80" r="38" fill="#0a0f1e" />
          <text x="80" y="76" textAnchor="middle" fill="#f1f5f9" fontSize="20" fontWeight={800} fontFamily="'JetBrains Mono', monospace">${total}</text>
          <text x="80" y="94" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight={600}>Total</text>
        </svg>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(10,15,30,0.5)', borderRadius: '8px', transition: 'all 150ms', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,15,30,0.5)'; }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: item.color }} />
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#e2e8f0' }}>{item.label}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#f1f5f9', fontFamily: "'JetBrains Mono', monospace" }}>{item.value}</span>
              <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '8px' }}>{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
