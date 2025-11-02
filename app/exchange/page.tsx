"use client";
import { motion } from "framer-motion";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import ExchangeForm from "../../components/ExchangeForm";
import { useAccount } from "wagmi";

export default function ExchangePage() {
  const { address, isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Section title="P2P Exchange" description="Convert your USDC to Zambian Kwacha through our peer-to-peer network" className="pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Exchange Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="glass" className="p-6">
              <ExchangeForm />
            </Card>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card variant="glass" className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">How P2P Exchange Works</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">1</div>
                  <div>
                    <h4 className="text-white font-medium">Submit Request</h4>
                    <p className="text-slate-400 text-sm">Enter the amount of USDC you want to exchange and submit your request.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <h4 className="text-white font-medium">Get Matched</h4>
                    <p className="text-slate-400 text-sm">Our system finds a trusted peer who wants to buy your USDC for Zambian Kwacha.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">3</div>
                  <div>
                    <h4 className="text-white font-medium">Complete Trade</h4>
                    <p className="text-slate-400 text-sm">Receive contact details and complete the exchange safely with real-time rates.</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Exchange Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="glass" className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-white font-medium">Available</div>
              <div className="text-slate-400 text-sm">Exchange anytime</div>
            </Card>
            <Card variant="glass" className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">Real-time</div>
              <div className="text-white font-medium">Rates</div>
              <div className="text-slate-400 text-sm">Live market prices</div>
            </Card>
            <Card variant="glass" className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">Secure</div>
              <div className="text-white font-medium">P2P Trading</div>
              <div className="text-slate-400 text-sm">Trusted network</div>
            </Card>
          </div>
        </motion.div>

        {/* Safety Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <Card variant="glass" className="p-6 border-yellow-500/20 bg-yellow-500/5">
            <div className="flex items-start space-x-3">
              <div className="text-yellow-400 text-xl">⚠️</div>
              <div>
                <h4 className="text-yellow-400 font-medium mb-2">Safety First</h4>
                <p className="text-slate-300 text-sm">
                  Always verify the identity of your trading partner and use secure payment methods. 
                  Never share your private keys or seed phrases. Our team will contact you via email 
                  to facilitate the exchange process.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>
    </div>
  );
}