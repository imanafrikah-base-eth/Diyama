'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  ExternalLink, 
  Copy, 
  ChevronDown, 
  ChevronUp,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Settings,
  Shield,
  Zap
} from 'lucide-react';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { SafeIdentity, SafeConnectWallet } from './SafeWallet';

interface WalletDisplayProps {
  className?: string;
  variant?: 'full' | 'compact' | 'minimal';
  showActions?: boolean;
  expandable?: boolean;
}

export function WalletDisplay({ 
  className = '', 
  variant = 'full',
  showActions = true,
  expandable = true
}: WalletDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: string) => {
    const num = parseFloat(bal);
    if (num === 0) return '0.00';
    if (num < 0.001) return '< 0.001';
    return num.toFixed(4);
  };

  if (!isConnected) {
    return (
      <div className={`card-diyama p-6 text-center ${className}`}>
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full flex items-center justify-center border border-blue-500/30">
          <Wallet className="text-blue-400" size={32} />
        </div>
        <h3 className="text-xl font-bold mb-3">Connect Your Wallet</h3>
        <p className="text-gray-400 mb-6">
          Connect your wallet to view your Base assets and start using Diyama
        </p>
        <SafeConnectWallet className="btn-diyama-primary w-full" />
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <SafeIdentity 
          className="flex items-center gap-2"
          fallback={
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
              <span className="text-sm text-gray-400">Loading...</span>
            </div>
          }
        />
        {showBalance && balance && (
          <div className="text-sm font-medium">
            {showBalance ? `${formatBalance(balance.formatted)} ${balance.symbol}` : '••••'}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`card-diyama p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <SafeIdentity 
            className="flex items-center gap-3"
            fallback={
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse" />
                <div className="space-y-1">
                  <div className="h-4 bg-gray-700 rounded w-24 animate-pulse" />
                  <div className="h-3 bg-gray-800 rounded w-16 animate-pulse" />
                </div>
              </div>
            }
          />
          <div className="text-right">
            {balance && (
              <div className="font-bold text-lg">
                {showBalance ? `${formatBalance(balance.formatted)}` : '••••'}
              </div>
            )}
            <div className="text-xs text-gray-400">ETH</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card-diyama overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
              <Wallet className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Your Base Wallet</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield size={14} />
                <span>Secured by Base Network</span>
              </div>
            </div>
          </div>
          {expandable && (
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </motion.button>
          )}
        </div>

        {/* Identity Display */}
        <SafeIdentity 
          className="mb-4"
          fallback={
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-700 rounded w-32 animate-pulse" />
                <div className="h-4 bg-gray-800 rounded w-24 animate-pulse" />
              </div>
            </div>
          }
        />

        {/* Balance Display */}
        {balance && (
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-xl border border-blue-500/20">
            <div>
              <div className="text-sm text-gray-400 mb-1">Total Balance</div>
              <div className="text-2xl font-bold flex items-center gap-2">
                {showBalance ? `${formatBalance(balance.formatted)} ${balance.symbol}` : '••••••••'}
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">≈ $0.00</div>
              <div className="text-xs text-green-400">+0.00%</div>
            </div>
          </div>
        )}

        {/* Address Display */}
        {address && (
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg mt-4">
            <div className="flex items-center gap-2 font-mono text-sm">
              <span>{formatAddress(address)}</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={copyAddress}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-400 text-xs"
                  >
                    ✓
                  </motion.div>
                ) : (
                  <Copy size={14} />
                )}
              </motion.button>
              <a
                href={`https://basescan.org/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-white/10 rounded transition-colors"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {showActions && (
        <div className="p-6 border-b border-white/10">
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              className="btn-diyama-glass flex items-center justify-center gap-2 py-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowUpRight size={16} />
              Send
            </motion.button>
            <motion.button
              className="btn-diyama-glass flex items-center justify-center gap-2 py-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowDownLeft size={16} />
              Receive
            </motion.button>
          </div>
        </div>
      )}

      {/* Expandable Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {/* Network Info */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Zap className="text-white" size={16} />
                  </div>
                  <div>
                    <div className="font-medium">Base Network</div>
                    <div className="text-xs text-gray-400">Layer 2 • Low Fees</div>
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>

              {/* Recent Activity */}
              <div>
                <h4 className="font-medium mb-3">Recent Activity</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <ArrowDownLeft className="text-green-400" size={14} />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Received ETH</div>
                        <div className="text-xs text-gray-400">2 hours ago</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-400">+0.001 ETH</div>
                      <div className="text-xs text-gray-400">$2.50</div>
                    </div>
                  </div>
                  
                  <div className="text-center py-4">
                    <a
                      href={`https://basescan.org/address/${address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                    >
                      View all transactions <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <motion.button
                  onClick={() => disconnect()}
                  className="flex-1 btn-diyama-glass text-red-400 hover:text-red-300 py-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Disconnect
                </motion.button>
                <motion.button
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings size={16} />
                </motion.button>
                <motion.button
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}