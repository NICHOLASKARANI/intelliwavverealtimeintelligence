'use client';

import { useState } from 'react';

export default function AICopilot() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: string; content: string}[]>([
    { role: 'ai', content: 'Welcome to IntelliWave AI. I analyze markets, explain trades, and help optimize your strategy. Ask me anything about your trading.' }
  ]);

  const handleQuery = () => {
    if (!query.trim()) return;
    const userMsg = { role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');

    // AI response logic
    let response = 'I analyze market conditions and trading patterns.';
    const q = query.toLowerCase();
    if (q.includes('market') || q.includes('analysis')) response = 'Based on current analysis, Volatility 75 shows bullish momentum with RSI at 62. Key support at 1,200 and resistance at 1,280. MACD crossover suggests upward continuation. Confidence: 72%';
    else if (q.includes('risk')) response = 'Your portfolio has a Sharpe ratio of 1.8 and max drawdown of 12.4%. Risk exposure is moderate. Correlation between V75 and V100 is 0.78 - consider reducing one position.';
    else if (q.includes('strategy') || q.includes('suggest')) response = 'Based on current market conditions, consider: 1) RSI mean reversion on V75 (15min), 2) Trend following on Boom 300, 3) Grid strategy on range-bound markets.';
    else if (q.includes('explain') || q.includes('indicator')) response = 'RSI (Relative Strength Index) measures momentum. Above 70 = overbought, below 30 = oversold. Current RSI at 62 shows room for upside. Use with trend confirmation for best results.';

    setTimeout(() => setMessages(prev => [...prev, { role: 'ai', content: response }]), 500);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid rgba(139,92,246,0.15)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>✦</span> AI Copilot
        </h3>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ padding: '10px 14px', borderRadius: '10px', background: msg.role === 'ai' ? 'rgba(139,92,246,0.06)' : 'rgba(59,130,246,0.06)', border: `1px solid ${msg.role === 'ai' ? 'rgba(139,92,246,0.12)' : 'rgba(59,130,246,0.12)'}`, fontSize: '12px', color: msg.role === 'ai' ? '#c4b5fd' : '#93c5fd', lineHeight: 1.5 }}>
            {msg.content}
          </div>
        ))}
      </div>
      <div style={{ padding: '12px', borderTop: '1px solid rgba(139,92,246,0.1)' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleQuery()} placeholder="Ask AI about markets..." style={{ flex: 1, padding: '8px 12px', background: '#0f1729', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '12px', fontFamily: 'inherit', outline: 'none' }} />
          <button onClick={handleQuery} style={{ padding: '8px 14px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '12px', fontFamily: 'inherit' }}>Ask</button>
        </div>
        <div style={{ display: 'flex', gap: '4px', marginTop: '8px', flexWrap: 'wrap' }}>
          {['Market analysis', 'Risk check', 'Strategy help', 'Explain indicator'].map(s => (
            <span key={s} onClick={() => { setQuery(s); setTimeout(() => handleQuery(), 100); }} style={{ padding: '4px 8px', background: 'rgba(139,92,246,0.08)', borderRadius: '100px', fontSize: '10px', color: '#a78bfa', cursor: 'pointer', fontWeight: 500 }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
