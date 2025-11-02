'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import { 
  User, 
  Settings, 
  Trophy, 
  Star, 
  Award, 
  TrendingUp, 
  Wallet, 
  ExternalLink, 
  Edit, 
  Bell, 
  Shield, 
  Eye, 
  EyeOff, 
  Copy, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Coins, 
  Heart, 
  Users, 
  Calendar, 
  ArrowUpRight,
  RefreshCw,
  Filter
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';

interface UserProfile {
  address: string;
  displayName: string;
  bio: string;
  avatar: string;
  joinDate: string;
  level: string;
  xp: number;
  nextLevelXp: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
}

interface Activity {
  id: string;
  type: 'mint' | 'trade' | 'earn' | 'social' | 'quest';
  title: string;
  description: string;
  timestamp: string;
  value?: string;
  status: 'completed' | 'pending' | 'failed';
}

interface Portfolio {
  totalValue: string;
  nftsOwned: number;
  tokensEarned: string;
  transactionsCount: number;
  favoriteCollections: string[];
}

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'activity' | 'portfolio' | 'settings'>('overview');
  const [showPrivateInfo, setShowPrivateInfo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    address: address || '0x1234567890abcdef1234567890abcdef12345678',
    displayName: 'Diyama Creator',
    bio: 'Building the future of onchain creativity on Base. NFT artist, DeFi enthusiast, and community builder.',
    avatar: '🎨',
    joinDate: '2024-01-15',
    level: 'Diamond',
    xp: 12450,
    nextLevelXp: 15000
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      name: 'First Steps',
      description: 'Connected your first wallet to Diyama',
      icon: '👋',
      earned: true,
      earnedDate: '2024-01-15',
      rarity: 'common',
      xpReward: 100
    },
    {
      id: '2',
      name: 'Creator Genesis',
      description: 'Minted your first NFT on Base',
      icon: '🎨',
      earned: true,
      earnedDate: '2024-01-20',
      rarity: 'rare',
      xpReward: 500
    },
    {
      id: '3',
      name: 'Community Builder',
      description: 'Invited 10 friends to join Diyama',
      icon: '👥',
      earned: true,
      earnedDate: '2024-02-01',
      rarity: 'epic',
      xpReward: 1000
    },
    {
      id: '4',
      name: 'Diamond Hands',
      description: 'Hold NFTs for 30+ days without selling',
      icon: '💎',
      earned: true,
      earnedDate: '2024-02-15',
      rarity: 'legendary',
      xpReward: 2000
    },
    {
      id: '5',
      name: 'Whale Status',
      description: 'Own 100+ NFTs in your collection',
      icon: '🐋',
      earned: false,
      rarity: 'legendary',
      xpReward: 5000
    },
    {
      id: '6',
      name: 'Master Trader',
      description: 'Complete 1000+ successful trades',
      icon: '📈',
      earned: false,
      rarity: 'epic',
      xpReward: 3000
    }
  ]);

  const [recentActivity, setRecentActivity] = useState<Activity[]>([
    {
      id: '1',
      type: 'mint',
      title: 'Minted NFT',
      description: 'Digital Sunset Collection #42',
      timestamp: '2 hours ago',
      value: '0.05 ETH',
      status: 'completed'
    },
    {
      id: '2',
      type: 'earn',
      title: 'Daily Rewards',
      description: 'Claimed daily login bonus',
      timestamp: '1 day ago',
      value: '+150 XP',
      status: 'completed'
    },
    {
      id: '3',
      type: 'social',
      title: 'Community Challenge',
      description: 'Joined Weekly Creator Challenge',
      timestamp: '2 days ago',
      status: 'pending'
    },
    {
      id: '4',
      type: 'trade',
      title: 'NFT Sale',
      description: 'Sold Abstract Dreams #15',
      timestamp: '3 days ago',
      value: '0.8 ETH',
      status: 'completed'
    },
    {
      id: '5',
      type: 'quest',
      title: 'Quest Completed',
      description: 'Base Explorer Quest - Level 1',
      timestamp: '1 week ago',
      value: '+500 XP',
      status: 'completed'
    }
  ]);

  const [portfolio, setPortfolio] = useState<Portfolio>({
    totalValue: '12.45 ETH',
    nftsOwned: 47,
    tokensEarned: '2,450 DIYA',
    transactionsCount: 156,
    favoriteCollections: ['Base Builders', 'Onchain Summer', 'Diyama Genesis']
  });

  const copyAddress = async () => {
    if (userProfile.address) {
      await navigator.clipboard.writeText(userProfile.address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-500/20';
      case 'rare': return 'text-blue-400 border-blue-500/20';
      case 'epic': return 'text-purple-400 border-purple-500/20';
      case 'legendary': return 'text-yellow-400 border-yellow-500/20';
      default: return 'text-gray-400 border-gray-500/20';
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'mint': return <Zap className="text-blue-400" size={16} />;
      case 'trade': return <TrendingUp className="text-green-400" size={16} />;
      case 'earn': return <Coins className="text-yellow-400" size={16} />;
      case 'social': return <Users className="text-purple-400" size={16} />;
      case 'quest': return <Trophy className="text-orange-400" size={16} />;
      default: return <Clock className="text-gray-400" size={16} />;
    }
  };

  const getStatusIcon = (status: Activity['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="text-green-400" size={16} />;
      case 'pending': return <Clock className="text-yellow-400" size={16} />;
      case 'failed': return <ExternalLink className="text-red-400" size={16} />;
      default: return <Clock className="text-gray-400" size={16} />;
    }
  };

  const xpProgress = (userProfile.xp / userProfile.nextLevelXp) * 100;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-500/5 to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row items-start gap-8"
          >
            {/* Profile Avatar & Basic Info */}
            <div className="flex flex-col items-center lg:items-start">
              <motion.div
                className="relative w-32 h-32 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-4xl shadow-2xl shadow-blue-500/25">
                  {userProfile.avatar}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-black flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
              </motion.div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="mb-4"
              >
                <Edit size={16} className="mr-2" />
                Edit Profile
              </Button>
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {userProfile.displayName}
                </h1>
                <p className="text-gray-400 text-lg mb-4 max-w-2xl">
                  {userProfile.bio}
                </p>
                
                {/* Address */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                    <Wallet size={16} className="text-blue-400" />
                    <span className="font-mono text-sm">
                      {userProfile.address.slice(0, 6)}...{userProfile.address.slice(-4)}
                    </span>
                    <button
                      onClick={copyAddress}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      {copiedAddress ? (
                        <CheckCircle2 size={14} className="text-green-400" />
                      ) : (
                        <Copy size={14} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                    <ExternalLink size={16} className="text-gray-400" />
                  </button>
                </div>

                {/* Level & XP Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
                        <span className="text-yellow-400 font-semibold">{userProfile.level}</span>
                      </div>
                      <span className="text-gray-400">Level</span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {userProfile.xp.toLocaleString()} / {userProfile.nextLevelXp.toLocaleString()} XP
                    </span>
                  </div>
                  
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{portfolio.nftsOwned}</div>
                    <div className="text-sm text-gray-400">NFTs Owned</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{portfolio.totalValue}</div>
                    <div className="text-sm text-gray-400">Portfolio Value</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">{achievements.filter(a => a.earned).length}</div>
                    <div className="text-sm text-gray-400">Achievements</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">{portfolio.transactionsCount}</div>
                    <div className="text-sm text-gray-400">Transactions</div>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>
         </div>
       </Section>

      {/* Navigation Tabs */}
      <Section>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'achievements', label: 'Achievements', icon: Trophy },
              { id: 'activity', label: 'Activity', icon: Clock },
              { id: 'portfolio', label: 'Portfolio', icon: Wallet },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-400'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Recent Activity */}
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                      <Button variant="outline" size="sm">
                        <RefreshCw size={16} className="mr-2" />
                        Refresh
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {recentActivity.slice(0, 5).map((activity) => (
                        <motion.div
                          key={activity.id}
                          className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-white">{activity.title}</span>
                              {getStatusIcon(activity.status)}
                            </div>
                            <p className="text-sm text-gray-400">{activity.description}</p>
                          </div>
                          <div className="text-right">
                            {activity.value && (
                              <div className="text-sm font-medium text-green-400 mb-1">
                                {activity.value}
                              </div>
                            )}
                            <div className="text-xs text-gray-500">{activity.timestamp}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Portfolio Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Total Value</span>
                          <span className="font-bold text-green-400">{portfolio.totalValue}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">NFTs Owned</span>
                          <span className="font-bold text-blue-400">{portfolio.nftsOwned}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Tokens Earned</span>
                          <span className="font-bold text-purple-400">{portfolio.tokensEarned}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Transactions</span>
                          <span className="font-bold text-cyan-400">{portfolio.transactionsCount}</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Achievement Progress</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Earned</span>
                          <span className="font-bold text-yellow-400">
                            {achievements.filter(a => a.earned).length} / {achievements.length}
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                            style={{ width: `${(achievements.filter(a => a.earned).length / achievements.length) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Total XP Earned</span>
                          <span className="font-bold text-blue-400">
                            {achievements.filter(a => a.earned).reduce((sum, a) => sum + a.xpReward, 0).toLocaleString()} XP
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="space-y-6">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">Achievements</h3>
                      <div className="text-sm text-gray-400">
                        {achievements.filter(a => a.earned).length} of {achievements.length} earned
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {achievements.map((achievement) => (
                        <motion.div
                          key={achievement.id}
                          className={`p-4 rounded-xl border transition-all ${
                            achievement.earned
                              ? `bg-gradient-to-br from-white/10 to-white/5 ${getRarityColor(achievement.rarity)} shadow-lg`
                              : 'bg-white/5 border-white/10 opacity-60'
                          }`}
                          whileHover={{ scale: achievement.earned ? 1.02 : 1 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`text-2xl ${achievement.earned ? '' : 'grayscale'}`}>
                              {achievement.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-white">{achievement.name}</h4>
                                {achievement.earned && (
                                  <CheckCircle2 size={16} className="text-green-400" />
                                )}
                              </div>
                              <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                              <div className="flex items-center justify-between">
                                <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(achievement.rarity)}`}>
                                  {achievement.rarity.toUpperCase()}
                                </span>
                                <span className="text-xs text-blue-400">+{achievement.xpReward} XP</span>
                              </div>
                              {achievement.earnedDate && (
                                <div className="text-xs text-gray-500 mt-2">
                                  Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-6">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">Activity History</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter size={16} className="mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw size={16} className="mr-2" />
                          Refresh
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {recentActivity.map((activity) => (
                        <motion.div
                          key={activity.id}
                          className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-white">{activity.title}</span>
                              {getStatusIcon(activity.status)}
                            </div>
                            <p className="text-sm text-gray-400">{activity.description}</p>
                            <div className="text-xs text-gray-500 mt-1">{activity.timestamp}</div>
                          </div>
                          <div className="text-right">
                            {activity.value && (
                              <div className="text-sm font-medium text-green-400">
                                {activity.value}
                              </div>
                            )}
                            <Button variant="ghost" size="sm">
                              <ExternalLink size={14} />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {activeTab === 'portfolio' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 text-center">
                      <Wallet className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">{portfolio.totalValue}</div>
                      <div className="text-sm text-gray-400">Total Portfolio Value</div>
                    </Card>
                    <Card className="p-6 text-center">
                      <Star className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">{portfolio.nftsOwned}</div>
                      <div className="text-sm text-gray-400">NFTs Owned</div>
                    </Card>
                    <Card className="p-6 text-center">
                      <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">{portfolio.tokensEarned}</div>
                      <div className="text-sm text-gray-400">Tokens Earned</div>
                    </Card>
                  </div>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Favorite Collections</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {portfolio.favoriteCollections.map((collection, index) => (
                        <motion.div
                          key={collection}
                          className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-xl">
                              {['🏗️', '☀️', '🎨'][index]}
                            </div>
                            <div>
                              <div className="font-medium text-white">{collection}</div>
                              <div className="text-sm text-gray-400">{Math.floor(Math.random() * 20) + 5} items</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Profile Settings</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
                        <input
                          type="text"
                          value={userProfile.displayName}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, displayName: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
                        <textarea
                          value={userProfile.bio}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
                          rows={3}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 resize-none"
                        />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Show Portfolio Value</div>
                          <div className="text-sm text-gray-400">Display your total portfolio value publicly</div>
                        </div>
                        <button
                          onClick={() => setShowPrivateInfo(!showPrivateInfo)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            showPrivateInfo ? 'bg-blue-500' : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            showPrivateInfo ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Activity Visibility</div>
                          <div className="text-sm text-gray-400">Show your recent activity to other users</div>
                        </div>
                        <button className="w-12 h-6 bg-blue-500 rounded-full">
                          <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                        </button>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Achievement Notifications</div>
                          <div className="text-sm text-gray-400">Get notified when you earn new achievements</div>
                        </div>
                        <button className="w-12 h-6 bg-blue-500 rounded-full">
                          <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Trading Alerts</div>
                          <div className="text-sm text-gray-400">Receive alerts for trading opportunities</div>
                        </div>
                        <button className="w-12 h-6 bg-gray-600 rounded-full">
                          <div className="w-5 h-5 bg-white rounded-full translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </Card>

                  <div className="flex gap-4">
                    <Button className="flex-1">
                      Save Changes
                    </Button>
                    <Button variant="outline">
                      Reset to Default
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>
    </div>
  );
}