export const metadata = {
  title: 'IntelliWave ITIS | Enterprise AI Trading Platform',
  description: 'Next-generation AI-powered automated trading ecosystem. Professional-grade analytics, bot automation, and real-time market intelligence.',
  keywords: 'AI trading, automated trading, bot trading, deriv, volatility indices, trading platform',
  openGraph: {
    title: 'IntelliWave ITIS - Enterprise AI Trading',
    description: 'Professional AI-powered trading platform with automated bots, real-time analytics, and enterprise security.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0a0f1e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            /* Brand Colors */
            --brand-primary: #3b82f6;
            --brand-primary-hover: #2563eb;
            --brand-secondary: #8b5cf6;
            --brand-accent: #06b6d4;
            
            /* Semantic Colors */
            --success: #10b981;
            --success-bg: rgba(16, 185, 129, 0.1);
            --warning: #f59e0b;
            --warning-bg: rgba(245, 158, 11, 0.1);
            --danger: #ef4444;
            --danger-bg: rgba(239, 68, 68, 0.1);
            --info: #3b82f6;
            --info-bg: rgba(59, 130, 246, 0.1);
            
            /* Surfaces */
            --surface-primary: #0a0f1e;
            --surface-secondary: #0f1729;
            --surface-tertiary: #131c31;
            --surface-card: rgba(15, 23, 41, 0.8);
            --surface-glass: rgba(19, 28, 49, 0.75);
            --surface-elevated: rgba(25, 35, 55, 0.9);
            --surface-input: rgba(10, 15, 30, 0.8);
            
            /* Borders */
            --border-subtle: rgba(59, 130, 246, 0.08);
            --border-default: rgba(59, 130, 246, 0.12);
            --border-strong: rgba(59, 130, 246, 0.2);
            --border-active: rgba(59, 130, 246, 0.4);
            
            /* Text */
            --text-primary: #f1f5f9;
            --text-secondary: #94a3b8;
            --text-tertiary: #64748b;
            --text-disabled: #475569;
            --text-inverse: #0a0f1e;
            
            /* Shadows */
            --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
            --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
            --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
            --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.6);
            --shadow-glow: 0 0 40px rgba(59, 130, 246, 0.15);
            --shadow-glow-lg: 0 0 80px rgba(59, 130, 246, 0.2);
            
            /* Radius */
            --radius-xs: 4px;
            --radius-sm: 8px;
            --radius-md: 12px;
            --radius-lg: 16px;
            --radius-xl: 20px;
            --radius-2xl: 24px;
            
            /* Spacing Scale */
            --space-1: 4px;
            --space-2: 8px;
            --space-3: 12px;
            --space-4: 16px;
            --space-5: 20px;
            --space-6: 24px;
            --space-8: 32px;
            --space-10: 40px;
            --space-12: 48px;
            --space-16: 64px;
            
            /* Transitions */
            --transition-fast: 120ms cubic-bezier(0.4, 0, 0.2, 1);
            --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
            --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
            --transition-spring: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
            
            /* Z-Index Scale */
            --z-base: 0;
            --z-dropdown: 100;
            --z-sticky: 200;
            --z-overlay: 300;
            --z-modal: 400;
            --z-toast: 500;
            --z-tooltip: 600;
          }
          
          /* Reset */
          *, *::before, *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html {
            font-size: 16px;
            -webkit-text-size-adjust: 100%;
            scroll-behavior: smooth;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--surface-primary);
            color: var(--text-primary);
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            overflow-x: hidden;
          }
          
          /* Scrollbar */
          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
          ::-webkit-scrollbar-corner { background: transparent; }
          
          /* Selection */
          ::selection { background: rgba(59, 130, 246, 0.3); color: white; }
          ::-moz-selection { background: rgba(59, 130, 246, 0.3); color: white; }
          
          /* Focus */
          :focus-visible {
            outline: 2px solid var(--brand-primary);
            outline-offset: 2px;
            border-radius: var(--radius-xs);
          }
          
          /* Typography */
          h1, h2, h3, h4, h5, h6 { font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; }
          h1 { font-size: 2rem; }
          h2 { font-size: 1.5rem; }
          h3 { font-size: 1.25rem; }
          h4 { font-size: 1.125rem; }
          
          /* Utility Classes */
          .mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; font-feature-settings: 'tnum', 'zero', 'ss01'; }
          .dm-sans { font-family: 'DM Sans', sans-serif; }
          
          .glass {
            background: var(--surface-glass);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid var(--border-default);
          }
          
          .glass-card {
            background: var(--surface-card);
            backdrop-filter: blur(16px) saturate(180%);
            -webkit-backdrop-filter: blur(16px) saturate(180%);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-md);
            transition: all var(--transition-base);
          }
          .glass-card:hover {
            border-color: var(--border-default);
            box-shadow: var(--shadow-lg), var(--shadow-glow);
            transform: translateY(-1px);
          }
          
          .glass-card-interactive {
            cursor: pointer;
          }
          .glass-card-interactive:active {
            transform: translateY(0);
            box-shadow: var(--shadow-sm);
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .gradient-border {
            position: relative;
            border-radius: var(--radius-lg);
            background: linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3), rgba(6,182,212,0.3));
            padding: 1px;
          }
          .gradient-border > * {
            background: var(--surface-secondary);
            border-radius: calc(var(--radius-lg) - 1px);
            height: 100%;
          }
          
          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-2);
            padding: 10px 20px;
            border: none;
            border-radius: var(--radius-md);
            font-family: 'Inter', sans-serif;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
            transition: all var(--transition-fast);
            white-space: nowrap;
            user-select: none;
          }
          .btn:active { transform: scale(0.98); }
          .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
          
          .btn-primary {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            color: white;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
          }
          .btn-primary:hover:not(:disabled) {
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
            transform: translateY(-1px);
          }
          
          .btn-secondary {
            background: var(--surface-elevated);
            color: var(--text-primary);
            border: 1px solid var(--border-default);
          }
          .btn-secondary:hover:not(:disabled) {
            background: var(--surface-glass);
            border-color: var(--border-strong);
          }
          
          .btn-success {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
          }
          .btn-danger {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
          }
          
          .btn-sm { padding: 6px 12px; font-size: 0.75rem; border-radius: var(--radius-sm); }
          .btn-lg { padding: 14px 28px; font-size: 1rem; border-radius: var(--radius-lg); }
          
          .input {
            width: 100%;
            padding: 10px 14px;
            background: var(--surface-input);
            border: 1px solid var(--border-default);
            border-radius: var(--radius-md);
            color: var(--text-primary);
            font-size: 0.875rem;
            font-family: 'Inter', sans-serif;
            transition: all var(--transition-fast);
            outline: none;
          }
          .input:hover { border-color: var(--border-strong); }
          .input:focus { border-color: var(--brand-primary); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
          .input::placeholder { color: var(--text-tertiary); }
          
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 3px 10px;
            border-radius: 100px;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.01em;
          }
          .badge-success { background: var(--success-bg); color: var(--success); }
          .badge-warning { background: var(--warning-bg); color: var(--warning); }
          .badge-danger { background: var(--danger-bg); color: var(--danger); }
          .badge-info { background: var(--info-bg); color: var(--info); }
          
          .stat-value { font-size: 1.75rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1; }
          .stat-label { font-size: 0.6875rem; font-weight: 600; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.08em; }
          .stat-change { font-size: 0.8125rem; font-weight: 600; }
          
          /* Animations */
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInRight { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
          @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(59,130,246,0.1); } 50% { box-shadow: 0 0 40px rgba(59,130,246,0.2); } }
          @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 33% { transform: translateY(-12px) rotate(1deg); } 66% { transform: translateY(6px) rotate(-1deg); } }
          
          .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
          .animate-fadeInUp { animation: fadeInUp 0.5s ease-out; }
          .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
          .animate-glow { animation: pulse-glow 2s ease-in-out infinite; }
          
          .skeleton {
            background: linear-gradient(90deg, var(--surface-tertiary) 25%, var(--surface-elevated) 50%, var(--surface-tertiary) 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            border-radius: var(--radius-sm);
          }
          
          /* Layout Helpers */
          .flex-center { display: flex; align-items: center; justify-content: center; }
          .flex-between { display: flex; align-items: center; justify-content: space-between; }
          .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-5); }
          .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5); }
          .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-5); }
          .gap-3 { gap: var(--space-3); }
          .gap-4 { gap: var(--space-4); }
          .gap-5 { gap: var(--space-5); }
          .gap-6 { gap: var(--space-6); }
          
          @media (max-width: 1400px) { .grid-4 { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 1024px) { .grid-3 { grid-template-columns: repeat(2, 1fr); } .grid-4 { grid-template-columns: 1fr; } }
          @media (max-width: 768px) { 
            .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
            h1 { font-size: 1.5rem; }
            h2 { font-size: 1.25rem; }
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
