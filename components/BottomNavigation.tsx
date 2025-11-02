'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Wallet, 
  BookOpen, 
  TrendingUp, 
  Newspaper, 
  Trophy, 
  User,
  Briefcase
} from 'lucide-react';

const navigationItems = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: Home
  },
  {
    id: 'wallet',
    label: 'Wallet',
    href: '/wallet',
    icon: Wallet
  },
  {
    id: 'learn',
    label: 'Learn',
    href: '/learn',
    icon: BookOpen
  },
  {
    id: 'opportunities',
    label: 'Opportunities',
    href: '/opportunities',
    icon: Briefcase
  },
  {
    id: 'trending',
    label: 'Trending',
    href: '/trending',
    icon: TrendingUp
  },
  {
    id: 'news',
    label: 'News',
    href: '/news',
    icon: Newspaper
  },
  {
    id: 'leaderboard',
    label: 'Leaderboard',
    href: '/leaderboard',
    icon: Trophy
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/profile',
    icon: User
  }
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <motion.nav
      className="nav-bottom"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-2 py-3 max-w-screen-xl mx-auto overflow-x-auto">
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.id} href={item.href} className="nav-item group">
              <motion.div
                className="relative flex flex-col items-center justify-center min-w-[60px] px-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {/* Active indicator background */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-xl"
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                {/* Icon container */}
                <motion.div
                  className={`relative p-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'text-cyan-400 nav-glow' 
                      : 'text-gray-400 group-hover:text-cyan-300'
                  }`}
                  animate={isActive ? {
                    boxShadow: [
                      '0 0 10px rgba(0, 240, 255, 0.3)',
                      '0 0 20px rgba(0, 240, 255, 0.5)',
                      '0 0 10px rgba(0, 240, 255, 0.3)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  
                  {/* Pulse animation for active item */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-lg border border-cyan-400/30"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>
                
                {/* Label */}
                <motion.span
                  className={`text-xs font-medium mt-1 transition-all duration-300 ${
                    isActive 
                      ? 'text-cyan-400' 
                      : 'text-gray-500 group-hover:text-gray-300'
                  }`}
                  animate={isActive ? {
                    textShadow: [
                      '0 0 5px rgba(0, 240, 255, 0.5)',
                      '0 0 10px rgba(0, 240, 255, 0.8)',
                      '0 0 5px rgba(0, 240, 255, 0.5)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {item.label}
                </motion.span>
                
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                />
              </motion.div>
            </Link>
          );
        })}
      </div>
      
      {/* Bottom safe area for mobile devices */}
      <div className="h-safe-bottom bg-gradient-to-t from-black/80 to-transparent" />
    </motion.nav>
  );
}