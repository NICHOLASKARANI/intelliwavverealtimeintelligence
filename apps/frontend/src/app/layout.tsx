import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IntelliWave ITIS | Enterprise AI Trading Platform',
  description: 'AI-powered automated trading ecosystem with real-time analytics.',
  icons: { icon: '/favicon.ico', apple: '/favicon.ico' },
  openGraph: {
    title: 'IntelliWave ITIS',
    description: 'Enterprise AI Trading Platform',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
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
