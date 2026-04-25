"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg pt-16">
      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-violet-700/15 rounded-full filter blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-950/30 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-violet-900/30 border border-violet-700/50 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-violet-300 text-sm font-medium">
            Stabble Protocol — Now on Stellar
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
        >
          Institutional-Grade
          <br />
          <span className="gradient-text">Stable Liquidity</span>
          <br />
          on Stellar
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The most capital-efficient stablecoin AMM protocol — proven on Solana —
          now integrated with Stellar&apos;s global payment infrastructure.
          Near-zero fees. 5-second finality.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
        >
          <Link
            href="/pool"
            className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 glow-purple"
          >
            Launch App
          </Link>
          <a
            href="#how-it-works"
            className="text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 font-medium px-8 py-3.5 rounded-xl transition-all duration-200"
          >
            How It Works
          </a>
        </motion.div>

        {/* Built on Stellar badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="flex justify-center mb-14"
        >
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1.5 bg-violet-600/25 rounded-3xl filter blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Image
              src="/Stabble_X_Stellar_logo.jpg"
              alt="Built on Stellar"
              width={260}
              height={96}
              className="relative rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </motion.div>

        {/* Logo card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.48 }}
          className="flex justify-center"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-violet-600/20 rounded-3xl filter blur-2xl" />
            <Image
              src="/Stabble_X_Stellar.jpg"
              alt="Stabble × Stellar — Global liquidity. Institutional grade."
              width={680}
              height={360}
              className="relative rounded-2xl border border-violet-800/30 shadow-2xl w-full max-w-xl"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-600 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent" />
      </motion.div>
    </section>
  );
}
