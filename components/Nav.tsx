"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SafeWallet, SafeConnectWallet, SafeIdentity } from "./SafeWallet";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // Professional navigation structure with proper hierarchy
  const navigationSections = [
    {
      title: "Dashboard",
      priority: "primary",
      color: "blue",
      links: [
        { 
          href: "/", 
          label: "Overview", 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
          ), 
          description: "Main dashboard and analytics",
          badge: "Home"
        },
        { 
          href: "/admin", 
          label: "Admin Panel", 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ), 
          description: "Administrative controls",
          badge: "Admin"
        },
      ]
    },
    {
      title: "Trading & Finance",
      priority: "primary",
      color: "emerald",
      links: [
        { 
          href: "/exchange", 
          label: "Exchange", 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          ), 
          description: "Trade and swap cryptocurrencies",
          badge: "Live"
        },
        { 
          href: "/wallet", 
          label: "Wallet", 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          ), 
          description: "Manage your digital assets",
          badge: "Secure"
        },
        { 
          href: "/opportunities", 
          label: "Opportunities", 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          ), 
          description: "Investment and earning opportunities",
          badge: "New"
        },
      ]
    },
    {
      title: "Market Intelligence",
      priority: "secondary",
      color: "purple",
      links: [
        { 
          href: "/trending", 
          label: "Trending", 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ), 
          description: "Market trends and hot topics",
          badge: "Hot"
        },
        { 
          href: "/news", 
          label: "News", 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          ), 
          description: "Latest crypto and market news",
          badge: "Live"
        },
        { 
          href: "/learn", 
          label: "Learn", 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          ), 
          description: "Educational resources and guides",
          badge: "Free"
        },
      ]
    },
    {
      title: "Community & Social",
      priority: "secondary",
      color: "orange",
      links: [
        { 
          href: "/community", 
          label: "Community", 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ), 
          description: "Connect with other traders",
          badge: "Social"
        },
        { 
          href: "/leaderboard", 
          label: "Leaderboard", 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          ), 
          description: "Top performers and rankings",
          badge: "Compete"
        },
      ]
    },
    {
      title: "Personal Tools",
      priority: "tertiary",
      color: "cyan",
      links: [
        { 
          href: "/profile", 
          label: "Profile", 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ), 
          description: "Your account and settings",
          badge: "Personal"
        },
        { 
          href: "/mint", 
          label: "Mint NFTs", 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2m-5 3v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          ), 
          description: "Create and manage NFTs",
          badge: "Create"
        },
      ]
    }
  ];

  return (
    <>
      {/* Enhanced Wallet Status Bar */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border-b border-blue-500/30 backdrop-blur-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container-custom">
          <div className="flex h-10 sm:h-12 items-center justify-between">
            <motion.div 
              className="flex items-center gap-2 sm:gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-mobile-xs text-gray-300 hidden xs:block">Connected to Base</span>
                <span className="text-xs text-gray-300 xs:hidden">Base</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="hidden sm:flex items-center gap-3 text-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <SafeIdentity 
                className="flex items-center gap-2 touch-optimized" 
                fallback={<span className="text-gray-400 text-xs">Wallet Loading...</span>}
              />
            </motion.div>
            <motion.div 
              className="sm:hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
                <SafeIdentity 
                  className="flex items-center gap-2 touch-optimized" 
                  fallback={<span className="text-gray-400 text-xs">Wallet Loading...</span>}
                />
              </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Main Navigation */}
      <motion.header 
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled 
            ? 'glass-strong border-b border-white/20 shadow-2xl shadow-blue-500/10' 
            : 'glass border-b border-white/10'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="container-custom">
          <div className="flex h-16 sm:h-20 items-center justify-between px-2 sm:px-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/" className="flex items-center gap-3 sm:gap-4 touch-optimized micro-lift group">
                <div className="relative">
                  <motion.div 
                    className="w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25 relative overflow-hidden"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white font-bold text-base sm:text-xl heading-font relative z-10">D</span>
                    
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </div>
                <div className="hidden xs:block">
                  <span className="text-white font-bold text-xl sm:text-2xl heading-font tracking-tight">Diyama</span>
                  <div className="text-sm text-gray-400 hidden sm:block font-medium tracking-wide">Onchain Starter Pack</div>
                </div>
              </Link>
            </motion.div>

            <motion.nav 
              className="hidden lg:flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {navigationSections.flatMap(section => section.links).map((l, index) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  className="relative"
                >
                  <Link
                    prefetch={false}
                    href={l.href}
                    className={`group relative px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-300 body-font nav-item-hover nav-glow micro-bounce overflow-hidden ${
                      pathname === l.href 
                        ? "text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/10 border border-blue-500/30 shadow-lg shadow-blue-500/20" 
                        : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                    }`}
                  >
                    {pathname === l.href && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-cyan-500/10 rounded-2xl"
                        layoutId="activeTab"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Icon */}
                    <div className="relative z-10 flex items-center gap-2">
                      <motion.div 
                        className="text-lg group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {l.icon}
                      </motion.div>
                      <span className="font-medium">{l.label}</span>
                    </div>
                    
                    {/* Shimmer Effect on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div 
                className="hidden lg:flex"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="relative">
                  <SafeWallet>
                    <SafeConnectWallet 
                      className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden border border-blue-400/20"
                      fallback={
                        <motion.div 
                          className="group relative px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-300 hover:text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden border border-gray-500/20"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Background Glow */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ scale: 0.8 }}
                            whileHover={{ scale: 1 }}
                          />
                          
                          {/* Content */}
                          <div className="relative z-10 flex items-center gap-2">
                            <motion.div 
                              className="w-2 h-2 bg-orange-400 rounded-full"
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.7, 1]
                              }}
                              transition={{ 
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                            <span className="text-sm font-medium">Connect Wallet</span>
                          </div>
                          
                          {/* Shimmer Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          />
                        </motion.div>
                      }
                    />
                  </SafeWallet>
                  
                  {/* Floating Particles Effect */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0, 0.3, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>

              {/* Enhanced Mobile Menu Button */}
              <motion.button
                className="lg:hidden relative p-3 rounded-2xl glass-subtle border border-white/10 hover:border-blue-400/30 transition-all duration-300 group overflow-hidden"
                onClick={() => setOpen(!open)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                aria-label="Toggle menu"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: open ? 1 : 0, 
                    scale: open ? 1 : 0.8 
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Hamburger Icon Container */}
                <motion.div
                  className="relative w-6 h-6 flex flex-col justify-center items-center"
                  animate={open ? "open" : "closed"}
                >
                  {/* Top Line */}
                  <motion.span
                    className="absolute w-5 h-0.5 bg-white rounded-full shadow-sm"
                    variants={{
                      closed: { 
                        rotate: 0, 
                        y: -4, 
                        scaleX: 1,
                        backgroundColor: "#ffffff"
                      },
                      open: { 
                        rotate: 45, 
                        y: 0, 
                        scaleX: 1.1,
                        backgroundColor: "#60a5fa"
                      }
                    }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.4, 0, 0.2, 1],
                      backgroundColor: { duration: 0.2 }
                    }}
                  />
                  
                  {/* Middle Line */}
                  <motion.span
                    className="absolute w-5 h-0.5 bg-white rounded-full shadow-sm"
                    variants={{
                      closed: { 
                        opacity: 1, 
                        scaleX: 1,
                        x: 0
                      },
                      open: { 
                        opacity: 0, 
                        scaleX: 0.8,
                        x: 10
                      }
                    }}
                    transition={{ 
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  />
                  
                  {/* Bottom Line */}
                  <motion.span
                    className="absolute w-5 h-0.5 bg-white rounded-full shadow-sm"
                    variants={{
                      closed: { 
                        rotate: 0, 
                        y: 4, 
                        scaleX: 1,
                        backgroundColor: "#ffffff"
                      },
                      open: { 
                        rotate: -45, 
                        y: 0, 
                        scaleX: 1.1,
                        backgroundColor: "#60a5fa"
                      }
                    }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.4, 0, 0.2, 1],
                      backgroundColor: { duration: 0.2 }
                    }}
                  />
                </motion.div>
                
                {/* Ripple Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ 
                    scale: open ? [0, 1.2, 1] : [1, 1.1, 1], 
                    opacity: [0.5, 0.2, 0] 
                  }}
                  transition={{ 
                    duration: 0.6,
                    times: [0, 0.5, 1],
                    ease: "easeOut"
                  }}
                  style={{
                    background: "radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%)"
                  }}
                />
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md lg:hidden"
              onClick={() => setOpen(false)}
            >
              {/* Professional Mobile Menu Panel */}
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  damping: 30, 
                  stiffness: 300,
                  opacity: { duration: 0.3 }
                }}
                className="absolute right-0 top-0 h-full w-96 max-w-[90vw] bg-gradient-to-br from-slate-900/98 via-gray-900/98 to-slate-800/98 backdrop-blur-2xl border-l border-slate-700/30 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10"></div>
                  <div className="absolute top-1/4 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-1/4 left-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
                </div>

                {/* Professional Header */}
                <div className="relative z-10 flex items-center justify-between p-6 border-b border-slate-700/40 bg-gradient-to-r from-slate-800/50 to-gray-800/50">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">D</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl tracking-tight">DIYAMA</h3>
                      <p className="text-slate-400 text-sm font-medium">Professional Dashboard</p>
                    </div>
                  </motion.div>
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpen(false)}
                    className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Professional Navigation Sections */}
                <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                  {navigationSections.map((section, sectionIndex) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.1 + (sectionIndex * 0.1),
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                      className="space-y-4"
                    >
                      {/* Professional Section Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${
                            section.color === 'blue' ? 'from-blue-500 to-blue-600' :
                            section.color === 'emerald' ? 'from-emerald-500 to-emerald-600' :
                            section.color === 'purple' ? 'from-purple-500 to-purple-600' :
                            section.color === 'orange' ? 'from-orange-500 to-orange-600' :
                            'from-cyan-500 to-cyan-600'
                          } shadow-lg`}></div>
                          <div>
                            <h4 className="text-white font-bold text-lg tracking-tight">
                              {section.title}
                            </h4>
                            <div className={`text-xs font-medium px-2 py-1 rounded-full inline-block mt-1 ${
                              section.priority === 'primary' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                              section.priority === 'secondary' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                              'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                            }`}>
                              {section.priority?.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Professional Section Links */}
                      <div className="space-y-3">
                        {section.links.map((link, linkIndex) => (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              delay: 0.2 + (sectionIndex * 0.1) + (linkIndex * 0.05),
                              duration: 0.4,
                              ease: "easeOut"
                            }}
                          >
                            <Link
                              href={link.href}
                              onClick={() => setOpen(false)}
                              className={`group relative flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 overflow-hidden ${
                                pathname === link.href 
                                  ? `bg-gradient-to-r ${
                                      section.color === 'blue' ? 'from-blue-500/20 to-blue-600/10 border border-blue-500/40' :
                                      section.color === 'emerald' ? 'from-emerald-500/20 to-emerald-600/10 border border-emerald-500/40' :
                                      section.color === 'purple' ? 'from-purple-500/20 to-purple-600/10 border border-purple-500/40' :
                                      section.color === 'orange' ? 'from-orange-500/20 to-orange-600/10 border border-orange-500/40' :
                                      'from-cyan-500/20 to-cyan-600/10 border border-cyan-500/40'
                                    } shadow-lg` 
                                  : 'hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/40 hover:border hover:border-slate-600/40 hover:shadow-xl'
                              }`}
                            >
                              {/* Hover Effect Background */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>

                              {/* Professional Icon */}
                              <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                pathname === link.href 
                                  ? `bg-gradient-to-br ${
                                      section.color === 'blue' ? 'from-blue-500 to-blue-600' :
                                      section.color === 'emerald' ? 'from-emerald-500 to-emerald-600' :
                                      section.color === 'purple' ? 'from-purple-500 to-purple-600' :
                                      section.color === 'orange' ? 'from-orange-500 to-orange-600' :
                                      'from-cyan-500 to-cyan-600'
                                    } text-white shadow-lg` 
                                  : 'bg-slate-800/60 text-slate-400 group-hover:bg-slate-700/60 group-hover:text-white group-hover:scale-110'
                              }`}>
                                {link.icon}
                                {pathname === link.href && (
                                  <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                                )}
                              </div>

                              {/* Professional Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h5 className={`font-bold text-lg transition-colors ${
                                    pathname === link.href ? 'text-white' : 'text-slate-200 group-hover:text-white'
                                  }`}>
                                    {link.label}
                                  </h5>
                                  <div className="flex items-center space-x-2">
                                    {link.badge && (
                                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                        pathname === link.href 
                                          ? `${
                                              section.color === 'blue' ? 'bg-blue-400/30 text-blue-200' :
                                              section.color === 'emerald' ? 'bg-emerald-400/30 text-emerald-200' :
                                              section.color === 'purple' ? 'bg-purple-400/30 text-purple-200' :
                                              section.color === 'orange' ? 'bg-orange-400/30 text-orange-200' :
                                              'bg-cyan-400/30 text-cyan-200'
                                            }` 
                                          : 'bg-slate-600/40 text-slate-300 group-hover:bg-slate-500/50'
                                      }`}>
                                        {link.badge}
                                      </span>
                                    )}
                                    <svg className={`w-5 h-5 transition-all duration-300 ${
                                      pathname === link.href 
                                        ? `${
                                            section.color === 'blue' ? 'text-blue-400' :
                                            section.color === 'emerald' ? 'text-emerald-400' :
                                            section.color === 'purple' ? 'text-purple-400' :
                                            section.color === 'orange' ? 'text-orange-400' :
                                            'text-cyan-400'
                                          }` 
                                        : 'text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1'
                                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </div>
                                </div>
                                <p className={`text-sm font-medium transition-colors ${
                                  pathname === link.href ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-300'
                                }`}>
                                  {link.description}
                                </p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Professional Footer - Connect Wallet */}
                <div className="relative z-10 p-6 border-t border-slate-700/40 bg-gradient-to-r from-slate-800/50 to-gray-800/50">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <SafeWallet>
                      <SafeConnectWallet 
                        className="relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold py-5 px-6 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 flex items-center justify-center space-x-4 group overflow-hidden"
                        fallback={
                          <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold py-5 px-6 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 flex items-center justify-center space-x-4 group overflow-hidden"
                          >
                            {/* Button Background Animation */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                            
                            <svg className="relative w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="relative text-lg">Connect Wallet</span>
                            <div className="relative w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                            
                            {/* Floating Particles Effect */}
                            <div className="absolute inset-0 opacity-30">
                              <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                              <div className="absolute top-4 right-6 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                              <div className="absolute bottom-3 left-8 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                            </div>
                          </motion.button>
                        }
                      />
                    </SafeWallet>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}