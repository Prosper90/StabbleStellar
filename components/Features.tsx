"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Globe, Coins, Shield, TrendingUp, Lock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Near-Zero Fees",
    description:
      "0.01% per swap — the lowest stablecoin AMM fee on Stellar, enabled by Stabble's optimized invariant.",
  },
  {
    icon: Globe,
    title: "5-Second Finality",
    description:
      "Stellar's Federated Byzantine Agreement settles transactions in seconds, not minutes or hours.",
  },
  {
    icon: Coins,
    title: "Deep Stablecoin Liquidity",
    description:
      "A single unified pool for USDC, EURCV, and EURC maximises capital efficiency and minimises slippage.",
  },
  {
    icon: Shield,
    title: "Battle-Tested Protocol",
    description:
      "Stabble's AMM has processed billions in volume on Solana with zero security incidents.",
  },
  {
    icon: TrendingUp,
    title: "Earn Passive Yield",
    description:
      "Liquidity providers earn trading fees on every swap with minimal impermanent loss risk.",
  },
  {
    icon: Lock,
    title: "Non-Custodial Security",
    description:
      "Fully audited smart contracts. Your assets remain under your control at all times.",
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Stabble on Stellar?
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Combining Stabble&apos;s proven AMM technology with Stellar&apos;s
            global payment rails for unmatched stablecoin liquidity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 group hover:border-violet-600/40 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-900/40 border border-violet-800/40 flex items-center justify-center mb-4 group-hover:bg-violet-800/40 transition-colors">
                <feat.icon className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feat.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
