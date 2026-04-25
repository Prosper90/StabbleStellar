"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-28 px-4 bg-[#0a0a14]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-12 sm:p-16"
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-purple-950/20 to-violet-950/40" />
          <div className="absolute inset-0 bg-[#0d0d1e]/50" />
          <div className="absolute inset-0 border border-violet-700/25 rounded-3xl" />
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-violet-600/50 to-transparent" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Provide Liquidity?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Join Stellar&apos;s most efficient stablecoin pool. Earn
              competitive yields with minimal risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pool"
                className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 glow-purple"
              >
                Launch App
              </Link>
              <a
                href="#"
                className="text-gray-300 hover:text-white border border-gray-700 hover:border-violet-700/60 font-medium px-8 py-3.5 rounded-xl transition-all duration-200"
              >
                Read Documentation
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
