import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hermes AI Analyzer - Token Analysis Platform',
  description: 'AI-powered token analysis on BSC with advanced scoring system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="dark">
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}

