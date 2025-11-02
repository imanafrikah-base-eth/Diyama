'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { 
  BookOpen, 
  Wallet, 
  TrendingUp, 
  Users, 
  Zap, 
  Shield,
  Globe,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function HomePage() {
  const [unlockedSteps, setUnlockedSteps] = useState([1]);

  const unlockStep = (stepNumber: number) => {
    if (!unlockedSteps.includes(stepNumber)) {
      setUnlockedSteps([...unlockedSteps, stepNumber]);
    }
  };

  const journeySteps = [
    {
      id: 1,
      title: "Discover Base",
      description: "Learn what makes Base the future of onchain creation",
      icon: Globe,
      color: "from-blue-500 to-cyan-400",
      unlocked: true
    },
    {
      id: 2,
      title: "Get Your Wallet",
      description: "Set up your digital wallet in under 2 minutes",
      icon: Wallet,
      color: "from-cyan-400 to-blue-500",
      unlocked: unlockedSteps.includes(2)
    },
    {
      id: 3,
      title: "Start Exploring",
      description: "Discover opportunities and start creating onchain",
      icon: Sparkles,
      color: "from-purple-500 to-pink-400",
      unlocked: unlockedSteps.includes(3)
    }
  ];

  const stats = [
    { label: "Active Creators", value: "10K+", icon: Users },
    { label: "Weekly Opportunities", value: "50+", icon: TrendingUp },
    { label: "Total Mints", value: "1M+", icon: Zap },
    { label: "Community Members", value: "100K+", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Fixed Wallet Button */}
      <div className="fixed top-6 right-6 z-50">
        <ConnectWallet className="btn-diyama-glass" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Animated Diamond Hero */}
          <motion.div
            className="mb-12 flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative">
              <motion.div
                className="w-32 h-32 bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 rounded-lg transform rotate-45"
                animate={{ 
                  rotateZ: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  boxShadow: '0 0 60px rgba(0, 240, 255, 0.4)'
                }}
              />
              <motion.div
                className="absolute inset-2 bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-600 rounded-lg"
                animate={{ 
                  rotateZ: [360, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Hero Text */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 gradient-hero leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Welcome to the Creator's Onchain World
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            You don't need money to start — only curiosity. ✨
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link href="/learn" className="btn-diyama-primary inline-flex items-center gap-2">
              <BookOpen size={20} />
              Learn What Base Is
              <ArrowRight size={16} />
            </Link>
            <ConnectWallet className="btn-diyama-glass" />
          </motion.div>
        </div>
      </section>

      {/* USDC Exchange Promo */}
      <section className="px-6 py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Link href="/wallet" className="block">
            <div className="card-diyama text-center p-8 border-2 border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                  <Wallet className="text-white" size={24} />
                </div>
                <ArrowRight className="text-cyan-400" size={24} />
                <div className="text-2xl font-bold">💰</div>
              </div>
              <h3 className="text-2xl font-bold gradient-text-neon mb-2">USDC to Kwacha Exchange</h3>
              <p className="text-gray-300">Convert your USDC to Zambian Kwacha with our secure P2P exchange</p>
              <div className="mt-4 text-cyan-400 font-semibold">Current Rate: 1 USDC = 21.99 ZMW</div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* Journey Steps */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text-primary mb-4">
              Your Journey Starts Here
            </h2>
            <p className="text-xl text-gray-300">Three simple steps to enter the onchain world</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              const isUnlocked = unlockedSteps.includes(step.id);
              
              return (
                <motion.div
                  key={step.id}
                  className={`card-step ${isUnlocked ? 'unlocked' : ''}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: isUnlocked ? 1 : 0.5, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  onClick={() => {
                    if (step.id === 1) unlockStep(2);
                    if (step.id === 2) unlockStep(3);
                  }}
                >
                  <div className="text-center">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center relative`}>
                      <Icon className="text-white" size={32} />
                      {isUnlocked && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{ 
                            boxShadow: [
                              '0 0 20px rgba(0, 240, 255, 0.3)',
                              '0 0 40px rgba(0, 240, 255, 0.6)',
                              '0 0 20px rgba(0, 240, 255, 0.3)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text-neon mb-4">
              Join the Movement
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="card-diyama text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon className="mx-auto mb-4 text-cyan-400" size={32} />
                  <div className="text-2xl md:text-3xl font-bold gradient-text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold gradient-hero mb-6">
            From Lusaka to Los Angeles
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your creativity knows no borders. Start your onchain journey today and connect with creators worldwide.
          </p>
          <Link href="/opportunities" className="btn-diyama-primary inline-flex items-center gap-2">
            Start Your Journey
            <Sparkles size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Bottom padding for navigation */}
      <div className="h-24"></div>
    </div>
  );
}

