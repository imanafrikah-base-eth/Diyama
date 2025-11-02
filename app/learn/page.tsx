'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  BookOpen, 
  Instagram, 
  Youtube, 
  Twitter,
  Shield,
  DollarSign,
  Zap,
  Music,
  Palette,
  Video,
  ExternalLink,
  Wallet,
  Globe,
  Clock,
  TrendingUp
} from 'lucide-react';

export default function LearnPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Hero Section */}
      <section className="px-6 py-16">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
            <BookOpen className="text-white" size={40} />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold gradient-hero mb-6">
            What is Base?
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            (In Plain English)
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Think of it like Instagram or TikTok, but you actually own your content and keep the money you make from it.
          </p>
        </motion.div>
      </section>

      {/* The Problem Section */}
      <section className="px-6 py-16">
        <motion.div
          className="max-w-6xl mx-auto"
          {...fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-primary mb-12 text-center">
            The Problem with Traditional Platforms
          </h2>
          
          <div className="card-diyama p-8 mb-8">
            <div className="flex justify-center gap-8 mb-8">
              <div className="flex flex-col items-center">
                <Instagram className="text-pink-500 mb-2" size={48} />
                <span className="text-sm text-gray-400">Instagram</span>
              </div>
              <div className="flex flex-col items-center">
                <Youtube className="text-red-500 mb-2" size={48} />
                <span className="text-sm text-gray-400">YouTube</span>
              </div>
              <div className="flex flex-col items-center">
                <Twitter className="text-blue-400 mb-2" size={48} />
                <span className="text-sm text-gray-400">Twitter</span>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">These platforms take 45-99% of your earnings</h3>
              <p className="text-gray-300 mb-6">
                You create the content, build the audience, but they control everything and keep most of the money.
              </p>
            </div>
          </div>

          <motion.div
            className="border-2 border-red-500/50 bg-red-500/10 rounded-xl p-6 text-center"
            whileHover={{ borderColor: 'rgba(239, 68, 68, 0.8)' }}
          >
            <h4 className="text-xl font-bold text-red-400 mb-2">⚠️ The Reality</h4>
            <p className="text-gray-300">
              Traditional platforms can delete your account, change their rules, or stop paying you at any time. 
              You don't actually own anything you create on them.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* The Solution Section */}
      <section className="px-6 py-16">
        <motion.div
          className="max-w-6xl mx-auto"
          {...fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-neon mb-12 text-center">
            The Solution: Going "Onchain"
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <motion.div
              className="card-diyama text-center p-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">You Own Your Content</h3>
              <p className="text-gray-400">
                Your creations are permanently stored on the blockchain. No one can delete them or take them away.
              </p>
            </motion.div>

            <motion.div
              className="card-diyama text-center p-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                <DollarSign className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">You Keep the Money</h3>
              <p className="text-gray-400">
                Direct payments from fans to you. No middleman taking 30-50% cuts. You set your own prices.
              </p>
            </motion.div>

            <motion.div
              className="card-diyama text-center p-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full flex items-center justify-center">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Instant Global Access</h3>
              <p className="text-gray-400">
                Anyone in the world can support you instantly. No payment processors, no country restrictions.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="border-2 border-green-500/50 bg-green-500/10 rounded-xl p-6 text-center"
            whileHover={{ borderColor: 'rgba(34, 197, 94, 0.8)' }}
          >
            <h4 className="text-xl font-bold text-green-400 mb-2">✅ The Result</h4>
            <p className="text-gray-300">
              You become your own platform. Your fans can invest in you directly, and you earn money every time your work is shared or sold.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Real Examples Section */}
      <section className="px-6 py-16">
        <motion.div
          className="max-w-6xl mx-auto"
          {...fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-primary mb-12 text-center">
            Real Examples
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-diyama p-6">
              <div className="flex items-center gap-3 mb-4">
                <Music className="text-purple-400" size={24} />
                <h3 className="text-xl font-bold">For Musicians</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-red-500/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-2">Spotify:</p>
                  <p className="font-bold">$0.003 per stream</p>
                  <p className="text-xs text-gray-400">Need 1M streams = $3,000</p>
                </div>
                <div className="text-center text-gray-400">VS</div>
                <div className="bg-green-500/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-2">Zora Minting:</p>
                  <p className="font-bold">$1+ per mint</p>
                  <p className="text-xs text-gray-400">Need 3,000 fans = $3,000</p>
                </div>
              </div>
            </div>

            <div className="card-diyama p-6">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="text-pink-400" size={24} />
                <h3 className="text-xl font-bold">For Artists</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-red-500/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-2">Instagram Posts:</p>
                  <p className="font-bold">$0 ownership</p>
                  <p className="text-xs text-gray-400">Platform owns everything</p>
                </div>
                <div className="text-center text-gray-400">VS</div>
                <div className="bg-green-500/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-2">Onchain Art:</p>
                  <p className="font-bold">10% royalties forever</p>
                  <p className="text-xs text-gray-400">Earn every time it's resold</p>
                </div>
              </div>
            </div>

            <div className="card-diyama p-6">
              <div className="flex items-center gap-3 mb-4">
                <Video className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold">For Creators</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-red-500/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-2">Patreon:</p>
                  <p className="font-bold">8% + payment fees</p>
                  <p className="text-xs text-gray-400">Monthly subscriptions only</p>
                </div>
                <div className="text-center text-gray-400">VS</div>
                <div className="bg-green-500/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-2">Creator Coins:</p>
                  <p className="font-bold">Fans invest in you</p>
                  <p className="text-xs text-gray-400">They profit when you succeed</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Key Concepts Section */}
      <section className="px-6 py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          {...fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-neon mb-12 text-center">
            Key Concepts Explained
          </h2>
          
          <div className="space-y-8">
            <div className="card-diyama p-8">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">What's Minting?</h3>
              <p className="text-lg text-gray-300 mb-4">
                Think of it as a "permanent upload that you control."
              </p>
              <p className="text-gray-400">
                When you mint something, you're putting it on the blockchain forever. It's like uploading to Instagram, 
                but you own it, you can sell it, and no one can delete it.
              </p>
            </div>

            <div className="card-diyama p-8">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">What's a Creator Coin?</h3>
              <p className="text-lg text-gray-300 mb-4">
                It's like your fans buying stock in you as a creator.
              </p>
              <p className="text-gray-400">
                When you do well, their investment goes up. When they support you early, they benefit from your success. 
                It aligns everyone's interests - your fans want you to succeed because they profit too.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Getting Started Guide */}
      <section className="px-6 py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          {...fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-primary mb-12 text-center">
            Getting Started Guide
          </h2>
          
          <div className="space-y-6">
            <div className="card-step unlocked">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3">Download a Wallet</h3>
                  <p className="text-gray-400 mb-4">
                    A wallet is like your digital bank account. It holds your money and proves you own your creations.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://www.coinbase.com/wallet" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-diyama-glass inline-flex items-center gap-2"
                    >
                      Coinbase Wallet <ExternalLink size={16} />
                    </a>
                    <a 
                      href="https://metamask.io" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-diyama-glass inline-flex items-center gap-2"
                    >
                      MetaMask <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-step unlocked">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3">Add Base Network</h3>
                  <p className="text-gray-400 mb-4">
                    Base is where the magic happens. It's fast, cheap, and built by Coinbase.
                  </p>
                  <a 
                    href="https://chainlist.org/chain/8453" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-diyama-primary inline-flex items-center gap-2"
                  >
                    One-Click Setup <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="card-step unlocked">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3">Get ETH on Base</h3>
                  <p className="text-gray-400 mb-4">
                    You need a small amount ($10-20) to pay for transactions. Think of it as stamps for digital mail.
                  </p>
                  <a 
                    href="https://bridge.base.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-diyama-glass inline-flex items-center gap-2"
                  >
                    Base Bridge <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="card-step unlocked">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3">Start Creating on Zora</h3>
                  <p className="text-gray-400 mb-4">
                    Zora is the best place to mint your first creation. It's user-friendly and built for creators.
                  </p>
                  <a 
                    href="https://zora.co" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-diyama-primary inline-flex items-center gap-2"
                  >
                    Start Creating <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why Base Section */}
      <section className="px-6 py-16">
        <motion.div
          className="max-w-6xl mx-auto"
          {...fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-neon mb-12 text-center">
            Why Base?
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="card-diyama text-center p-6">
              <DollarSign className="mx-auto mb-4 text-green-400" size={32} />
              <div className="text-2xl font-bold gradient-text-primary mb-2">
                &lt; $0.01
              </div>
              <div className="text-gray-400 text-sm">Transaction Cost</div>
            </div>

            <div className="card-diyama text-center p-6">
              <Clock className="mx-auto mb-4 text-blue-400" size={32} />
              <div className="text-2xl font-bold gradient-text-primary mb-2">
                2 sec
              </div>
              <div className="text-gray-400 text-sm">Transaction Speed</div>
            </div>

            <div className="card-diyama text-center p-6">
              <Shield className="mx-auto mb-4 text-cyan-400" size={32} />
              <div className="text-2xl font-bold gradient-text-primary mb-2">
                Coinbase
              </div>
              <div className="text-gray-400 text-sm">Backing</div>
            </div>

            <div className="card-diyama text-center p-6">
              <Globe className="mx-auto mb-4 text-purple-400" size={32} />
              <div className="text-2xl font-bold gradient-text-primary mb-2">
                Global
              </div>
              <div className="text-gray-400 text-sm">Access</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          {...fadeInUp}
        >
          <h2 className="text-4xl md:text-6xl font-bold gradient-hero mb-6">
            Ready to See Real Opportunities?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Now that you understand the basics, let's explore actual grants, programs, and ways to start earning onchain.
          </p>
          <Link href="/opportunities" className="btn-diyama-primary inline-flex items-center gap-2">
            <TrendingUp size={20} />
            Explore Opportunities
          </Link>
        </motion.div>
      </section>
    </div>
  );
}