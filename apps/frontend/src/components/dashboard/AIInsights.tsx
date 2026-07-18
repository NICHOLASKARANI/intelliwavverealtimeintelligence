'use client';

import { useState } from 'react';

interface Insight {
  id: number;
  type: 'opportunity' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  action?: string;
  confidence?: number;
}

const insights: Insight[] = [
  { id: 1, type: 'opportunity', title: 'Volatility 75 Breakout', description: 'Bullish flag pattern forming on 1H timeframe. RSI at 62 with increasing volume. Probability of upward breakout: 72%.', action: 'View Chart', confidence: 72 },
  { id: 2, type: 'warning', title: 'Portfolio Correlation Alert', description: 'V75 and V100 showing 0.78 correlation. Consider reducing exposure to one asset to manage concentration risk.', action: 'Adjust Position', confidence: 85 },
  { id: 3, type: 'success', title: 'Bot Performance Update', description: 'MA Crossover Pro bot achieved +3.2% today. Win rate improved to 68.4%. 12 consecutive winning trades.', action: 'View Bot', confidence: 90 },
  { id: 4, type: 'info', title: 'Market Session Change', description: 'London session closing in 15 minutes. Expect increased volatility during session overlap with New York.', action: 'Set Alert', confidence: 65 },
  { id: 5, type: 'opportunity', title: 'Crash 300 Oversold', description: 'Stochastic indicates oversold conditions at 18.5. Historical bounce rate at this level: 76%. Mean reversion opportunity.', action: 'Analyze', confidence: 68 },
];

const typeStyles: Record<string, { bg: string; border: string; icon: string; color: string }> = {
  opportunity: { bg: 'rgba(16,185,129,0.04)', border: 'rgba(16,185,129,0.15)', icon: '📈', color: '#10b981' },
  warning: { bg: 'rgba(245,158,11,0.04)', border: 'rgba(245,158,11,0.15)', icon: '⚠️', color: '#f59e0b' },
  success: { bg: 'rgba(59,130,246,0.04)', border: 'rgba(59,130,246,0.15)', icon: '✅', color: '#3b82f6' },
  info: { bg: 'rgba(139,92,246,0.04)', border: 'rgba(139,92,246,0.15)', icon: 'ℹ️', color: '#8b5cf6' },
};

export function AIInsights() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>✦</span>
          AI Market Intelligence
        </h3>
        <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>● Live</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '500px', overflowY: 'auto' }}>
        {insights.map(insight => {
          const style = typeStyles[insight.type];
          const isExpanded = expanded === insight.id;

          return (
            <div key={insight.id}
              onClick={() => setExpanded(isExpanded ? null : insight.id)}
              style={{
                background: style.bg,
                border: `1px solid ${style.border}`,
                borderRadius: '12px',
                padding: '14px 16px',
                cursor: 'pointer',
                transition: 'all 200ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = style.color + '40'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = style.border; }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '16px', flexShrink: 0 }}>{style.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: style.color, margin: 0 }}>{insight.title}</h4>
                    {insight.confidence && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '40px', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                          <div style={{ width: `${insight.confidence}%`, height: '100%', background: style.color, borderRadius: '2px' }} />
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 600, color: style.color, fontFamily: "'JetBrains Mono', monospace" }}>{insight.confidence}%</span>
                      </div>
                    )}
                  </div>
                  <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5, margin: '6px 0 0' }}>
                    {isExpanded ? insight.description : insight.description.slice(0, 100) + '...'}
                  </p>
                  {isExpanded && insight.action && (
                    <button style={{ marginTop: '10px', padding: '6px 14px', background: style.color + '20', border: `1px solid ${style.color}40`, borderRadius: '6px', color: style.color, cursor: 'pointer', fontSize: '11px', fontWeight: 600, fontFamily: 'inherit' }}>
                      {insight.action} →
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
