"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Link from "next/link";

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  bio: string;
  stats: {
    followers: number;
    following: number;
    nfts: number;
    volume: number;
  };
  badges: string[];
  specialties: string[];
  recentWork: {
    title: string;
    image: string;
    price: number;
  }[];
  isFollowing: boolean;
  isOnline: boolean;
  joinedDate: string;
  socialLinks: {
    twitter?: string;
    farcaster?: string;
    website?: string;
  };
}

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  category: string;
  tags: string[];
  timestamp: string;
  metrics: {
    replies: number;
    likes: number;
    views: number;
  };
  isPinned: boolean;
  isHot: boolean;
  lastReply?: {
    author: string;
    timestamp: string;
  };
}

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  type: "workshop" | "ama" | "launch" | "meetup";
  date: string;
  time: string;
  host: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  attendees: number;
  maxAttendees?: number;
  isLive: boolean;
  tags: string[];
}

export default function CommunityPage() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<"discover" | "discussions" | "events">("discover");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [creators, setCreators] = useState<Creator[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCreators: 0,
    onlineCreators: 0,
    totalDiscussions: 0,
    liveEvents: 0
  });

  const mockCreators: Creator[] = [
    {
      id: "1",
      name: "Alex Chen",
      username: "@alexcreates",
      avatar: "🎨",
      verified: true,
      bio: "Digital artist exploring the intersection of AI and blockchain. Creating unique NFT collections on Base.",
      stats: { followers: 12500, following: 890, nfts: 156, volume: 45.8 },
      badges: ["Top Creator", "Early Adopter", "Community Leader"],
      specialties: ["Digital Art", "AI Art", "Generative"],
      recentWork: [
        { title: "Cosmic Dreams #1", image: "🌌", price: 0.5 },
        { title: "Neural Patterns", image: "🧠", price: 0.3 },
        { title: "Base Abstracts", image: "🔷", price: 0.8 }
      ],
      isFollowing: false,
      isOnline: true,
      joinedDate: "2023-08-15",
      socialLinks: { twitter: "alexcreates", farcaster: "alexcreates" }
    },
    {
      id: "2",
      name: "Maya Rodriguez",
      username: "@mayamusic",
      avatar: "🎵",
      verified: true,
      bio: "Music producer and NFT creator. Bridging traditional music with Web3 through innovative audio experiences.",
      stats: { followers: 8900, following: 456, nfts: 89, volume: 32.1 },
      badges: ["Rising Star", "Audio Pioneer"],
      specialties: ["Music NFTs", "Audio Art", "Collaboration"],
      recentWork: [
        { title: "Ethereal Beats #5", image: "🎶", price: 0.4 },
        { title: "Base Frequencies", image: "📻", price: 0.6 },
        { title: "Sonic Landscapes", image: "🌊", price: 0.7 }
      ],
      isFollowing: true,
      isOnline: false,
      joinedDate: "2023-09-22",
      socialLinks: { twitter: "mayamusic", website: "mayamusic.xyz" }
    },
    {
      id: "3",
      name: "Jordan Kim",
      username: "@jordanpixel",
      avatar: "🖼️",
      verified: false,
      bio: "Pixel artist and game developer. Creating retro-inspired NFTs and interactive experiences on Base network.",
      stats: { followers: 5600, following: 234, nfts: 67, volume: 18.9 },
      badges: ["Pixel Master", "Game Dev"],
      specialties: ["Pixel Art", "Game Assets", "Interactive"],
      recentWork: [
        { title: "Retro Heroes #12", image: "👾", price: 0.2 },
        { title: "8-Bit Worlds", image: "🕹️", price: 0.3 },
        { title: "Pixel Portraits", image: "🎮", price: 0.25 }
      ],
      isFollowing: false,
      isOnline: true,
      joinedDate: "2023-10-05",
      socialLinks: { twitter: "jordanpixel" }
    }
  ];

  const mockDiscussions: Discussion[] = [
    {
      id: "1",
      title: "🚀 Base Network Gas Optimization Tips for NFT Creators",
      content: "Sharing some advanced techniques I've discovered for reducing gas costs when minting on Base. These methods have saved me over 40% on transaction fees...",
      author: { name: "Alex Chen", username: "@alexcreates", avatar: "🎨", verified: true },
      category: "Technical",
      tags: ["Base", "Gas", "Optimization", "Minting"],
      timestamp: "2024-01-15T10:30:00Z",
      metrics: { replies: 23, likes: 89, views: 456 },
      isPinned: true,
      isHot: true,
      lastReply: { author: "Maya Rodriguez", timestamp: "2024-01-15T11:45:00Z" }
    },
    {
      id: "2",
      title: "💡 Collaboration Opportunity: Music + Visual Art Project",
      content: "Looking for visual artists to collaborate on an innovative music NFT project. Combining generative audio with dynamic visuals...",
      author: { name: "Maya Rodriguez", username: "@mayamusic", avatar: "🎵", verified: true },
      category: "Collaboration",
      tags: ["Music", "Collaboration", "Visual Art", "NFT"],
      timestamp: "2024-01-15T09:15:00Z",
      metrics: { replies: 15, likes: 67, views: 234 },
      isPinned: false,
      isHot: true,
      lastReply: { author: "Jordan Kim", timestamp: "2024-01-15T10:20:00Z" }
    },
    {
      id: "3",
      title: "📈 Market Analysis: Base NFT Trends for Q1 2024",
      content: "Comprehensive analysis of Base NFT market trends, including top-performing categories, price movements, and emerging opportunities...",
      author: { name: "CryptoAnalyst", username: "@cryptodata", avatar: "📊", verified: true },
      category: "Market",
      tags: ["Analysis", "Trends", "Market", "Q1"],
      timestamp: "2024-01-15T08:00:00Z",
      metrics: { replies: 31, likes: 124, views: 789 },
      isPinned: false,
      isHot: false,
      lastReply: { author: "Alex Chen", timestamp: "2024-01-15T09:30:00Z" }
    },
    {
      id: "4",
      title: "🎨 Tutorial: Creating Animated NFTs with Code",
      content: "Step-by-step guide to creating animated NFTs using p5.js and deploying them on Base. Includes code examples and best practices...",
      author: { name: "Jordan Kim", username: "@jordanpixel", avatar: "🖼️", verified: false },
      category: "Tutorial",
      tags: ["Tutorial", "Animation", "Code", "p5.js"],
      timestamp: "2024-01-15T07:45:00Z",
      metrics: { replies: 18, likes: 92, views: 345 },
      isPinned: false,
      isHot: true,
      lastReply: { author: "TechCreator", timestamp: "2024-01-15T08:15:00Z" }
    }
  ];

  const mockEvents: CommunityEvent[] = [
    {
      id: "1",
      title: "Base Creator Workshop: Advanced Minting Techniques",
      description: "Learn advanced minting strategies, gas optimization, and smart contract interactions for Base network.",
      type: "workshop",
      date: "2024-01-20",
      time: "2:00 PM UTC",
      host: { name: "Alex Chen", avatar: "🎨", verified: true },
      attendees: 89,
      maxAttendees: 100,
      isLive: false,
      tags: ["Workshop", "Minting", "Base", "Technical"]
    },
    {
      id: "2",
      title: "🎵 Music NFT AMA with Maya Rodriguez",
      description: "Ask anything about creating music NFTs, building an audience, and monetizing audio art in Web3.",
      type: "ama",
      date: "2024-01-18",
      time: "6:00 PM UTC",
      host: { name: "Maya Rodriguez", avatar: "🎵", verified: true },
      attendees: 156,
      isLive: true,
      tags: ["AMA", "Music", "NFT", "Creator Economy"]
    },
    {
      id: "3",
      title: "🚀 New Collection Launch: Pixel Worlds",
      description: "Join Jordan Kim for the exclusive launch of the Pixel Worlds collection featuring interactive game assets.",
      type: "launch",
      date: "2024-01-22",
      time: "8:00 PM UTC",
      host: { name: "Jordan Kim", avatar: "🖼️", verified: false },
      attendees: 234,
      maxAttendees: 500,
      isLive: false,
      tags: ["Launch", "Pixel Art", "Gaming", "Collection"]
    }
  ];

  const categories = ["all", "Technical", "Collaboration", "Market", "Tutorial", "General"];

  // Fetch community data from APIs
  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        setLoading(true);
        
        // Fetch creators
        const creatorsResponse = await fetch('/api/community/creators');
        const creatorsData = await creatorsResponse.json();
        
        // Fetch discussions
        const discussionsResponse = await fetch('/api/community/discussions');
        const discussionsData = await discussionsResponse.json();
        
        // Fetch events
        const eventsResponse = await fetch('/api/community/events');
        const eventsData = await eventsResponse.json();
        
        if (creatorsResponse.ok) {
          setCreators(creatorsData.creators);
        }
        
        if (discussionsResponse.ok) {
          setDiscussions(discussionsData.discussions);
        }
        
        if (eventsResponse.ok) {
          setEvents(eventsData.events);
        }
        
        // Update stats
        setStats({
          totalCreators: creatorsData.stats?.totalCreators || 0,
          onlineCreators: creatorsData.stats?.onlineCreators || 0,
          totalDiscussions: discussionsData.stats?.totalDiscussions || 0,
          liveEvents: eventsData.stats?.liveEvents || 0
        });
        
      } catch (error) {
        console.error('Error fetching community data:', error);
        // Fallback to empty arrays
        setCreators([]);
        setDiscussions([]);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchCommunityData, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = searchQuery === "" || 
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = selectedCategory === "all" || discussion.category === selectedCategory;
    const matchesSearch = searchQuery === "" ||
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Hero Section */}
      <section className="container-custom py-mobile text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-mobile mb-mobile">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-400 text-mobile-xs sm:text-sm font-medium">CREATOR COMMUNITY</span>
          </div>
          <h1 className="text-mobile-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-slate-100 mb-mobile">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Connect & Create
            </span>
          </h1>
          <p className="text-mobile-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-mobile px-4">
            Join a vibrant community of creators, collectors, and innovators building the future of digital art and blockchain technology.
          </p>
          
          {/* Community Stats */}
          <div className="grid grid-mobile-3 gap-mobile max-w-md mx-auto mb-mobile">
            <div className="text-center">
              <div className="text-mobile-xl sm:text-2xl font-bold text-purple-400">10K+</div>
              <div className="text-mobile-xs text-slate-400">Creators</div>
            </div>
            <div className="text-center">
              <div className="text-mobile-xl sm:text-2xl font-bold text-pink-400">50K+</div>
              <div className="text-mobile-xs text-slate-400">Members</div>
            </div>
            <div className="text-center">
              <div className="text-mobile-xl sm:text-2xl font-bold text-cyan-400">1M+</div>
              <div className="text-mobile-xs text-slate-400">Interactions</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-mobile justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-pink-600 touch-target micro-bounce text-mobile-base px-mobile py-mobile"
            >
              Join Community
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              className="touch-target micro-bounce text-mobile-base px-mobile py-mobile"
            >
              Explore Creators
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Navigation Tabs */}
      <section className="container-custom py-mobile">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="mb-mobile">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search creators, discussions, or events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-mobile py-mobile pl-10 bg-slate-800/50 border border-slate-600/50 rounded-mobile text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-mobile-base touch-target"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">🔍</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-mobile mb-mobile">
            {[
              { key: "discover", label: "Discover", icon: "🎨" },
              { key: "discussions", label: "Discussions", icon: "💬" },
              { key: "events", label: "Events", icon: "📅" }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-mobile py-mobile rounded-mobile text-mobile-sm font-medium transition-all touch-target micro-bounce ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                    : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Category Filters for Discussions */}
          {activeTab === "discussions" && (
            <div className="flex flex-wrap justify-center gap-mobile px-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-mobile py-1 rounded-full text-mobile-xs font-medium transition-all touch-target micro-bounce ${
                    selectedCategory === category
                      ? "bg-purple-500/20 text-purple-400 border border-purple-400/30"
                      : "bg-slate-800/30 text-slate-400 hover:bg-slate-700/30"
                  }`}
                >
                  {category === "all" ? "All Topics" : category}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Content Sections */}
      {activeTab === "discover" && (
        <Section title="Featured Creators" description="Discover talented creators building amazing projects">
          <div className="grid grid-mobile-1 md:grid-cols-2 lg:grid-cols-3 gap-mobile">
            {filteredCreators.map((creator, index) => (
              <motion.div
                key={creator.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card variant="glow" className="p-mobile hover:border-purple-400/50 transition-all duration-300 touch-card micro-lift">
                  {/* Creator Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-mobile gap-mobile">
                    <div className="flex items-center gap-mobile">
                      <div className="text-mobile-2xl sm:text-3xl">{creator.avatar}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-100 text-mobile-base">{creator.name}</h3>
                          {creator.verified && <span className="text-blue-400">✓</span>}
                          {creator.isOnline && <span className="w-2 h-2 bg-green-400 rounded-full"></span>}
                        </div>
                        <p className="text-mobile-xs text-slate-400">{creator.username}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant={creator.isFollowing ? "secondary" : "primary"}
                      className={`touch-target micro-bounce text-mobile-xs ${creator.isFollowing ? "" : "bg-gradient-to-r from-purple-500 to-pink-600"}`}
                    >
                      {creator.isFollowing ? "Following" : "Follow"}
                    </Button>
                  </div>

                  {/* Bio */}
                  <p className="text-slate-300 text-mobile-sm mb-mobile leading-relaxed">{creator.bio}</p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-mobile mb-mobile">
                    {creator.badges.map((badge) => (
                      <span key={badge} className="text-mobile-xs bg-purple-500/20 text-purple-300 px-mobile py-1 rounded border border-purple-400/30">
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-mobile mb-mobile">
                    {creator.specialties.map((specialty) => (
                      <span key={specialty} className="text-mobile-xs bg-slate-700/50 text-slate-300 px-mobile py-1 rounded">
                        #{specialty}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-mobile mb-mobile p-mobile bg-slate-800/30 rounded-mobile">
                    <div className="text-center">
                      <div className="text-mobile-lg font-bold text-purple-400">{formatNumber(creator.stats.followers)}</div>
                      <div className="text-mobile-xs text-slate-400">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-mobile-lg font-bold text-pink-400">{creator.stats.nfts}</div>
                      <div className="text-mobile-xs text-slate-400">NFTs</div>
                    </div>
                  </div>

                  {/* Recent Work */}
                  <div className="mb-mobile">
                    <h4 className="text-mobile-sm font-medium text-slate-200 mb-mobile">Recent Work</h4>
                    <div className="grid grid-cols-3 gap-mobile">
                      {creator.recentWork.slice(0, 3).map((work, idx) => (
                        <div key={idx} className="p-mobile bg-slate-800/30 rounded text-center touch-card">
                          <div className="text-mobile-lg mb-1">{work.image}</div>
                          <div className="text-mobile-xs text-slate-400">{work.price} ETH</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-mobile">
                    <Button size="sm" className="flex-1 touch-target micro-bounce text-mobile-xs">
                      View Profile
                    </Button>
                    <Button size="sm" variant="ghost" className="touch-target micro-bounce">
                      💬
                    </Button>
                    <Button size="sm" variant="ghost" className="touch-target micro-bounce">
                      🔗
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {activeTab === "discussions" && (
        <Section title="Community Discussions" description="Join conversations and share knowledge">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                    : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50"
                }`}
              >
                {category === "all" ? "All Topics" : category}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredDiscussions.map((discussion, index) => (
              <motion.div
                key={discussion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  variant="glow" 
                  className={`p-6 hover:border-purple-400/50 transition-all duration-300 cursor-pointer ${
                    discussion.isPinned ? "border-yellow-400/50 bg-yellow-900/10" : ""
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {discussion.isPinned && <span className="text-yellow-400">📌</span>}
                      {discussion.isHot && <span className="text-red-400">🔥</span>}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        discussion.category === "Technical" ? "bg-blue-500/20 text-blue-300 border border-blue-400/30" :
                        discussion.category === "Collaboration" ? "bg-green-500/20 text-green-300 border border-green-400/30" :
                        discussion.category === "Market" ? "bg-purple-500/20 text-purple-300 border border-purple-400/30" :
                        discussion.category === "Tutorial" ? "bg-orange-500/20 text-orange-300 border border-orange-400/30" :
                        "bg-slate-500/20 text-slate-300 border border-slate-400/30"
                      }`}>
                        {discussion.category}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">{formatTimeAgo(discussion.timestamp)}</div>
                  </div>

                  {/* Title and Content */}
                  <h3 className="text-slate-100 font-semibold text-lg mb-3 leading-tight">
                    {discussion.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed line-clamp-2">
                    {discussion.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {discussion.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Author and Metrics */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-lg">{discussion.author.avatar}</div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-slate-300">{discussion.author.name}</span>
                          {discussion.author.verified && <span className="text-blue-400">✓</span>}
                        </div>
                        <span className="text-xs text-slate-400">{discussion.author.username}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>💬 {discussion.metrics.replies}</span>
                      <span>❤️ {discussion.metrics.likes}</span>
                      <span>👁️ {discussion.metrics.views}</span>
                    </div>
                  </div>

                  {/* Last Reply */}
                  {discussion.lastReply && (
                    <div className="mt-4 pt-4 border-t border-slate-700/50">
                      <div className="text-xs text-slate-400">
                        Last reply by <span className="text-slate-300">{discussion.lastReply.author}</span> • {formatTimeAgo(discussion.lastReply.timestamp)}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Create Discussion Button */}
          <div className="text-center mt-8">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600">
              ✨ Start New Discussion
            </Button>
          </div>
        </Section>
      )}

      {activeTab === "events" && (
        <Section title="Community Events" description="Join workshops, AMAs, and creator meetups">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  variant="glow" 
                  className={`p-6 hover:border-purple-400/50 transition-all duration-300 ${
                    event.isLive ? "border-red-400/50 bg-red-900/10" : ""
                  }`}
                >
                  {/* Event Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        event.type === "workshop" ? "bg-blue-500/20 text-blue-300 border-blue-400/30" :
                        event.type === "ama" ? "bg-green-500/20 text-green-300 border-green-400/30" :
                        event.type === "launch" ? "bg-purple-500/20 text-purple-300 border-purple-400/30" :
                        "bg-orange-500/20 text-orange-300 border-orange-400/30"
                      }`}>
                        {event.type.toUpperCase()}
                      </span>
                      {event.isLive && (
                        <span className="flex items-center gap-1 text-xs text-red-400">
                          <span className="animate-pulse">●</span>
                          LIVE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Event Details */}
                  <h3 className="text-slate-100 font-semibold text-lg mb-3 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Date and Time */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                    <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                    <span>🕐 {event.time}</span>
                  </div>

                  {/* Host */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-lg">{event.host.avatar}</div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-slate-300">Hosted by {event.host.name}</span>
                        {event.host.verified && <span className="text-blue-400">✓</span>}
                      </div>
                    </div>
                  </div>

                  {/* Attendees */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">
                        👥 {event.attendees} attending
                        {event.maxAttendees && ` / ${event.maxAttendees} max`}
                      </span>
                      {event.maxAttendees && (
                        <span className="text-xs text-slate-500">
                          {Math.round((event.attendees / event.maxAttendees) * 100)}% full
                        </span>
                      )}
                    </div>
                    {event.maxAttendees && (
                      <div className="w-full bg-slate-700/50 rounded-full h-2 mt-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((event.attendees / event.maxAttendees) * 100, 100)}%` }}
                        ></div>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className={`flex-1 ${event.isLive ? "bg-gradient-to-r from-red-500 to-pink-600" : "bg-gradient-to-r from-purple-500 to-pink-600"}`}
                    >
                      {event.isLive ? "🔴 Join Live" : "📅 RSVP"}
                    </Button>
                    <Button size="sm" variant="ghost">
                      🔗 Share
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Create Event Button */}
          <div className="text-center mt-8">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600">
              🎪 Host an Event
            </Button>
          </div>
        </Section>
      )}

      {/* Community Guidelines */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card variant="glow" className="p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-400/30">
            <h2 className="text-3xl font-bold text-slate-100 mb-6 text-center">
              Community Guidelines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="font-semibold text-slate-200 mb-2">Be Respectful</h3>
                <p className="text-slate-300 text-sm">Treat all community members with respect and kindness.</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-semibold text-slate-200 mb-2">Share & Create</h3>
                <p className="text-slate-300 text-sm">Share your work, collaborate, and help others grow.</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="font-semibold text-slate-200 mb-2">Stay Safe</h3>
                <p className="text-slate-300 text-sm">Verify links, protect your wallet, and report suspicious activity.</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Button variant="secondary">
                📖 Read Full Guidelines
              </Button>
            </div>
          </Card>
        </motion.div>
      </section>
    </main>
  );
}