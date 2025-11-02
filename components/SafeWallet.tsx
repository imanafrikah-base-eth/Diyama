"use client";
import React, { Component, ReactNode, useEffect, useState } from "react";
import { Wallet, ConnectWallet, WalletDropdown, WalletDropdownDisconnect } from "@coinbase/onchainkit/wallet";
import { Identity, Avatar, Name, Address, EthBalance } from "@coinbase/onchainkit/identity";

// Immediate Base Account SDK blocking
if (typeof window !== 'undefined') {
  (window as any).__DISABLE_BASE_ACCOUNT__ = true;
  (window as any).__DISABLE_ANALYTICS__ = true;
  
  // Mock Base Account SDK functions globally
  (window as any).createBaseAccountSDK = () => null;
  (window as any).checkCrossOriginOpenerPolicy = () => Promise.resolve(true);
}

interface SafeWalletProps {
  children?: ReactNode;
  className?: string;
  fallback?: ReactNode;
}

interface SafeWalletState {
  hasError: boolean;
  isClient: boolean;
}

// Error boundary specifically for wallet components
class WalletErrorBoundary extends Component<SafeWalletProps, SafeWalletState> {
  constructor(props: SafeWalletProps) {
    super(props);
    this.state = { hasError: false, isClient: false };
  }

  static getDerivedStateFromError(): SafeWalletState {
    return { hasError: true, isClient: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Only log non-SDK errors
    const isSafeError = [
      'Base Account',
      'IndexedDB',
      'Analytics SDK',
      'checkCrossOriginOpenerPolicy',
      'createBaseAccountSDK',
      'Failed to fetch',
      'NetworkError'
    ].some(safeError => 
      error.message?.includes(safeError) || error.stack?.includes(safeError)
    );

    if (!isSafeError) {
      console.warn('Wallet component error (non-critical):', error.message);
    }
  }

  componentDidMount() {
    this.setState({ isClient: true });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="px-4 py-2 bg-slate-800 rounded-lg text-slate-300 text-sm">
          Wallet Unavailable
        </div>
      );
    }

    if (!this.state.isClient) {
      return (
        <div className="px-4 py-2 bg-slate-800 rounded-lg text-slate-300 text-sm animate-pulse">
          Loading...
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}

// Safe wrapper for ConnectWallet
export function SafeConnectWallet({ className, children, fallback }: SafeWalletProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`px-4 py-2 bg-slate-800 rounded-lg text-slate-300 text-sm animate-pulse ${className || ''}`}>
        Loading...
      </div>
    );
  }

  return (
    <WalletErrorBoundary fallback={fallback}>
      <Wallet>
        <ConnectWallet className={className}>
          {children || "Connect Wallet"}
        </ConnectWallet>
      </Wallet>
    </WalletErrorBoundary>
  );
}

// Safe wrapper for full Wallet with dropdown
export function SafeWallet({ className, fallback }: SafeWalletProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`px-4 py-2 bg-slate-800 rounded-lg text-slate-300 text-sm animate-pulse ${className || ''}`}>
        Loading...
      </div>
    );
  }

  return (
    <WalletErrorBoundary fallback={fallback}>
      <Wallet>
        <ConnectWallet className={className}>
          Connect Wallet
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 py-2">
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </WalletErrorBoundary>
  );
}

// Safe wrapper for Identity components
export function SafeIdentity({ className, fallback }: SafeWalletProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`px-4 py-2 bg-slate-800 rounded-lg text-slate-300 text-sm animate-pulse ${className || ''}`}>
        Loading...
      </div>
    );
  }

  return (
    <WalletErrorBoundary fallback={fallback}>
      <Identity className={className}>
        <Avatar />
        <Name />
        <Address />
        <EthBalance />
      </Identity>
    </WalletErrorBoundary>
  );
}

// Safe wrapper for standalone Wallet display
export function SafeWalletDisplay({ className, fallback }: SafeWalletProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`px-4 py-2 bg-slate-800 rounded-lg text-slate-300 text-sm animate-pulse ${className || ''}`}>
        Loading...
      </div>
    );
  }

  return (
    <WalletErrorBoundary fallback={fallback}>
      <Wallet>
        <SafeIdentity className={className} fallback={fallback} />
      </Wallet>
    </WalletErrorBoundary>
  );
}

export default SafeWallet;