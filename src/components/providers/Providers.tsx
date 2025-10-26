'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider, http, createConfig } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Create wagmi config outside component to prevent recreation
const wagmiConfig = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
  },
  ssr: true,
});

export function Providers({ 
  children,
  locale 
}: { 
  children: React.ReactNode;
  locale: string;
}) {
  // Create QueryClient instance once per component mount (SSR-safe)
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000, // 1 minute
      },
    },
  }));

  // Set document language on client-side
  useEffect(() => {
    document.documentElement.lang = locale;
    document.body.className = inter.className;
  }, [locale]);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#6366f1',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
          })}
        >
          <div className="flex flex-col min-h-screen bg-background cyber-grid">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#18181b',
                color: '#fff',
                border: '1px solid #6366f1',
              },
            }}
          />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

