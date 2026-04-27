"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wallet, Layers, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    step: "01",
    title: "Connect Your Stellar Wallet",
    description:
      "Connect Freighter, LOBSTR, or any Stellar-compatible wallet with one click. No sign-up required.",
  },
  {
    icon: Layers,
    step: "02",
    title: "Select the Stable Pool",
    description:
      "Browse the USDC · EURCV · EURC stable pool and review real-time TVL, APY, and volume metrics.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Swap or Provide Liquidity",
    description:
      "Execute near-zero-fee stablecoin swaps or deposit assets to earn passive trading fees.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={ref} className="py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Start swapping or earning on Stellar&apos;s most efficient stablecoin
            pool in three steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-violet-800/60 via-violet-600/40 to-violet-800/60" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-violet-900/30 border border-violet-700/40 flex items-center justify-center mx-auto">
                  <step.icon className="w-8 h-8 text-violet-400" />
                </div>
                <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#08080f]">
                  {step.step}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
