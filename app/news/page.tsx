"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount } from "wagmi";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Link from "next/link";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  source: string;
  metrics: {
    views: number;
    likes: number;
    shares: number;
  };
  tags: string[];
  priority: 'high' | 'medium' | 'low' | 'breaking';
  blockchain: 'Base' | 'Zora' | 'Ethereum' | 'General';
  isLive: boolean;
  imageUrl?: string;
  url?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30
    }
  }
};

const cardHoverVariants = {
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25
    }
  }
};

export default function NewsPage() {
  const { isConnected } = useAccount();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "trending">("latest");
  const [liveUpdates, setLiveUpdates] = useState<boolean>(true);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalViews: 0,
    totalLikes: 0,
    avgReadTime: '3.5 min'
  });

  const categories = ["all", "Network Growth", "Protocol Update", "DeFi", "Events", "Social", "Partnerships", "Infrastructure", "Wallet"];

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.metrics.views - a.metrics.views;
      case "trending":
        return (b.metrics.likes + b.metrics.shares) - (a.metrics.likes + a.metrics.shares);
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  // Fetch news data from API
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeCategory !== 'all') {
          params.append('category', activeCategory);
        }
        
        const response = await fetch(`/api/news?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        setNewsArticles(data.articles);
        setStats(data.stats);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    
    if (liveUpdates) {
      const interval = setInterval(() => {
        fetchNews();
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [liveUpdates, activeCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "breaking": return "text-red-400 bg-red-500/20 border-red-400/50 shadow-red-500/20";
      case "high": return "text-orange-400 bg-orange-500/20 border-orange-400/50 shadow-orange-500/20";
      case "medium": return "text-yellow-400 bg-yellow-500/20 border-yellow-400/50 shadow-yellow-500/20";
      default: return "text-blue-400 bg-blue-500/20 border-blue-400/50 shadow-blue-500/20";
    }
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "onchain": return "⛓️";
      case "official": return "✅";
      default: return "👥";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Network Growth": return "📈";
      case "Protocol Update": return "🔄";
      case "DeFi": return "💰";
      case "Events": return "🎉";
      case "Social": return "👥";
      case "Partnerships": return "🤝";
      case "Infrastructure": return "🏗️";
      case "Wallet": return "👛";
      default: return "📰";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Live Indicator */}
              <motion.div
                className="flex items-center justify-center gap-3 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <motion.div 
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-green-400 text-sm font-medium tracking-wide">LIVE BLOCKCHAIN NEWS</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1 
                className="text-mobile-4xl font-bold heading-font mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="gradient-text-primary">Real-Time</span>{" "}
                <span className="text-white">Blockchain News</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                className="text-mobile-lg text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Stay ahead with verified blockchain developments, protocol updates, and market insights from trusted sources across the ecosystem.
              </motion.p>
              
              {/* Live Updates Toggle */}
              <motion.div 
                className="flex items-center justify-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="text-gray-300 text-sm font-medium">Live Updates</span>
                <motion.button
                  onClick={() => setLiveUpdates(!liveUpdates)}
                  className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                    liveUpdates 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-400 shadow-lg shadow-green-500/25' 
                      : 'bg-gray-600'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg"
                    animate={{ x: liveUpdates ? 28 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Live Stats */}
        <section className="section-padding border-b border-gray-800/50">
          <div className="container-custom">
            <motion.div
              className="grid-responsive"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { label: "Live Monitoring", value: "24/7", icon: "🔄", color: "from-cyan-500 to-blue-400" },
                { label: "Verified Sources", value: "50+", icon: "✅", color: "from-green-500 to-emerald-400" },
                { label: "Daily Readers", value: "100K+", icon: "👥", color: "from-purple-500 to-pink-400" },
                { label: "Avg Update Time", value: "5min", icon: "⚡", color: "from-orange-500 to-red-400" }
              ].map((stat, index) => (
                <motion.div key={stat.label} variants={itemVariants}>
                  <Card
                    variant="glass"
                    hover={true}
                    padding="lg"
                    rounded="xl"
                    className="text-center group cursor-pointer"
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <motion.input
                    type="text"
                    placeholder="Search news, protocols, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 pl-14 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                    🔍
                  </div>
                  {searchQuery && (
                    <motion.button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ✕
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50"
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-2">{getCategoryIcon(category)}</span>
                    {category === "all" ? "All News" : category}
                  </motion.button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex justify-center gap-4">
                {[
                  { key: "latest", label: "Latest", icon: "🕒" },
                  { key: "popular", label: "Popular", icon: "🔥" },
                  { key: "trending", label: "Trending", icon: "📈" }
                ].map((sort) => (
                  <motion.button
                    key={sort.key}
                    onClick={() => setSortBy(sort.key as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      sortBy === sort.key
                        ? "bg-blue-500/20 text-blue-400 border border-blue-400/50 shadow-lg shadow-blue-500/10"
                        : "bg-gray-800/30 text-gray-400 hover:bg-gray-700/30 hover:text-gray-300"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-2">{sort.icon}</span>
                    {sort.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* News Feed */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-mobile-3xl font-bold heading-font gradient-text-neon mb-4">
                Live News Feed
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Real-time updates from verified blockchain sources across the ecosystem
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  className="flex justify-center items-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-gray-400">Loading latest news...</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {sortedArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      variants={itemVariants}
                      custom={index}
                    >
                      <motion.div
                        variants={cardHoverVariants}
                        whileHover="hover"
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          variant={article.priority === "breaking" ? "glow" : "glass"}
                          hover={true}
                          interactive={true}
                          padding="lg"
                          rounded="xl"
                          className={`cursor-pointer transition-all duration-300 ${
                            article.priority === "breaking" 
                              ? "border-red-400/50 bg-red-900/10 shadow-red-500/20" 
                              : "hover:border-blue-400/50"
                          }`}
                        >
                          {/* Header */}
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                            <div className="flex flex-wrap items-center gap-3">
                              <motion.span 
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium border shadow-lg ${getPriorityColor(article.priority)}`}
                                whileHover={{ scale: 1.05 }}
                              >
                                {article.priority === "breaking" ? "🚨 BREAKING" : `${getCategoryIcon(article.category)} ${article.category}`}
                              </motion.span>
                              {article.isLive && (
                                <motion.span 
                                  className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/30"
                                  animate={{ opacity: [1, 0.7, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                                  LIVE
                                </motion.span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                {getSourceIcon(article.source)} {article.source}
                              </span>
                              <span>•</span>
                              <span>{formatDate(article.date)}</span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold heading-font text-white mb-3 leading-tight group-hover:text-blue-300 transition-colors duration-300">
                              {article.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                              {article.summary}
                            </p>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {article.tags.map((tag) => (
                              <motion.span
                                key={tag}
                                className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-xs hover:bg-gray-600/50 transition-colors cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                #{tag}
                              </motion.span>
                            ))}
                          </div>

                          {/* Footer */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-700/50">
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                👁️ {article.metrics.views.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1">
                                ❤️ {article.metrics.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                📤 {article.metrics.shares}
                              </span>
                              <span className="flex items-center gap-1">
                                ⏱️ {article.readTime}
                              </span>
                            </div>
                            <div className="flex gap-3">
                              <Button variant="ghost" size="sm" className="text-xs">
                                Read More
                              </Button>
                              <Button variant="ghost" size="sm" className="text-xs">
                                Share
                              </Button>
                            </div>
                          </div>

                          {/* Blockchain Info */}
                          {article.blockchain && (
                            <div className="mt-4 pt-4 border-t border-gray-700/50">
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                  ⛓️ {article.blockchain}
                                </span>
                              </div>
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="section-padding border-t border-gray-800/50">
          <div className="container-custom">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card
                variant="gradient"
                padding="xl"
                rounded="2xl"
                className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-400/30"
              >
                <h2 className="text-mobile-3xl font-bold heading-font gradient-text-primary mb-6">
                  Never Miss Breaking News
                </h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Get instant notifications for breaking blockchain news, protocol updates, and market-moving events delivered straight to your inbox.
                </p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  />
                  <Button 
                    variant="glow" 
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 px-8"
                  >
                    Subscribe
                  </Button>
                </motion.div>
                
                <p className="text-xs text-gray-400">
                  Join 50,000+ readers • Unsubscribe anytime • No spam, ever
                </p>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}