"use client";
import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { value: "10M+", label: "Transactions", description: "Processed on Base", icon: "⚡" },
    { value: "$2.5B+", label: "Total Value", description: "Locked in protocols", icon: "💎" },
    { value: "500K+", label: "Active Users", description: "Building onchain", icon: "👥" },
    { value: "1,200+", label: "Projects", description: "Deployed on Base", icon: "🚀" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="relative container-custom py-mobile">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(0, 82, 255, 0.06) 0%, rgba(0, 240, 255, 0.02) 70%, transparent 100%)"
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity
          }}
        />
      </div>

      <motion.div 
        className="text-center mb-mobile relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-mobile-3xl sm:text-4xl md:text-6xl lg:text-7xl heading-font text-white mb-mobile leading-tight px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Powering the <span className="gradient-text-neon">Future</span>
        </motion.h2>
        <motion.p 
          className="text-mobile-base sm:text-xl md:text-2xl text-gray-400 body-font max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Join thousands building the onchain economy with real impact and measurable growth
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="grid-mobile-2 sm:grid-cols-2 lg:grid-cols-4 gap-mobile relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              y: -10,
              transition: { duration: 0.3 }
            }}
            className="group relative"
          >
            {/* Card Background with Enhanced Glassmorphism */}
            <div className="glass-card rounded-mobile p-mobile text-center relative overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all duration-500 touch-card micro-bounce">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 rounded-mobile opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Floating Icon */}
              <motion.div 
                className="text-mobile-2xl sm:text-4xl mb-mobile opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                {stat.icon}
              </motion.div>
              
              {/* Value */}
              <motion.div 
                className="text-mobile-3xl sm:text-4xl md:text-5xl lg:text-6xl heading-font gradient-text-neon mb-mobile relative z-10"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
              >
                {stat.value}
              </motion.div>
              
              {/* Label */}
              <motion.div 
                className="text-mobile-lg sm:text-xl md:text-2xl heading-font text-white mb-mobile relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                {stat.label}
              </motion.div>
              
              {/* Description */}
              <motion.div 
                className="text-mobile-xs sm:text-sm md:text-base text-gray-400 body-font relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
              >
                {stat.description}
              </motion.div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-mobile bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            </div>

            {/* Floating Particles */}
            <motion.div
              className="absolute top-4 right-4 w-2 h-2 bg-gradient-neon rounded-full opacity-0 group-hover:opacity-60"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Accent Line */}
      <motion.div 
        className="mt-20 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1.5 }}
      />
    </section>
  );
}