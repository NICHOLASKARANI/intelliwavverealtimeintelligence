'use client';

import { useState } from 'react';

interface Market {
  symbol: string; price: string; change: string; volume: string; sentiment: string; aiScore: number; category: string;
}

const markets: Market[] = [
  { symbol: 'Volatility 75 Index', price: '1,234.56', change: '+2.45%', volume: '12.4K', sentiment: 'Bullish', aiScore: 72, category: 'Synthetic' },
  { symbol: 'Volatility 100 Index', price: '5,678.90', change: '-0.87%', volume: '8.2K', sentiment: 'Bearish', aiScore: 45, category: 'Synthetic' },
  { symbol: 'Boom 300 Index', price: '3,456.78', change: '+1.34%', volume: '15.1K', sentiment: 'Bullish', aiScore: 68, category: 'Synthetic' },
  { symbol: 'Crash 300 Index', price: '2,345.67', change: '+3.21%', volume: '9.8K', sentiment: 'Bullish', aiScore: 81, category: 'Synthetic' },
  { symbol: 'EUR/USD', price: '1.0856', change: '+0.12%', volume: '45.2K', sentiment: 'Neutral', aiScore: 55, category: 'Forex' },
  { symbol: 'GBP/USD', price: '1.2645', change: '-0.23%', volume: '32.1K', sentiment: 'Bearish', aiScore: 42, category: 'Forex' },
  { symbol: 'BTC/USD', price: '67,890.00', change: '+4.56%', volume: '89.3K', sentiment: 'Bullish', aiScore: 78, category: 'Crypto' },
  { symbol: 'ETH/USD', price: '3,456.78', change: '+2.34%', volume: '56.7K', sentiment: 'Bullish', aiScore: 65, category: 'Crypto' },
  { symbol: 'Gold', price: '2,345.60', change: '+0.45%', volume: '23.4K', sentiment: 'Bullish', aiScore: 60, category: 'Commodities' },
  { symbol: 'S&P 500', price: '5,234.56', change: '+0.89%', volume: '67.8K', sentiment: 'Bullish', aiScore: 71, category: 'Indices' },
];

const categories = ['All', 'Favorites', 'Synthetic', 'Forex', 'Crypto', 'Commodities', 'Indices'];

export default function MarketExplorer({ onSelect }: { onSelect: (m: Market) => void }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>(['Volatility 75 Index', 'EUR/USD']);

  const filtered = markets.filter(m => {
    if (category === 'Favorites') return favorites.includes(m.symbol);
    if (category !== 'All' && m.category !== category) return false;
    if (search && !m.symbol.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid rgba(59,130,246,0.08)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', marginBottom: '12px' }}>Market Explorer</h3>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search markets..." style={{ width: '100%', padding: '8px 12px', background: '#0f1729', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', color: '#f1f5f9', fontSize: '12px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
      </div>
      <div style={{ padding: '8px 12px', display: 'flex', gap: '4px', flexWrap: 'wrap', borderBottom: '1px solid rgba(59,130,246,0.08)' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{ padding: '5px 10px', fontSize: '10px', fontWeight: 600, background: category === c ? 'rgba(59,130,246,0.15)' : 'transparent', border: `1px solid ${category === c ? 'rgba(59,130,246,0.3)' : 'transparent'}`, borderRadius: '6px', color: category === c ? '#3b82f6' : '#64748b', cursor: 'pointer', fontFamily: 'inherit' }}>{c}</button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        {filtered.map((m, i) => (
          <div key={i} onClick={() => onSelect(m)} style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '2px', transition: 'all 150ms', background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                <span onClick={e => { e.stopPropagation(); toggleFavorite(m.symbol); }} style={{ cursor: 'pointer', fontSize: '12px', color: favorites.includes(m.symbol) ? '#f59e0b' : '#334155' }}>{favorites.includes(m.symbol) ? '★' : '☆'}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.symbol}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: '#e2e8f0' }}>{m.price}</span>
                <span style={{ fontSize: '11px', marginLeft: '8px', color: m.change.startsWith('+') ? '#10b981' : '#ef4444' }}>{m.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
