import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'IntelliWave ITIS | Enterprise AI Trading Platform',
    template: '%s | IntelliWave ITIS',
  },
  description: 'Next-generation AI-powered automated trading ecosystem with real-time analytics, bot automation, and enterprise security. Trade smarter with IntelliWave.',
  keywords: ['AI trading', 'automated trading', 'bot trading', 'deriv', 'volatility indices', 'trading platform', 'forex', 'crypto', 'financial markets'],
  authors: [{ name: 'IntelliWave Technologies' }],
  creator: 'IntelliWave Technologies',
  publisher: 'IntelliWave Technologies',
  metadataBase: new URL('https://intelliwavverealtimeintelligence.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'IntelliWave ITIS',
    title: 'IntelliWave ITIS | Enterprise AI Trading Platform',
    description: 'AI-powered automated trading ecosystem with real-time analytics and enterprise security.',
    url: 'https://intelliwavverealtimeintelligence.vercel.app',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IntelliWave ITIS',
    description: 'Enterprise AI Trading Platform',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0f1e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0a0f1e' }}>{children}</body>
    </html>
  );
}
