'use client';

import { ReactNode, useEffect } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

// Simplified error suppression without complex memory allocation
const suppressErrors = () => {
  if (typeof window === 'undefined') return;

  // Store original console methods
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  // Disable problematic SDKs
  (window as any).__DISABLE_BASE_ACCOUNT__ = true;
  (window as any).__DISABLE_ANALYTICS__ = true;
  (window as any).__ONCHAINKIT_DISABLE_BASE_ACCOUNT__ = true;
  (window as any).__DISABLE_COINBASE_WALLET__ = true;

  // Simple console error filtering
  console.error = (...args: any[]) => {
    const message = args.join(' ');
    
    // Suppress known SDK errors
    if (
      message.includes('IndexedDB') ||
      message.includes('storage usage') ||
      message.includes('Base Account') ||
      message.includes('ERR_ABORTED') ||
      message.includes('cca-lite.coinbase.com') ||
      message.includes('analytics') ||
      message.includes('telemetry')
    ) {
      return;
    }
    
    originalConsoleError.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    const message = args.join(' ');
    if (
      message.includes('cross-origin') ||
      message.includes('storage quota') ||
      message.includes('IndexedDB')
    ) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
};



// Create wagmi config with minimal setup
const config = createConfig({
  chains: [base],
  connectors: [metaMask()],
  transports: {
    [base.id]: http(),
  },
  ssr: false,
});

// Create QueryClient for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || "demo-key";
  
  useEffect(() => {
    suppressErrors();
  }, []);
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={apiKey}
          chain={base}
          config={{
            appearance: {
              mode: 'auto',
              theme: 'base',
            },
          }}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}