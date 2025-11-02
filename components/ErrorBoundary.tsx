"use client";
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Filter out known SDK errors that don't affect functionality
    const knownSafeErrors = [
      'IndexedDB',
      'Analytics SDK',
      'Internal error when calculating storage usage',
      'cca-lite.coinbase.com',
      'Failed to fetch',
      'NetworkError'
    ];

    const isSafeError = knownSafeErrors.some(safeError => 
      error.message?.includes(safeError) || error.stack?.includes(safeError)
    );

    if (!isSafeError) {
      console.error('Uncaught error:', error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      // Check if it's a safe error that we can ignore
      const knownSafeErrors = [
        'IndexedDB',
        'Analytics SDK',
        'Internal error when calculating storage usage',
        'cca-lite.coinbase.com',
        'Failed to fetch',
        'NetworkError'
      ];

      const isSafeError = knownSafeErrors.some(safeError => 
        this.state.error?.message?.includes(safeError) || 
        this.state.error?.stack?.includes(safeError)
      );

      if (isSafeError) {
        // For safe errors, just render children normally
        return this.props.children;
      }

      // For actual errors, show fallback UI
      return this.props.fallback || (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100 flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-slate-300 mb-6">
              We're experiencing a temporary issue. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;