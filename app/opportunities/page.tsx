"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAccount } from "wagmi";
import { 
  TrendingUp, 
  Star, 
  Clock, 
  Users, 
  Zap, 
  Filter,
  Search,
  ChevronDown,
  ExternalLink,
  Award,
  Coins,
  Palette,
  Music,
  GamepadIcon,
  Heart
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: 'NFT' | 'DeFi' | 'Gaming' | 'Music' | 'Art' | 'Social' | 'NFT Drop' | 'Creator Rewards' | 'Collecting' | 'Bridge' | 'Music NFT' | 'Free Mint';
  type: 'mint' | 'earn' | 'trade' | 'create' | 'participate';
  reward: {
    amount: string;
    token: string;
    usd?: string;
  };
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Easy' | 'Medium';
  timeLeft: string;
  participants: number;
  maxParticipants?: number;
  trending: boolean;
  featured: boolean;
  network: 'Base' | 'Zora' | 'Ethereum';
  deadline?: string;
  creator: {
    name: string;
    verified: boolean;
    avatar?: string;
  };
  image: string;
  tags: string[];
  requirements: string[];
  steps: string[];
  estimatedTime: string;
  successRate: number;
}

export default function OpportunitiesPage() {
  const { address, isConnected } = useAccount();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [liveStats, setLiveStats] = useState({
    totalOpportunities: 0,
    totalRewards: '$0',
    activeUsers: 0,
    avgResponse: '24h'
  });

  // Fetch real blockchain data from API
  useEffect(() => {
    const fetchBlockchainOpportunities = async () => {
      setLoading(true);
      
      try {
        const response = await fetch('/api/opportunities');
        if (!response.ok) {
          throw new Error('Failed to fetch opportunities');
        }
        
        const data = await response.json();
        setOpportunities(data.opportunities);
        setLiveStats(data.stats);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
        // Fallback to empty state or show error message
        setOpportunities([]);
        setLiveStats({
          totalOpportunities: 0,
          totalRewards: '$0',
          activeUsers: 0,
          avgResponse: '24h'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlockchainOpportunities();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(() => {
      fetchBlockchainOpportunities();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredOpportunities = opportunities.filter(opp => 
    activeFilter === 'All' || opp.category === activeFilter || opp.network === activeFilter
  );

  const categories = ['All', 'Base', 'Zora', 'NFT Drop', 'DeFi', 'Creator Rewards', 'Collecting'];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Hero Section */}
      <section className="container-custom py-mobile text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-mobile mb-mobile">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-mobile-xs sm:text-sm font-medium">LIVE BLOCKCHAIN DATA</span>
          </div>
          <h1 className="text-mobile-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-slate-100 mb-mobile">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Live Opportunities
            </span>
          </h1>
          <p className="text-mobile-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-mobile px-4">
            Real-time opportunities from Base and Zora networks. Mint NFTs, earn rewards, and participate in the onchain economy.
          </p>
          
          {/* Network Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-mobile mb-mobile px-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "primary" : "ghost"}
                size="lg"
                onClick={() => setActiveFilter(category)}
                className={`transition-all touch-target micro-bounce text-mobile-sm sm:text-base ${
                  activeFilter === category 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-slate-700/50'
                }`}
              >
                {category === 'Base' && '🔵'} 
                {category === 'Zora' && '⚡'} 
                {category === 'NFT Drop' && '🎨'} 
                {category === 'DeFi' && '💰'} 
                {category === 'Creator Rewards' && '🏆'} 
                {category === 'Collecting' && '🖼️'} 
                {category === 'All' && '🌐'} 
                {category}
              </Button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Live Stats */}
      <section className="container-custom py-mobile">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-mobile-2 md:grid-cols-4 gap-mobile"
        >
          <Card variant="glass" className="p-mobile text-center border-blue-500/20 touch-card micro-lift">
            <div className="text-mobile-2xl sm:text-3xl font-bold text-blue-400 mb-mobile">{liveStats.totalOpportunities}</div>
            <div className="text-slate-300 text-mobile-xs sm:text-sm">Live Opportunities</div>
            <div className="text-green-400 text-mobile-xs mt-1">🔴 LIVE</div>
          </Card>
          <Card variant="glass" className="p-mobile text-center border-green-500/20 touch-card micro-lift">
            <div className="text-mobile-2xl sm:text-3xl font-bold text-green-400 mb-mobile">{liveStats.totalRewards}</div>
            <div className="text-slate-300 text-mobile-xs sm:text-sm">Total Rewards</div>
            <div className="text-green-400 text-mobile-xs mt-1">💰 Available</div>
          </Card>
          <Card variant="glass" className="p-mobile text-center border-purple-500/20 touch-card micro-lift">
            <div className="text-mobile-2xl sm:text-3xl font-bold text-purple-400 mb-mobile">{liveStats.activeUsers.toLocaleString()}</div>
            <div className="text-slate-300 text-mobile-xs sm:text-sm">Active Participants</div>
            <div className="text-purple-400 text-mobile-xs mt-1">👥 Online</div>
          </Card>
          <Card variant="glass" className="p-mobile text-center border-orange-500/20 touch-card micro-lift">
            <div className="text-mobile-2xl sm:text-3xl font-bold text-orange-400 mb-mobile">{liveStats.avgResponse}</div>
            <div className="text-slate-300 text-mobile-xs sm:text-sm">Avg Response</div>
            <div className="text-orange-400 text-mobile-xs mt-1">⚡ Fast</div>
          </Card>
        </motion.div>
      </section>

      <Section title="Featured Opportunities" description="Hand-picked opportunities for creators at every level">
        <div className="grid grid-mobile-1 md:grid-cols-2 lg:grid-cols-3 gap-mobile">
          {filteredOpportunities.map((opp, index) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="p-mobile hover:border-cyan-400/50 transition-colors touch-card micro-bounce h-full">
                <div className="flex items-start justify-between mb-mobile">
                  <span className={`px-mobile py-1 rounded-full text-mobile-xs font-medium ${
                    opp.category === 'NFT Drop' ? 'bg-green-500/20 text-green-400' :
                    opp.category === 'Creator Rewards' ? 'bg-blue-500/20 text-blue-400' :
                    opp.category === 'DeFi' ? 'bg-purple-500/20 text-purple-400' :
                    opp.category === 'Collecting' ? 'bg-pink-500/20 text-pink-400' :
                    opp.category === 'Bridge' ? 'bg-orange-500/20 text-orange-400' :
                    opp.category === 'Music NFT' ? 'bg-indigo-500/20 text-indigo-400' :
                    opp.category === 'Social' ? 'bg-yellow-500/20 text-yellow-400' :
                    opp.category === 'Free Mint' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-cyan-500/20 text-cyan-400'
                  }`}>
                    {opp.category}
                  </span>
                  <span className={`text-mobile-xs px-mobile py-1 rounded ${
                    opp.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    opp.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {opp.difficulty}
                  </span>
                </div>
                
                <h3 className="text-slate-100 font-semibold text-mobile-lg sm:text-xl mb-mobile">{opp.title}</h3>
                <p className="text-slate-300 text-mobile-sm mb-mobile">{opp.description}</p>
                
                <div className="space-y-mobile mb-mobile">
                  <div className="flex justify-between text-mobile-sm">
                    <span className="text-slate-400">Reward:</span>
                    <span className="text-cyan-400 font-medium">
                      {opp.reward.amount} {opp.reward.token}
                      {opp.reward.usd && <span className="text-slate-400 ml-1">(${opp.reward.usd})</span>}
                    </span>
                  </div>
                  <div className="flex justify-between text-mobile-sm">
                    <span className="text-slate-400">Deadline:</span>
                    <span className="text-slate-300">{opp.deadline}</span>
                  </div>
                  {opp.participants && (
                    <div className="flex justify-between text-mobile-sm">
                      <span className="text-slate-400">Participants:</span>
                      <span className="text-green-400">{opp.participants.toLocaleString()}</span>
                    </div>
                  )}
                  {opp.timeLeft && (
                    <div className="flex justify-between text-mobile-sm">
                      <span className="text-slate-400">Time Left:</span>
                      <span className="text-orange-400">{opp.timeLeft}</span>
                    </div>
                  )}
                </div>
                
                <Button variant="ghost" size="sm" className="w-full touch-target micro-bounce text-mobile-sm">
                  Apply Now →
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <section className="container-custom py-mobile text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card variant="glow" className="p-mobile bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-400/30 touch-card">
            <h2 className="text-mobile-2xl sm:text-3xl font-bold text-slate-100 mb-mobile">
              {isConnected ? 'Start Participating!' : 'Ready to Join the Onchain Economy?'}
            </h2>
            <p className="text-slate-300 mb-mobile max-w-2xl mx-auto text-mobile-base px-4">
              {isConnected 
                ? `Welcome ${address?.slice(0, 6)}...${address?.slice(-4)}! You can now participate in all live opportunities.`
                : 'Connect your wallet to access Base and Zora opportunities. Start earning rewards in the decentralized economy.'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-mobile px-4">
              {isConnected ? (
                <>
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-600 touch-target micro-bounce text-mobile-base w-full sm:w-auto">
                    🚀 Start Earning
                  </Button>
                  <Link href="/leaderboard" prefetch={false}>
                    <Button variant="secondary" size="lg" className="touch-target micro-bounce text-mobile-base w-full sm:w-auto">View Leaderboard</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/wallet" prefetch={false}>
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 touch-target micro-bounce text-mobile-base w-full sm:w-auto">
                      Connect Wallet
                    </Button>
                  </Link>
                  <Link href="/learn" prefetch={false}>
                    <Button variant="secondary" size="lg" className="touch-target micro-bounce text-mobile-base w-full sm:w-auto">Learn About Web3</Button>
                  </Link>
                </>
              )}
            </div>
            
            {/* Network Info */}
            <div className="mt-mobile flex flex-col sm:flex-row justify-center gap-mobile sm:gap-8">
              <div className="text-center">
                <div className="text-blue-400 font-bold text-mobile-base">🔵 Base</div>
                <div className="text-slate-400 text-mobile-sm">Low fees, fast transactions</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-bold text-mobile-base">⚡ Zora</div>
                <div className="text-slate-400 text-mobile-sm">Creator-focused protocol</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>
    </main>
  );
}