"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { href: "/community", label: "Community" },
    { href: "/news", label: "News" },
    { href: "/learn", label: "Learn" },
    { href: "/mint", label: "Mint" },
  ];

  const socialLinks = [
    { href: "https://twitter.com/diyama", label: "Twitter", icon: "𝕏" },
    { href: "https://discord.gg/diyama", label: "Discord", icon: "💬" },
    { href: "https://github.com/diyama", label: "GitHub", icon: "⚡" },
  ];

  return (
    <motion.footer 
      className="mt-10 sm:mt-16 border-t border-slate-800/50 bg-black/30 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="container-custom py-mobile">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <motion.div 
            className="col-span-1 sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse-soft"></div>
              </div>
              <div>
                <span className="text-white font-bold text-lg heading-font">Diyama</span>
                <div className="text-xs text-gray-400">Onchain Starter Pack</div>
              </div>
            </div>
            <p className="text-mobile-xs text-gray-400 leading-relaxed">
              Empowering creators with onchain tools and community-driven experiences on Base.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-mobile-sm mb-3 heading-font">Quick Links</h3>
            <div className="space-y-2">
              {footerLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={link.href} 
                    className="block text-mobile-xs text-gray-400 hover:text-white transition-colors duration-200 micro-lift"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-mobile-sm mb-3 heading-font">Community</h3>
            <div className="space-y-2">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-mobile-xs text-gray-400 hover:text-white transition-colors duration-200 micro-lift"
                  >
                    <span className="text-sm">{social.icon}</span>
                    {social.label}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-mobile-sm mb-3 heading-font">Stay Updated</h3>
            <p className="text-mobile-xs text-gray-400 mb-3">
              Get the latest onchain updates and creator insights.
            </p>
            <motion.button 
              className="w-full sm:w-auto btn-outline px-4 py-2 text-mobile-xs font-medium micro-bounce"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Newsletter
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-4 sm:pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="text-mobile-xs text-gray-400 text-center sm:text-left">
            © {currentYear} Diyama. All rights reserved.
          </span>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/privacy" className="text-mobile-xs text-gray-400 hover:text-white transition-colors duration-200">
              Privacy
            </Link>
            <Link href="/terms" className="text-mobile-xs text-gray-400 hover:text-white transition-colors duration-200">
              Terms
            </Link>
            <div className="flex items-center gap-2 text-mobile-xs text-gray-400">
              <span>Built on</span>
              <span className="text-blue-400 font-semibold">Base</span>
              <motion.span 
                className="text-blue-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚡
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}