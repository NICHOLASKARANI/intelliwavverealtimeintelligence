import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'IntelliWave ITIS | Enterprise AI Trading Platform', template: '%s | IntelliWave ITIS' },
  description: 'Next-generation AI-powered automated trading ecosystem with real-time analytics, bot automation, and enterprise security.',
  icons: { icon: '/favicon.ico', apple: '/favicon.ico' },
  openGraph: {
    title: 'IntelliWave ITIS | Enterprise AI Trading',
    description: 'AI-powered automated trading ecosystem.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'IntelliWave ITIS', images: ['/og-image.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0f1e" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0a0f1e' }}>{children}</body>
    </html>
  );
}
