"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function LeaderboardPage() {
  const { address } = useAccount();
  const [activeCategory, setActiveCategory] = useState("Overall");
  const leaderboardData = [
    { rank: 1, name: "CryptoArtist", avatar: "🎨", points: 15420, badge: "🏆", change: "+12", address: "0x1234...5678" },
    { rank: 2, name: "BaseBuilder", avatar: "🔨", points: 14890, badge: "🥈", change: "+8", address: "0x2345...6789" },
    { rank: 3, name: "NFTCreator", avatar: "🖼️", points: 14235, badge: "🥉", change: "+15", address: "0x3456...7890" },
    { rank: 4, name: "DeFiMaster", avatar: "💎", points: 13780, badge: "", change: "-2", address: "0x4567...8901" },
    { rank: 5, name: "MetaBuilder", avatar: "🚀", points: 13456, badge: "", change: "+5", address: "0x5678...9012" },
    { rank: 6, name: "ChainArtist", avatar: "⛓️", points: 12890, badge: "", change: "+3", address: "0x6789...0123" },
    { rank: 7, name: "TokenMaker", avatar: "🪙", points: 12445, badge: "", change: "-1", address: "0x7890...1234" },
    { rank: 8, name: "SmartDev", avatar: "💻", points: 11998, badge: "", change: "+7", address: "0x8901...2345" },
    { rank: 9, name: "CommunityLead", avatar: "👥", points: 11567, badge: "", change: "+4", address: "0x9012...3456" },
    { rank: 10, name: "InnovatorX", avatar: "⚡", points: 11234, badge: "", change: "+2", address: "0x0123...4567" }
  ];

  // User's current position (simulated)
  const userPosition = {
    rank: 47,
    name: "You",
    avatar: "👤",
    points: 2850,
    badge: "",
    change: "+18",
    address: address
  };

  const leaderboardStats = [
    { label: "Total Participants", value: "2,500+" },
    { label: "Points Distributed", value: "1.2M+" },
    { label: "Active This Week", value: "850+" },
    { label: "Top Creator Points", value: "15.4K" }
  ];

  const categories = [
    { name: "Overall", icon: "🏆" },
    { name: "Weekly", icon: "📅" },
    { name: "Monthly", icon: "📊" },
    { name: "Creators", icon: "🎨" },
    { name: "Builders", icon: "🔨" }
  ];

  const pointActivities = [
    { action: "Connect Wallet", points: 100, icon: "🔗", completed: !!address },
    { action: "Complete Profile", points: 200, icon: "👤", completed: false },
    { action: "First Exchange", points: 500, icon: "💱", completed: false },
    { action: "Join Community", points: 150, icon: "👥", completed: false },
    { action: "Create First NFT", points: 1000, icon: "🎨", completed: false },
    { action: "Refer a Friend", points: 300, icon: "🤝", completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Hero Section */}
      <Section title="Diyama Points Leaderboard" description="Compete with fellow creators and earn points through onchain activities" className="pt-24">
        
        {/* User Position Card */}
        {address && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card variant="glow" className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{userPosition.avatar}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Your Position</h3>
                    <p className="text-slate-400">Rank #{userPosition.rank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-400">{userPosition.points.toLocaleString()}</div>
                  <div className="text-slate-400">Diyama Points</div>
                  <div className="text-green-400 text-sm font-medium">{userPosition.change} this week</div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {leaderboardStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{stat.value}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={activeCategory === category.name ? "primary" : "secondary"}
                  onClick={() => setActiveCategory(category.name)}
                  className="flex items-center space-x-2"
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>

            {/* Leaderboard */}
            <Card className="overflow-hidden">
              <div className="p-6 border-b border-slate-700/50">
                <h2 className="text-2xl font-bold text-white">Top Creators</h2>
              </div>
              <div className="divide-y divide-slate-700/50">
                {leaderboardData.map((user, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 hover:bg-slate-700/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                          index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black' :
                          index === 1 ? 'bg-gradient-to-r from-slate-300 to-slate-500 text-black' :
                          index === 2 ? 'bg-gradient-to-r from-amber-500 to-amber-700 text-white' :
                          'bg-slate-700 text-slate-300'
                        }`}>
                          {user.rank}
                        </div>
                        <div className="text-3xl">{user.avatar}</div>
                        <div>
                          <div className="font-semibold text-white text-lg">{user.name}</div>
                          <div className="text-sm text-slate-400">{user.badge}</div>
                          <div className="text-xs text-slate-500 font-mono">{user.address?.slice(0, 6)}...{user.address?.slice(-4)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-400 text-xl">{user.points.toLocaleString()}</div>
                        <div className="text-sm text-green-400">{user.change}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Point Activities */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Earn Points</h3>
              <div className="space-y-3">
                {pointActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      activity.completed 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-slate-800/50 border-slate-700/50 hover:border-blue-500/50'
                    } transition-colors cursor-pointer`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{activity.icon}</span>
                      <span className={`font-medium ${activity.completed ? 'text-green-400' : 'text-white'}`}>
                        {activity.action}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-400 font-bold">+{activity.points}</span>
                      {activity.completed && <span className="text-green-400">✓</span>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* How Points Work */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">How Points Work</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Complete Activities</h4>
                    <p className="text-slate-400 text-sm">Connect wallet, complete profile, make exchanges</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400">🤝</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Community Engagement</h4>
                    <p className="text-slate-400 text-sm">Join discussions, help others, share knowledge</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-400">🎨</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Create & Build</h4>
                    <p className="text-slate-400 text-sm">Mint NFTs, create content, contribute to ecosystem</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Weekly Challenges */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Weekly Challenges</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🔥</span>
                    <span className="text-white font-medium">Exchange Streak</span>
                  </div>
                  <span className="text-orange-400 font-bold">+1000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">👥</span>
                    <span className="text-white font-medium">Invite 3 Friends</span>
                  </div>
                  <span className="text-blue-400 font-bold">+750</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🎯</span>
                    <span className="text-white font-medium">Complete Profile</span>
                  </div>
                  <span className="text-green-400 font-bold">+500</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}