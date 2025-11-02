'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRightLeft, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  MessageCircle, 
  ExternalLink,
  AlertCircle,
  Banknote,
  Shield,
  Zap,
  RefreshCw,
  User,
  MapPin,
  Calendar
} from 'lucide-react';
import { useAccount } from 'wagmi';
import { WalletDisplay } from '../../components/WalletDisplay';

interface ExchangeRequest {
  id: string;
  amountUSDC: number;
  kwachaAmount: number;
  rate: number;
  fullName: string;
  phoneNumber: string;
  preferredContact: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export default function WalletPage() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'exchange' | 'requests'>('exchange');
  const [exchangeRequests, setExchangeRequests] = useState<ExchangeRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form state
  const [amountUSDC, setAmountUSDC] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredContact, setPreferredContact] = useState('whatsapp');
  const [currentRate, setCurrentRate] = useState(27.5); // Mock rate

  // Load exchange requests
  useEffect(() => {
    if (isConnected && address) {
      loadExchangeRequests();
    }
  }, [isConnected, address]);

  const loadExchangeRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/exchange/requests?address=${address}`);
      if (response.ok) {
        const data = await response.json();
        setExchangeRequests(data.requests || []);
      }
    } catch (err) {
      console.error('Failed to load exchange requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitExchangeRequest = async () => {
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    const amount = parseFloat(amountUSDC);
    if (!amount || amount <= 0) {
      setError('Please enter a valid USDC amount');
      return;
    }

    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/exchange/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountUSDC: amount,
          baseAddress: address,
          fullName: fullName.trim(),
          phoneNumber: phoneNumber.trim(),
          preferredContact
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setSuccess('Exchange request submitted successfully! Our team will contact you within 24 hours.');
      setAmountUSDC('');
      setFullName('');
      setPhoneNumber('');
      setActiveTab('requests');
      loadExchangeRequests();
    } catch (err: any) {
      setError(err.message || 'Failed to submit exchange request');
    } finally {
      setSubmitting(false);
    }
  };

  const markAsCompleted = async (requestId: string) => {
    try {
      const response = await fetch('/api/exchange/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, address })
      });

      if (response.ok) {
        loadExchangeRequests();
        setSuccess('Request marked as completed!');
      }
    } catch (err) {
      setError('Failed to update request status');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-400" size={16} />;
      case 'in_progress':
        return <RefreshCw className="text-blue-400 animate-spin" size={16} />;
      case 'completed':
        return <CheckCircle2 className="text-green-400" size={16} />;
      case 'cancelled':
        return <XCircle className="text-red-400" size={16} />;
      default:
        return <Clock className="text-gray-400" size={16} />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1";
    switch (status) {
      case 'pending':
        return `${baseClasses} status-pending`;
      case 'in_progress':
        return `${baseClasses} status-in-progress`;
      case 'completed':
        return `${baseClasses} status-completed`;
      case 'cancelled':
        return `${baseClasses} status-cancelled`;
      default:
        return `${baseClasses} bg-gray-500/20 text-gray-400`;
    }
  };

  const calculateKwacha = () => {
    const amount = parseFloat(amountUSDC);
    return amount ? (amount * currentRate).toFixed(2) : '0.00';
  };

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-black text-white pb-24">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full flex items-center justify-center border border-blue-500/30">
              <ArrowRightLeft className="text-blue-400" size={48} />
            </div>
            <h1 className="text-4xl font-bold mb-4 gradient-text-primary">
              Wallet & Exchange
            </h1>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Connect your wallet to access P2P USDC to Kwacha exchange and manage your Base assets
            </p>
            <WalletDisplay variant="minimal" className="max-w-sm mx-auto" />
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pb-24">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 gradient-text-primary">
            Wallet & Exchange
          </h1>
          <p className="text-gray-400">
            Manage your Base wallet and exchange USDC to Zambian Kwacha
          </p>
        </motion.div>

        {/* Wallet Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <WalletDisplay />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex bg-white/5 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('exchange')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === 'exchange'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ArrowRightLeft className="inline mr-2" size={16} />
              New Exchange
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === 'requests'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Clock className="inline mr-2" size={16} />
              My Requests ({exchangeRequests.length})
            </button>
          </div>
        </motion.div>

        {/* Alerts */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
            >
              <AlertCircle className="text-red-400" size={20} />
              <span className="text-red-400">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                ×
              </button>
            </motion.div>
          )}
          
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3"
            >
              <CheckCircle2 className="text-green-400" size={20} />
              <span className="text-green-400">{success}</span>
              <button
                onClick={() => setSuccess(null)}
                className="ml-auto text-green-400 hover:text-green-300"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'exchange' ? (
            <motion.div
              key="exchange"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Exchange Form */}
              <div className="card-diyama p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                    <ArrowRightLeft className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">USDC → Kwacha Exchange</h3>
                    <p className="text-sm text-gray-400">P2P exchange with competitive rates</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Amount Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Amount (USDC)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={amountUSDC}
                        onChange={(e) => setAmountUSDC(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="Enter USDC amount"
                      />
                      <div className="absolute right-3 top-3 text-gray-400 text-sm">USDC</div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="+260 XXX XXX XXX"
                      />
                    </div>
                  </div>

                  {/* Preferred Contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Contact Method
                    </label>
                    <select
                      value={preferredContact}
                      onChange={(e) => setPreferredContact(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    >
                      <option value="whatsapp">WhatsApp</option>
                      <option value="sms">SMS</option>
                      <option value="call">Phone Call</option>
                      <option value="telegram">Telegram</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    onClick={submitExchangeRequest}
                    disabled={submitting || !amountUSDC || !fullName || !phoneNumber}
                    className="btn-diyama-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="inline mr-2 animate-spin" size={16} />
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        <ArrowRightLeft className="inline mr-2" size={16} />
                        Submit Exchange Request
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Exchange Info */}
              <div className="space-y-6">
                {/* Rate Display */}
                <div className="card-diyama p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold">Current Exchange Rate</h4>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">1 USDC =</span>
                      <span className="font-bold">{currentRate.toFixed(2)} ZMW</span>
                    </div>
                    {amountUSDC && (
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-400">You'll receive:</span>
                        <span className="font-bold text-green-400">{calculateKwacha()} ZMW</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* How It Works */}
                <div className="card-diyama p-6">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Shield size={20} />
                    How P2P Exchange Works
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                      <span className="text-gray-300">Submit your exchange request with contact details</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                      <span className="text-gray-300">Our admin receives email notification and contacts you</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                      <span className="text-gray-300">Arrange P2P exchange via phone/WhatsApp</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                      <span className="text-gray-300">Complete exchange offline and mark as completed</span>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-yellow-400 mt-0.5" size={16} />
                    <div className="text-sm">
                      <p className="text-yellow-400 font-medium mb-1">Security Notice</p>
                      <p className="text-gray-300">
                        Always verify the identity of our team members. We'll never ask for your private keys or seed phrases.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="requests"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="card-diyama p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">My Exchange Requests</h3>
                  <motion.button
                    onClick={loadExchangeRequests}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw className={loading ? 'animate-spin' : ''} size={16} />
                  </motion.button>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="animate-spin mx-auto mb-4" size={32} />
                    <p className="text-gray-400">Loading your requests...</p>
                  </div>
                ) : exchangeRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <ArrowRightLeft className="mx-auto mb-4 text-gray-600" size={48} />
                    <h4 className="text-lg font-medium mb-2">No Exchange Requests</h4>
                    <p className="text-gray-400 mb-6">You haven't submitted any exchange requests yet.</p>
                    <button
                      onClick={() => setActiveTab('exchange')}
                      className="btn-diyama-primary"
                    >
                      Create First Request
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {exchangeRequests.map((request) => (
                      <motion.div
                        key={request.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-white/5 rounded-xl border border-white/10"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                              <Banknote className="text-white" size={20} />
                            </div>
                            <div>
                              <div className="font-bold text-lg">
                                {request.amountUSDC} USDC → {request.kwachaAmount.toFixed(2)} ZMW
                              </div>
                              <div className="text-sm text-gray-400">
                                Rate: 1 USDC = {request.rate.toFixed(2)} ZMW
                              </div>
                            </div>
                          </div>
                          <div className={getStatusBadge(request.status)}>
                            {getStatusIcon(request.status)}
                            {request.status.replace('_', ' ').toUpperCase()}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <User size={14} className="text-gray-400" />
                            <span className="text-gray-300">{request.fullName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone size={14} className="text-gray-400" />
                            <span className="text-gray-300">{request.phoneNumber}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar size={14} className="text-gray-400" />
                            <span className="text-gray-300">
                              {new Date(request.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {request.status === 'in_progress' && (
                          <div className="flex gap-3">
                            <motion.button
                              onClick={() => markAsCompleted(request.id)}
                              className="btn-diyama-primary flex-1"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <CheckCircle2 className="inline mr-2" size={16} />
                              Mark as Completed
                            </motion.button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}