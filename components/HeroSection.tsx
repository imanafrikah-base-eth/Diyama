"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Enhanced Base Brand Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(0, 82, 255, 0.12) 0%, rgba(0, 240, 255, 0.06) 70%, transparent 100%)"
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 -right-20 h-96 w-96 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(0, 0, 255, 0.08) 0%, rgba(0, 82, 255, 0.04) 70%, transparent 100%)"
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(0, 240, 255, 0.10) 0%, rgba(0, 82, 255, 0.05) 70%, transparent 100%)"
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <div className="relative container-custom py-mobile w-full">
        {/* Enhanced Glassmorphism container */}
        <motion.div 
          className="mx-auto w-full rounded-mobile glass-strong relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 rounded-mobile" />
          
          <div className="p-mobile relative z-10">
            {/* Hero Content */}
            <div className="text-center space-y-mobile">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className="text-mobile-4xl sm:text-6xl md:text-8xl lg:text-9xl heading-font tracking-tight gradient-text-neon leading-none">
                  Build Onchain
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h2 className="text-mobile-2xl sm:text-4xl md:text-6xl lg:text-7xl heading-font text-white leading-tight">
                  Create <span className="gradient-text-primary">Value</span>
                </h2>
              </motion.div>
              
              <motion.div 
                className="mx-auto max-w-4xl text-mobile-base sm:text-xl md:text-2xl text-gray-400 body-font leading-relaxed px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Join the future of decentralized creation. Build, deploy, and monetize your projects on Base with cutting-edge tools and unlimited possibilities.
              </motion.div>
            </div>

            {/* Enhanced Action buttons */}
            <motion.div 
              className="mt-mobile flex flex-col sm:flex-row items-center justify-center gap-mobile"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  prefetch={false}
                  href="/wallet"
                  className="btn-glow animate-shimmer text-mobile-base sm:text-xl px-mobile py-mobile sm:px-12 sm:py-5 inline-block w-full sm:w-auto text-center touch-target micro-bounce"
                  aria-label="Connect Wallet"
                >
                  Connect Wallet
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  prefetch={false}
                  href="/opportunities"
                  className="btn btn-secondary hover-neon text-mobile-base sm:text-xl px-mobile py-mobile sm:px-12 sm:py-5 inline-block w-full sm:w-auto text-center touch-target micro-bounce"
                  aria-label="Explore Opportunities"
                >
                  Explore Opportunities
                </Link>
              </motion.div>
            </motion.div>

            {/* Floating elements */}
            <div className="absolute top-8 right-8 opacity-20">
              <motion.div
                className="w-4 h-4 bg-gradient-neon rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            <div className="absolute bottom-8 left-8 opacity-20">
              <motion.div
                className="w-6 h-6 border-2 border-cyan-400 rounded-full"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}